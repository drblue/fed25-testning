/**
 * A complete mock of localStorage
 *
 */

const storage = new Map();

export const getMockedLocalStorage = (): Storage => {
	return {
		getItem: (key: string) => storage.get(key) ?? null,

		setItem: (key: string, value: string) => storage.set(key, value),

		get length() {
			return storage.size;
		},

		clear: () => storage.clear(),

		key: (index: number) => Array.from(storage.keys())[index] ?? null,

		removeItem: (key: string) => storage.delete(key),
	}
}
