/**
 * Add three numbers and return the sum
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
