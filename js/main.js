let mealLink = "https://www.themealdb.com/api/json/v1/1/random.php";
const getMealBtn = document.getElementById("meal-btn");
let foodDetails = document.querySelector(".food-details");
let loader = document.querySelector(".loader");

getMealBtn.addEventListener("click", () => {
    loader.classList.add('show');
    fetch(mealLink)
        .then(res => res.json())
        .then(res => {
            generateMeals(res.meals[0]);
        }).finally(() => {
            loader.classList.remove('show');
        });
});

const generateMeals = (meal) => {

    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
    }

    const content = `
        <div class="loader"></div>
        <h2 class="sm-heading first">Your Meal Details are as below</h2>

        <img src="${meal.strMealThumb}" class="image" alt="Meal Image">
        
        <div class="descriptin">
            <h3 class="sm-heading">Meal Type</h3>
            ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
            ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        </div>

        <div class="description">
            <h3 class="sm-heading">${meal.strMeal}</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
        <div class="ingredients">
            <h3 class = "sm-heading">Ingredients:</h3>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    `;

    foodDetails.innerHTML = content;
}