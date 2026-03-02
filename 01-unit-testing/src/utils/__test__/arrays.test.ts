import { describe, expect, it } from "vitest";
import { clone } from "../arrays";

describe("clones an array", () => {
	const a = ["i", "like", "unit", "tests"];
	const b = clone(a);

	it("contains the same number of items", () => {
		expect(b).toHaveLength(a.length);
	});

	it("contains the same items", () => {
		expect(b).toStrictEqual(a);
	});

	it("is not the same array", () => {
		expect(b).not.toBe(a);
	});
});
