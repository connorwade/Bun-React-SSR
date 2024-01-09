const base = "http://localhost:6543";

const cache = new Map();

export const api = {
  get: async (path: string) => {
    if (cache.has(path)) {
      return cache.get(path);
    }
    const res = await fetch(base + path);
    const body = await res.text();
    cache.set(path, body);
    return body;
  },
};
