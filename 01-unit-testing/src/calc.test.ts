import { describe, expect, it } from "vitest";
import { add, sub } from "./calc";

describe("tests addition", () => {
	it("should add 1 + 2", () => {
		expect(add(1, 2)).toBe(3);
	});

	it("should add any two numbers", () => {
		expect(add(3, 4)).toBe(7);
		expect(add(13, 7)).toBe(20);
	});

	it("should add any three numbers", () => {
		expect(add(1, 2, 3)).toBe(6);
	});

	it("should add any four numbers", () => {
		expect(add(1, 2, 3, 4)).toBe(10);
		expect(add(1, 2, 3, 4)).not.toBe("10");  // unnecessary in this case, just for demo purposes
	});
});

describe("tests subtraction", () => {
	it("should subtract two numbers", () => {
		expect(sub(1342, 5)).toBe(1337);
	});

	it("should subtract three numbers", () => {
		expect(sub(420, 300, 78)).toBe(42);
	});
});
