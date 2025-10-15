export type CollectionKey = 'services' | 'events' | 'posts' | 'comments';

export function getCollection<T = any>(key: CollectionKey): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setCollection<T = any>(key: CollectionKey, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

export function addItem<T extends { id?: string }>(key: CollectionKey, item: T): T {
  const items = getCollection<T>(key);
  const withId = { id: item.id ?? crypto.randomUUID(), ...item } as T;
  const next = [withId, ...items];
  setCollection(key, next);
  return withId;
}

export function updateItem<T extends { id: string }>(key: CollectionKey, id: string, patch: Partial<T>): void {
  const items = getCollection<T>(key);
  const idx = items.findIndex(i => (i as any).id === id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...patch } as T;
    setCollection(key, items);
  }
}

export function deleteItem(key: CollectionKey, id: string): void {
  const items = getCollection<any>(key).filter(i => i.id !== id);
  setCollection(key, items);
}


