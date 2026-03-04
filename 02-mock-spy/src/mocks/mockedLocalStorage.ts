/**
 * A (mostly complete) mock of localStorage
 *
 */

const storage = new Map();

export const getMockedLocalStorage = () => {
	return {
		getItem: (key: string) => storage.get(key) ?? null,

		setItem: (key: string, value: string) => storage.set(key, value),

		length: storage.size,  // this won't update, but isn't needed for our app either

		clear: () => storage.clear(),

		key: () => null,  // this won't work either, but also isn't needed for our app

		removeItem: (key: string) => storage.delete(key),
	}
}
