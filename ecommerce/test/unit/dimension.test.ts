import { Dimension } from "../../src/domain/entity/dimension";

test("Should create dimensions", function () {
	const dimension = new Dimension(1, 0.30, 0.10);
	const volume = dimension.getVolume();
	expect(volume).toBe(0.03);
});