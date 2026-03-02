import { expect, it } from "vitest";
import { add } from "./calc";

it("should add 1 + 2", () => {
	expect(add(1, 2)).toBe(3);
});
