import {CARD_TYPES} from "../config/constants";

const cardRegex = {
    [CARD_TYPES.VISA]: /^4[0-9]{6,}$/,
    [CARD_TYPES.MASTERCARD]: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
    [CARD_TYPES.AMEX]: /^3[47][0-9]{5,}$/,
    [CARD_TYPES.DINERSCLUB]: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    [CARD_TYPES.DISCOVER]: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    [CARD_TYPES.JCB]: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
};

export const getCardType = cardNumber => {
    for (let cardType in cardRegex) {
        if (cardRegex[cardType].test(cardNumber)) {
            return cardType;
        }
    }
    return undefined;
};

export const isCardValid = cardNumber => {
    let containsOnlyNumbers = cardNumber.length > 0 && /[0-9]+/.test(cardNumber);
    let cardType = getCardType(cardNumber);
    if (containsOnlyNumbers && cardType) {
        // Luhn check
        let digitArray = cardNumber.split('').map(digit => parseInt(digit));
        let checkDigit = digitArray[digitArray.length - 1];
        digitArray.pop();
        let sum = digitArray.map((digit, index) => {
            return (index % 2 === 0)
                ? (digit * 2 < 10 ? (digit * 2) : (digit * 2 - 9)) // multiply by 2 and get digit sum
                : digit;
        }).reduce(((previousValue, currentValue) => previousValue + currentValue));
        return (sum + checkDigit) % 10 === 0;
    }
    return false;
};
