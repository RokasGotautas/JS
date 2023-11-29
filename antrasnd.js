//1.

string = "Once upon a time in Hollywood"
new_string = string.replaceAll("o", "*")
string_last = new_string.replaceAll("O", "*")
console.log(string_last)

//2.

let zeroCount = 0;
let oneCount = 0;
let twoCount = 0;

for (let i = 0; i < 4; i++) {
  let randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber === 0) {
    zeroCount++;
  } else if (randomNumber === 1) {
    oneCount++;
  } else {
    twoCount++;
  }
}

console.log("Zeros:", zeroCount);
console.log("Ones:", oneCount);
console.log("Twos:", twoCount);

//5.

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
let randomString = '';

for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
    randomString += lowercaseLetters[randomIndex];
}

console.log(randomString);