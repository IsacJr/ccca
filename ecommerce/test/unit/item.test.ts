import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";

test("It should throw an exception if the weight is negative", function () {
	expect(() => new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), -3)).toThrow(new Error("Invalid weight"));
});