import { expect, it } from "vitest";
import { add } from "./calc";

it("should add 1 + 2", () => {
	expect(add(1, 2)).toBe(3);
});

it("should add any two numbers", () => {
	expect(add(3, 4)).toBe(7);
	expect(add(13, 7)).toBe(20);
});
