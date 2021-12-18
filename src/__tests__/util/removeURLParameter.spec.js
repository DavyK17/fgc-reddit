import removeURLParameter from "../../util/removeURLParameter";

const url1 = "http://example.com?key=value";
const url2 = "http://example.com?prop=val"
const url3 = "http://example.com"

test("removes provided parameter from URL", () => {
    const test = removeURLParameter(url1, "key");
    const expected = "http://example.com";

    expect(test).toEqual(expected);
});

test ("returns URL if provided parameter does not exist", () => {
    const test2 = removeURLParameter(url2, "key");
    const test3 = removeURLParameter(url3, "key");

    expect(test2).toEqual(url2);
    expect(test3).toEqual(url3);
});