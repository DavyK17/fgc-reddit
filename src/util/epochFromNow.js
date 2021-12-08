import moment from "moment";
/*
    Converts Epoch time to UTC date
*/

export default function epochFromNow(value) {
    let date = new Date(0);
    date.setUTCSeconds(value);
    
    return moment(date).fromNow();
}