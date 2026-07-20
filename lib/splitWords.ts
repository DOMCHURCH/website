/**
 * Split an element's text into word spans, each inside an overflow-clip line,
 * for the editorial "word rides up" reveal. SSR-safe (only called in effects).
 * Returns the word nodes and a revert() that restores the original markup.
 */
export interface WordSplit {
  words: HTMLElement[];
  revert: () => void;
}

const WS = /^\s+$/;

export function splitWords(el: HTMLElement): WordSplit {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  el.innerHTML = "";

  const words: HTMLElement[] = [];
  for (const token of text.split(/(\s+)/)) {
    if (token === "") continue;
    if (WS.test(token)) {
      el.appendChild(document.createTextNode(token));
      continue;
    }
    const line = document.createElement("span");
    line.className = "mask-line";
    const word = document.createElement("span");
    word.className = "mask-word";
    word.textContent = token;
    line.appendChild(word);
    el.appendChild(line);
    words.push(word);
  }

  return {
    words,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
