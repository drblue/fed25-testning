/**
 * Returns a random number between 1..max (default 10)
 */
export const getRandomNumber = (max = 10) => {
	return Math.floor(Math.random() * max) + 1;
}

/**
 * Returns qty amount of random numbers between 1..max
 */
export const getRandomNumbers = (qty: number, max = 10) => {
	const randomNumbers = [];

	for (let i = 0; i < qty; i++) {
		randomNumbers.push(getRandomNumber(max));
	}

	return randomNumbers;
}
