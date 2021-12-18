import checkNested from "../../util/checkNested";

const object = {
    id: 1,
    name: {
        first: "John",
        last: "Doe",
    }
}

test("returns true when nested object property exists", () => {
    const test = checkNested(object, "name", "first");

    expect(test).toEqual(true);
});

test("returns false when nested object property does not exist", () => {
    const test = checkNested(object, "name", "middle");

    expect(test).toEqual(false);
});