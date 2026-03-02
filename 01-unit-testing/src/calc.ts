/**
 * Add any numbers and return the sum
 */
export const add = (...numbers: number[]) => {
	/*
	// 🥴
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) {
		sum += numbers[i];
	}

	return sum;
	*/

	// 🤩
	return numbers.reduce((total, current) => {
		return total + current;
	}, 0);
}

/**
 * Subtract any numbers from each other and return the sum 🤯
 */
export const sub = (...numbers: number[]) => {
	return numbers.reduce((sum, current) => {
		return sum - current;
	}, 0);
}
