/**
 * Array Utilities
 */

/**
 * Returns a clone of the array
 *
 * @param arr Array to clone
 * @returns Cloned array
 */
export const clone = (arr: any[]) => {
	return [...arr];
	// return Array.from(arr);
}
