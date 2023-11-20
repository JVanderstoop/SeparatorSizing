/**
 * Formats a given string number with commas for thousands, removing non-digit characters.
 */
function formatNumberWithCommas (number) {
    return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Removes all non-digit characters from a given string number.
 */
function removeNonDigitCharacters (number) {
    return number.replace(/\D/g, "");
}

/**
 * Removes the commas from the user input but keeps the decimals
 */
export function removeCommas (number) {
    return parseFloat(number.replace(/,/g, ''));
}

/**
 * given any value, will return the string stripped of all non-number characters
 * and format the string
 *  ex. '1234abc.56' => '1,234.56'
 */
export function formatNumber (value) {
    // do nothing on empty input
    if (value === "") { return ""; }
    // original length
    var original_len = value.length;

    // check for decimal
    if (value.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = value.indexOf(".");

        // split number by decimal point
        var left_side = value.substring(0, decimal_pos);
        var right_side = value.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumberWithCommas(left_side);

        // validate right side
        right_side = removeNonDigitCharacters(right_side);

        // join number by .
        value = left_side + "." + right_side;

    } else {
        // no decimal entered
        // remove all non-digits
        value = formatNumberWithCommas(value);
        value = value;
    }
    return value;
}
