import makeID from "../../util/randomString";

const length = 5;
const id = makeID(length);

test ("returns a string", () => {
    expect(typeof id).toBe("string");
});

test ("returned value is of the provided length", () => {
    expect(id).toHaveLength(length);
});