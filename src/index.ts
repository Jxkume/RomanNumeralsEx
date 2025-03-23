// User input preparations
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function where the logic of the conversion is located
function romanNumeralToNumber(inputRomanNumeral: string): number {

    const romanNumerals: Record<string, number> = {
        I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };

    let total: number = 0;

    for(let i = 0; i < inputRomanNumeral.length; i++){
        let currentNumeral: number = romanNumerals[inputRomanNumeral[i]];
        let nextNumeral: number = romanNumerals[inputRomanNumeral[i + 1]] || 0;

        if(currentNumeral < nextNumeral) {
            total -= currentNumeral;
        } else {
            total += currentNumeral;

        }
        
    }

    return total;
}

// Function for checking duplicate chars 
function checkingForDuplicatesInWord(romanNumeral: string): boolean {
    let charCount: Record<string,number> = {};
    const notRepeatableLetters: string[] = ["V", "L", "D"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char: string = romanNumeral.charAt(i);
        
        if(charCount[char]){
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }

        if(charCount[char] > 1 && notRepeatableLetters.includes(char)){
            return true;
        }

        if(charCount[char] > 3) {
            return true;
        }
    }
    return false;

}

// Function for checking valid chars
function checkingForNotValidChars(romanNumeral: string): boolean {
    let validChars: string[] = ["I","V","X","L","C","D","M"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char: string = romanNumeral.charAt(i);

        if(!validChars.includes(char)){
            return true;
        }
    }
    return false;
}

// Function for checking invalid subtractions
function checkingForInvalidSubtractions(romanNumeral: string): boolean {
    let invalidSubtractions: string[] = ["IL", "IC", "ID", "IM", "VX", "VL", "VC", "VD", "VM", "XD", "XM", "LC", "LD", "LM", "DM"];
    for (let i = 0; i < romanNumeral.length; i++) {
        let char: string = romanNumeral.substring(i, i + 2);

        if(invalidSubtractions.includes(char)){
            return true;
        }
    }
    return false;
}

// Simple user interface
function askForRomanNumeral(): void {
      readline.question('Enter a Roman numeral to get it converted into a number: ', (romanNumeral: string) => {
        if (checkingForDuplicatesInWord(romanNumeral)){
            console.log("You cannot repeat a Roman numeral more than 3 times or repeat V, L or D 2 times");
            askForRomanNumeral();
        } else if (checkingForInvalidSubtractions(romanNumeral)) {
            console.log("Invalid subtraction combination");
            askForRomanNumeral();
        } else if(checkingForNotValidChars(romanNumeral)) {
            console.log("Please input a valid Roman numeral");
            askForRomanNumeral();
        } else if(romanNumeral.length == 0){
            console.log("Please input a Roman numeral");
            askForRomanNumeral();
        }  else {
            console.log(romanNumeral + " converted to number is " + romanNumeralToNumber(romanNumeral));
            readline.close();
        }
      });  
};

askForRomanNumeral();
    

// Time spent in the first part of the exercise: 1 hour 48 minutes
// Time spent in the second part of the exercise: ~ 4 hours

