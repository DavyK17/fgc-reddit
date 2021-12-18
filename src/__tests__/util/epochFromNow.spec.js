import epochFromNow from "../../util/epochFromNow";
import moment from "moment";

const unix = 1639785600; // equivalent to "Dec 18 2021 3:00 PM"

test("shows the amount of time relative to the provided timestamp", () => {
    let date = new Date(0);
    date.setUTCSeconds(unix);

    const test = epochFromNow(unix);
    const expected = moment(date).fromNow();

    expect(test).toEqual(expected);
});