import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { clone } from "../arrays";

describe("clones an array", () => {
	const a = ["i", "like", "unit", "tests"];
	let b: any[] = [];

	// is called before **all** (once) the tests in this suite is executed
	beforeAll(() => {
		b = clone(a);
	});

	// is called before **every** (one time per test) test in this suite is executed
	beforeEach(() => {
	});

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
