import { expect, it } from "vitest";
import { getRandomNumber, getRandomNumbers } from "./random";

it("generates a random number between 1-10", () => {
	const randomNumber = getRandomNumber();

	expect(randomNumber).toBeGreaterThanOrEqual(1);
	expect(randomNumber).toBeLessThanOrEqual(10);
});

it("generates a random number between 1-50", () => {
	const randomNumber = getRandomNumber(50);

	expect(randomNumber).toBeGreaterThanOrEqual(1);
	expect(randomNumber).toBeLessThanOrEqual(50);
});

it("generates random numbers between 1-20, 10 times", () => {
	const max = 20;

	for (let i = 0; i < 10; i++) {
		const randomNumber = getRandomNumber(max);

		expect(randomNumber).toBeGreaterThanOrEqual(1);
		expect(randomNumber).toBeLessThanOrEqual(max);
	}
});

it("generates 10 random numbers between 1-20", () => {
	const max = 20;
	const randomNumbers = getRandomNumbers(10, max);

	randomNumbers.forEach(randomNumber => {
		expect(randomNumber).toBeGreaterThanOrEqual(1);
		expect(randomNumber).toBeLessThanOrEqual(max)
	});
});
