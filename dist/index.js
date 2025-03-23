"use strict";
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
function romanNumeralToNumber(inputRomanNumeral) {
    const romanNumerals = {
        I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    let total = 0;
    for (let i = 0; i < inputRomanNumeral.length; i++) {
        let currentNumeral = romanNumerals[inputRomanNumeral[i]];
        let nextNumeral = romanNumerals[inputRomanNumeral[i + 1]] || 0;
        if (currentNumeral < nextNumeral) {
            total -= currentNumeral;
        }
        else {
            total += currentNumeral;
        }
    }
    return total;
}
function checkingForDuplicatesInWord(romanNumeral) {
    let charCount = {};
    const notRepeatableLetters = ["V", "L", "D"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char = romanNumeral.charAt(i);
        if (charCount[char]) {
            charCount[char]++;
        }
        else {
            charCount[char] = 1;
        }
        if (charCount[char] > 1 && notRepeatableLetters.includes(char)) {
            return true;
        }
        if (charCount[char] > 3) {
            return true;
        }
    }
    return false;
}
function checkingForNotValidChars(romanNumeral) {
    let validChars = ["I", "V", "X", "L", "C", "D", "M"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char = romanNumeral.charAt(i);
        if (!validChars.includes(char)) {
            return true;
        }
    }
    return false;
}
function checkingForInvalidSubtractions(romanNumeral) {
    let invalidSubtractions = ["IL", "IC", "ID", "IM", "VX", "VL", "VC", "VD", "VM", "XD", "XM", "LC", "LD", "LM", "DM"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char = romanNumeral.substring(i, i + 2);
        if (invalidSubtractions.includes(char)) {
            return true;
        }
    }
    return false;
}
function askForRomanNumeral() {
    readline.question('Enter a Roman numeral to get it converted into a number: ', (romanNumeral) => {
        if (checkingForDuplicatesInWord(romanNumeral)) {
            console.log("You cannot repeat a Roman numeral more than 3 times or repeat V, L or D 2 times");
            askForRomanNumeral();
        }
        else if (checkingForInvalidSubtractions(romanNumeral)) {
            console.log("Invalid subtraction combination");
            askForRomanNumeral();
        }
        else if (checkingForNotValidChars(romanNumeral)) {
            console.log("Please input a valid Roman numeral");
            askForRomanNumeral();
        }
        else if (romanNumeral.length == 0) {
            console.log("Please input a Roman numeral");
            askForRomanNumeral();
        }
        else {
            console.log(romanNumeral + " converted to number is " + romanNumeralToNumber(romanNumeral));
            readline.close();
        }
    });
}
;
askForRomanNumeral();
//# sourceMappingURL=index.js.map