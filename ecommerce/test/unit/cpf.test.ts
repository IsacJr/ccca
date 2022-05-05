import { Cpf } from "../../src/domain/entity/cpf";

test("create valid cpf", function () {
    // arrange
    const cpfEntryValue = "003.682.284-10";
    // action
    const cpf = new Cpf(cpfEntryValue);
    // expect
    expect(cpf.value).toBe(cpfEntryValue);
});

test("check invalid cpf - too short", function () {
    // arrange
    const cpfEntryValue = "003.682.284-1";
    // action
    const trowedError = () => new Cpf(cpfEntryValue);
    // expect
    expect(trowedError).toThrow("Invalid cpf!");
});

test("check invalid cpf - too long", function () {
    // arrange
    const cpfEntryValue = "003.682.284-101111111";
    // action
    const trowedError = () => new Cpf(cpfEntryValue);
    // expect
    expect(trowedError).toThrow("Invalid cpf!");
});

test("check invalid cpf - same number", function () {
    // arrange
    const cpfEntryValue = "111.111.111-11";
    // action
    const trowedError = () => new Cpf(cpfEntryValue);
    // expect
    expect(trowedError).toThrow("Invalid cpf!");
});