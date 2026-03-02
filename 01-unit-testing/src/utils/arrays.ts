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
	console.log("Cloning array 👩‍🔬...");
	return [...arr];
	// return Array.from(arr);
}
