/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export function splitOnFirst(str: string, sep: string) {
  if (str === "" || sep === "") {
    return [str];
  }

  const index = str.indexOf(sep);
  if (index === -1) {
    return [str];
  }

  return [str.slice(0, index), str.slice(index + sep.length)];
}

export function parseUrl(url: string) {
  const [segment = "", hash = ""] = splitOnFirst(url, "#");
  const [path = "", search = ""] = splitOnFirst(segment, "?");

  return {
    path,
    search,
    hash,
  };
}

export function addQuery(url: string, query: Record<string, any> | string) {
  const { path, search, hash } = parseUrl(url);
  const searchParams = search ? search.split("&") : [];

  if (typeof query === "string") {
    searchParams.push(query);
  } else {
    Object.keys(query).forEach((name) => {
      if (name) {
        const value = query[name];
        searchParams.push(
          `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        );
      }
    });
  }

  let link = path;
  if (searchParams.length) {
    link += `?${searchParams.join("&")}`;
  }
  if (hash.length) {
    link += `#${hash}`;
  }
  return link;
}
