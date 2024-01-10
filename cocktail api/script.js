const coctailNameFilterElement = document.querySelector("#coctail-name-filter");
const categorySelectElement = document.querySelector("#category-select");
const glassSelectElement = document.querySelector("#glass-type-select");
const ingredientSelectElement = document.querySelector("#ingredient-select");
const dynamicDrinksElement = document.querySelector(".drinks");
const buttonSearch = document.querySelector("#search");
const randomizeButton = document.querySelector("#randomize");
const modal = document.querySelector(".modal-bg");

const selectValues = {
    categories: [],
    glasses: [],
    ingredients: [],
};
const drinksArray = [];

async function fillSelectElements() {
    const apiUrls = [
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list",
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
    ];

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const [allCategories, allGlasses, allIngredients] = await Promise.all(
        apiUrls.map(fetchData)
    );

    selectValues.categories = allCategories.drinks.map(
        (categoryObj) => categoryObj.strCategory
    );
    selectValues.glasses = allGlasses.drinks.map((glass) => glass.strGlass);
    selectValues.ingredients = allIngredients.drinks.map(
        (ingredient) => ingredient.strIngredient1
    );

    fillCategorySelect(allCategories.drinks, categorySelectElement, "strCategory");
    fillCategorySelect(allGlasses.drinks, glassSelectElement, "strGlass");
    fillCategorySelect(allIngredients.drinks, ingredientSelectElement, "strIngredient1");
}

function fillCategorySelect(properties, selectElement, strFieldName) {
    const optionsHTML = properties.map((property) => `<option>${property[strFieldName]}</option>`).join("");
    selectElement.innerHTML += optionsHTML;
}

async function getAllDrinks() {
    const categoryDrinksUrls = selectValues.categories.map((category) =>
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(" ", "_")}`
    );

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const drinksData = await Promise.all(categoryDrinksUrls.map(fetchData));
    drinksData.forEach((value) => drinksArray.push(...value.drinks));
}

function generateDrinksHTML(drinks) {
    const dynamicHTML = drinks.map((drink) => `
        <div class="drink" onclick="openModal(${drink.idDrink})">
            <img src="${drink.strDrinkThumb}" alt="" />
            <h2 class="drink-title">${drink.strDrink}</h2>
        </div>`).join("");

    dynamicDrinksElement.innerHTML = dynamicHTML;
}

async function filter() {
    const searchValue = coctailNameFilterElement.value.toLowerCase();
    const category = categorySelectElement.value;
    const glass = glassSelectElement.value;
    const ingredient = ingredientSelectElement.value;

    let filteredArray = [...drinksArray];

    if (searchValue) {
        filteredArray = filteredArray.filter((drinkObj) =>
            drinkObj.strDrink.toLowerCase().includes(searchValue)
        );
    }

    if (category !== "Choose category") {
        const drinksOfCategory = await fetchAndExtractDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(" ", "_")}`);
        filteredArray = filterDrinksByCategory(filteredArray, drinksOfCategory);
    }

    if (glass !== "Choose glass type") {
        const drinksOfGlass = await fetchAndExtractDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass.replaceAll(" ", "_")}`);
        filteredArray = filterDrinksByCategory(filteredArray, drinksOfGlass);
    }

    if (ingredient !== "Choose ingredient") {
        const drinksOfIngredient = await fetchAndExtractDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.replaceAll(" ", "_")}`);
        filteredArray = filterDrinksByCategory(filteredArray, drinksOfIngredient);
    }

    generateDrinksHTML(filteredArray);
}

async function fetchAndExtractDrinks(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
}

function filterDrinksByCategory(drinksArray, categoryArray) {
    return drinksArray.filter((drink) =>
        categoryArray.some((categoryDrink) => drink.idDrink === categoryDrink.idDrink)
    );
}

async function initialization() {
    await fillSelectElements();
    await getAllDrinks();
    generateDrinksHTML(drinksArray);
    buttonSearch.addEventListener("click", () => {
        filter();
    });
}

async function openModal(id) {
    modal.style.display = "flex";
    const drinks = await fetchAndExtractDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    modal.addEventListener("click", closeModalOutside);

    if (drinks && drinks.length > 0) {
        const drink = drinks[0];

        console.log("Full drink data:", drink);

        document.querySelector(".modal-img").src = drink.strDrinkThumb || 'https://via.placeholder.com/150';
        document.querySelector("#modal-category").innerText = drink.strCategory || 'N/A';
        document.querySelector("#modal-alcohol").innerText = drink.strAlcoholic || 'N/A';
        document.querySelector(".modal-title").innerText = drink.strDrink || 'N/A';
        document.querySelector("#modal-glass").innerText = drink.strGlass || 'N/A';

        const ingredientsContainer = document.getElementById("modal-ingredients");
        ingredientsContainer.innerHTML = "";

        for (let i = 1; i <= 15; i++) {
            const ingredientName = drink[`strIngredient${i}`];
            const ingredientMeasure = drink[`strMeasure${i}`];

            if (ingredientName) {
                const ingredientElement = document.createElement("p");
                ingredientElement.innerHTML = `<b>${ingredientName}:</b> ${ingredientMeasure ? ingredientMeasure : 'N/A'}`;
                ingredientsContainer.appendChild(ingredientElement);
            }
        }

        document.querySelector("#modal-recipe").innerText = drink.strInstructions || 'N/A';
    }
}

function closeModalOutside(event) {
    if (event.target === modal) {
        closeModal();
        modal.removeEventListener("click", closeModalOutside);
    }
}

function closeModal() {
    modal.style.display = "none";
    modal.removeEventListener("click", closeModalOutside);
}

randomizeButton.addEventListener("click", randomizeCocktail);
function generateDrinkHTML(drink) {
    return `
        <div class="drink" onclick="openModal(${drink.idDrink})">
            <img src="${drink.strDrinkThumb}" alt="" />
            <h2 class="drink-title">${drink.strDrink}</h2>
        </div>`;
}

function randomizeCocktail() {
    const randomIndex = Math.floor(Math.random() * drinksArray.length);
    const randomDrink = drinksArray[randomIndex];
    const randomDrinkHTML = generateDrinkHTML(randomDrink);
    dynamicDrinksElement.innerHTML = randomDrinkHTML;
}

function generateDrinksHTML(drinks) {
    const dynamicHTML = drinks.map(generateDrinkHTML).join("");
    dynamicDrinksElement.innerHTML = dynamicHTML;
}

function addHomeButton() {
    const navContainer = document.querySelector(".nav-container");

    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.id = "home-button";

    homeButton.addEventListener("click", () => {
        location.reload();
    });

    navContainer.appendChild(homeButton);
}

addHomeButton();

const letterButtonsContainer = document.getElementById("letter-buttons-container");

function generateLetterButtons() {
    for (let i = 65; i <= 90; i++) { 
        const letter = String.fromCharCode(i);
        const letterButton = document.createElement("button");
        letterButton.textContent = letter;
        letterButton.addEventListener("click", () => filterByFirstLetter(letter));
        letterButtonsContainer.appendChild(letterButton);
    }
}

function filterByFirstLetter(letter) {
    const filteredArray = drinksArray.filter((drinkObj) => {
        const firstLetter = drinkObj.strDrink.charAt(0).toUpperCase();
        return firstLetter === letter;
    });

    generateDrinksHTML(filteredArray);
}
generateLetterButtons();
document.querySelector(".modal-close-button").addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", initialization);
initialization();