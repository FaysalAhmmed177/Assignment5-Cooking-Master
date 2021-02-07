document.getElementById('search-btn').addEventListener('click', function () {
    const getInputValue = document.getElementById('search-data').value;
    console.log(getInputValue);
    fetchAllSearchMeal(getInputValue);
})

const fetchAllSearchMeal = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            getMealMenus(data.meals);
        });
}

const getMealMenus = allMenus => {
    // console.log(allMenus) 
    const mealsDiv = document.getElementById('meal-detail');

    allMenus.forEach(searchMenu => {
        //console.log(searchMenu.strMeal)

        const menuDiv = document.createElement('div');
        menuDiv.className = 'menus';
        const mealInfo = `
      <img src="${searchMenu.strMealThumb}"> 
      <h3>${searchMenu.strMeal}
      `
        menuDiv.innerHTML = ""
        menuDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(menuDiv)

        menuDiv.addEventListener('click', function () {
            displayMenuDetail(searchMenu.strMeal);
        })
    });
    const displayMenuDetail = name => {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        fetch(url)
            .then(res => res.json())
            .then(data => renderMealInfo(data.meals[0]));
    }

    const renderMealInfo = Meal => {

        console.log(Meal);
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
    // for (let i = 0; i < allMenus.length; i++) {
    //     const meal = allMenus[i];
    //     console.log(meal.strMeal);
    // }
}