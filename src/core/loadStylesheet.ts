/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
const cachedStylesheet: {
  [url: string]: Promise<void> | undefined;
} = {};

/**
 * Load JS scripts.
 * @param url
 */
function loadStylesheet(url: string): Promise<void> {
  if (cachedStylesheet[url]) {
    return cachedStylesheet[url]!;
  }

  cachedStylesheet[url] = new Promise<void>((resolve, reject) => {
    const node = document.createElement("link");
    node.rel = "stylesheet";
    node.href = url;
    node.addEventListener("load", () => resolve(), false);
    node.addEventListener(
      "error",
      () => {
        document.head.removeChild(node);
        delete cachedStylesheet[url];
        reject();
      },
      false
    );
    document.head.appendChild(node);
  });

  return cachedStylesheet[url]!;
}

export default loadStylesheet;
