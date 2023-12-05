// 1.Naudokite funkcija rand(). Sugeneruokite atsitiktinį skaičių nuo 1 iki 6 ir jį atspausdinkite atitinkame h tage. Pvz skaičius 3- rezultatas: <h3>3</h3>

var randomNumber = Math.floor(Math.random() * 6) + 1;
  
document.write("<h" + randomNumber + ">" + randomNumber + "</h" + randomNumber + ">");

// 2. Naudokite funkcija rand(). Atspausdinkite 3 skaičius nuo -10 iki 10. Skaičiai mažesni už 0 turi būti žali, 0 - raudonas, didesni už 0 mėlyni.

 for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 21) - 10;
    const color = randomNumber < 0 ? 'green' : (randomNumber > 0 ? 'blue' : 'red');

    const span = document.createElement('span');
    span.textContent = randomNumber;
    span.style.color = color;

    document.body.appendChild(span);
    document.body.appendChild(document.createTextNode(' '));
  }

// 3. Sukurkite kintamąjį su stringu: “An American in Paris”. Jame ištrinti visas balses. Rezultatą atspausdinti. Kodą pakartoti su stringais: “Breakfast at Tiffany's”, “2001: A Space Odyssey” ir “It's a Wonderful Life”.


const originalString = "An American in Paris";
const modifiedString = originalString.replace(/[aeiouAEIOU]/g, "");

console.log(`Original string: ${originalString}`);
console.log(`String without vowels: ${modifiedString}`);

const breakfastString = "Breakfast at Tiffany's";
const modifiedBreakfastString = breakfastString.replace(/[aeiouAEIOU]/g, "");

console.log(`\nOriginal string: ${breakfastString}`);
console.log(`String without vowels: ${modifiedBreakfastString}`);

const odysseyString = "2001: A Space Odyssey";
const modifiedOdysseyString = odysseyString.replace(/[aeiouAEIOU]/g, "");

console.log(`\nOriginal string: ${odysseyString}`);
console.log(`String without vowels: ${modifiedOdysseyString}`);

const wonderfulLifeString = "It's a Wonderful Life";
const modifiedWonderfulLifeString = wonderfulLifeString.replace(/[aeiouAEIOU]/g, "");

console.log(`\nOriginal string: ${wonderfulLifeString}`);
console.log(`String without vowels: ${modifiedWonderfulLifeString}`);


// 4. Sugeneruokite 300 atsitiktinių skaičių nuo 0 iki 300, atspausdinkite juos atskirtus tarpais ir suskaičiuokite kiek tarp jų yra didesnių už 150.  Skaičiai didesni nei 275 turi būti raudonos spalvos.
const generateRandomNumbers = () => Array.from({ length: 300 }, () => Math.floor(Math.random() * 301));

const filterNumbersGreaterThan150 = (numbers) => numbers.filter((number) => number > 150);

const countNumbersGreaterThan150 = (filteredNumbers) => {
  let count = 0;
  filteredNumbers.reduce((acc, number) => {
    if (number > 275) {
      console.log(`\x1b[31m${number}\x1b[0m`);
    } else {
      console.log(number);
    }
    count++;
    return acc;
  }, 0);
  return count;
};

const numbers = generateRandomNumbers();
const filteredNumbers = filterNumbersGreaterThan150(numbers);
const count = countNumbersGreaterThan150(filteredNumbers);
console.log(`Skaičiai, didesniuž 150: ${count}`);

// 5. Vienoje eilutėje atspausdinkite visus skaičius nuo 1 iki 3000, kurie dalijasi iš 77 be liekanos. Skaičius atskirkite kableliais. Po paskutinio skaičiaus kablelio neturi būti. Jeigu reikia, panaudokite css, kad visi rezultatai matytųsi ekrane.
  const numbers1 = [];
  for (let i = 1; i <= 3000; i++) {
    if (i % 77 === 0) {
      numbers1.push(i);
    }
  }

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = numbers1.join(",");

  // 6. Duotas vardų masyvas, kuriame visi vardai prasideda mažąja raide. Reikia sukurti algoritmą, kuris visus vardus konvertuoja į iš didžiosios raidės prasidedančius vardus:

  let namesArray = [
    'alice', 'bob', 'charlie', 'david', 'emily',
    'frank', 'grace', 'harry', 'isabella', 'jack',
    'kate', 'liam', 'molly', 'nathan', 'olivia',
    'peter', 'quinn', 'rachel', 'steve', 'tina'
];

let convertedNames = namesArray.map(function(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
});

console.log("Pradiniai vardai:", namesArray);
console.log("Konvertuoti vardai:", convertedNames);