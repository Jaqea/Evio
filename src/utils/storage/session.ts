import { encrypt, decrypt } from "../crypto";

function createSessionStorage<
  T extends StorageInterface.Session = StorageInterface.Session
>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypt(value);
    sessionStorage.setItem(key as string, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(key as string);
    let data: T[K] | null = null;
    if (json) {
      try {
        data = decrypt(json);
      } catch {
        // 防止解析失败
      }
    }

    return data;
  }

  function remove<K extends keyof T>(key: K) {
    sessionStorage.removeItem(key as string);
  }

  function clear() {
    sessionStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const sessionStg = createSessionStorage();
