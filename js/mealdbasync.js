const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clear data
    searchField.value = '';
    if (searchText == '') {
        const searchResult = document.getElementById('search-result');
        let result;
        setTimeout(() => {
            searchResult.innerHTML = ``;
        }, 3000)
        searchResult.innerHTML =
            `
            <div class="error fs-5">No Result Exists! Please Search Again</div>
        `  ;
        return result = searchResult.innerHTML;
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url)

        const res = await (fetch(url));
        const data = await res.json();
        try {
            displayMeal(data.meals);
        }
        catch (err) {
            displayError(err);
        }

        //or
        // fetch(url).then((response) => response.json()).then(data => displayMeal(data.meals)).catch(err => displayError(err));
    }
}

const displayError = err => {
    const searchResult = document.getElementById('search-result');
    console.log(typeof err)
    searchResult.innerHTML = `<div class="error fs-5">Result Doesn't Exist!</div>`;
    setTimeout(() => {
        searchResult.innerText = ``;
    }, 3000)
}

const displayMeal = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ''; // clear result while searching different things
    //or
    // searchResult.innerHTML = '';
    // console.log(meals);

    meals.map(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        // here passing parameter value is string then we have to put it in quotation in no. 34
        div.innerHTML =
            `
            <div class="col">
                    <div onclick ="loadMealById(${meal.idMeal})" class="card card-custom"> 
                        <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="Food Result">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">
                            <div class="d-flex justify-content-evenly align-items-center">
                            <span class="fw-bold">Area:</span> ${meal.strArea};
                            <span class="fw-bold">Category:</span> ${meal.strCategory}
                            </div>
                            <span class="fw-bold">Ingredients:</span>
                            <ul>
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            </ul>
                            <span class="fw-bold">Instructions:</span>
                            <p class="text-justify">
                            ${meal.strInstructions.slice(0, 500)}
                            </p>
                            <span class="fw-bold">Ingredient Measure</span>
                            <ul>
                            <li>${meal.strMeasure1}</li>
                            <li>${meal.strMeasure2}</li>
                            </ul>
                            <a href="${meal.strSource}" class="text-success">
                            ${meal.strSource}
                            </a><br>
                            <a href="${meal.strYoutube}" class="text-danger">
                            YouTube
                            </a>
                            </p>
                        </div>
                    </div>
                </div>
        `
        searchResult.appendChild(div);
    });
}

const loadMealById = async id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const res = await (fetch(url));
    const data = await res.json();
    mealDetail(data.meals);
    //or
    // fetch(url).then((response) => response.json()).then(data => mealDetail(data.meals));
}

const mealDetail = (details) => {
    const mealContainer = document.getElementById('meal-details');
    mealContainer.textContent = '';
    const div = document.createElement('div');
    // console.log(details);
    details.map(detail => {
        console.log(detail);
        div.innerHTML =
            `    
  <img src="${detail.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${detail.strMeal}</h5>
    <p class="card-text"> ${detail.strInstructions.slice(0, 500)}</p>
    <a href="${detail.strYoutube}" class="btn btn-danger">YouTube</a>
  </div>
`
        mealContainer.appendChild(div);
    })

}