document.getElementById('search-btn').addEventListener('click', function () {
    const getInputValue = document.getElementById('search-data').value;
    //console.log(getInputValue);
    fetchAllSearchMeal(getInputValue);

    const blankItem = document.getElementById('search-data').value = "";

})

//Display No Results Found
const displayErrorMsg = () => {
    let displayMsg = document.getElementById('meal-detail');
    displayMsg.innerHTML = " ";
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = "noResultsDiv"
    noResultsDiv.innerHTML = `
    <h3>No Results Found.</h3>
    <p>Please Try Again.</p>
    `
    displayMsg.appendChild(noResultsDiv);
}

//Fetch all meals from API  
const fetchAllSearchMeal = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => {

            //Input Validation here
            if (name === "" || data.meals === null) {
                displayErrorMsg();
            }
            else {
                getMealMenus(data.meals);
            }
        });
}

//get Searched menu
const getMealMenus = allMenus => {
    let mealsDiv = document.getElementById('meal-detail');
    mealsDiv.innerHTML = " ";
    allMenus.forEach(searchMenu => {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menus';
        const mealInfo = `
      <img src="${searchMenu.strMealThumb}"> 
      <h3>${searchMenu.strMeal}
      `
        menuDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(menuDiv)

        menuDiv.addEventListener('click', function () {
            displayMenuDetail(searchMenu.strMeal);
        })
    });
    
    //Get one unique meal details
    const displayMenuDetail = name => {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        fetch(url)
            .then(res => res.json())
            .then(data => renderMealInfo(data.meals[0]));
    }

    //Display Meal Ingredients 
    const renderMealInfo = Meal => {
        const MenuDiv = document.getElementById('meal-ingredients');
        MenuDiv.innerHTML = `
          <img src="${Meal.strMealThumb}">
          <h1>${Meal.strMeal}</h1> 
          
          <h3>Ingredients</h3>
          <li>${Meal.strIngredient1}</li>  
          <li>${Meal.strIngredient2}</li>  
          <li>${Meal.strIngredient3}</li>  
          <li>${Meal.strIngredient4}</li>  
          <li>${Meal.strIngredient5}</li>  
          <li>${Meal.strIngredient6}</li>  
          <li>${Meal.strIngredient7}</li>  
          <li>${Meal.strIngredient7}</li>  
          <li>${Meal.strIngredient9}</li>  
        `
    }
}