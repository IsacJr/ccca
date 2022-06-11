import StockEntry from "../../src/domain/entity/StockEntry";
import StockCalculator from "../../src/domain/service/SotckCalculator";

test("It should calculate a item stock quantity", function () {
	const stockEntries = [
		new StockEntry(1, "in", 10),
		new StockEntry(1, "in", 10),
		new StockEntry(1, "out", 5),
		new StockEntry(1, "out", 5)
	]
	const total = StockCalculator.calculate(stockEntries);
	expect(total).toBe(10);
});