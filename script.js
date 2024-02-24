const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const searchbtn=document.querySelector('#btn');
const input =document.querySelector(".inp");
const recepies =document.querySelector(".recepies");
const popUp =document.querySelector(".pop-up");
const closepopUp =document.querySelector(".close");
const mealText = document.querySelector(".meal-text");
const findfood =async(m)=>{
    recepies.innerHTML="<h2>Fetching.....</h2>";
    data=await fetch(`${url}${m}`);
    response=await data.json();
    recepies.innerHTML="";
    response.meals.forEach(meal => {
        const recipies_card = document.createElement('div');
        recipies_card.classList.add('card');
        recipies_card.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>This belongs to ${meal.strCategory} category</p>
        `
        const btn = document.createElement('button');
        btn.setAttribute("class","btn1");
        btn.textContent='view more';
        recepies.appendChild(recipies_card);
        recipies_card.appendChild(btn);
        btn.addEventListener('click',()=>{
            popUp.classList.add('pop-down');
            mealText.innerHTML=`
            <h4>${meal.strMeal}</h4>
            <p>Ingrdients:</p>
            <ul>${addIndegredient(meal)}</ul>
            <p>Instruction:</p>
            <p>${meal.strInstructions}</p>
            `
        });
    }
    );
};
addIndegredient=(m)=>{
    indegredientlist="";
    for(let i=1;i<=20;i++)
    {
        indegredient=m[`strIngredient${i}`];
        mealsize=m[`strMeasure${i}`];
        if(indegredient)
        {
            indegredientlist+=`<li>${mealsize} ${indegredient}</li>`; 
        }
        else{
            break;
        }
    }
    return indegredientlist;
}
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    meal=input.value.trim();
    findfood(meal);
});
closepopUp.addEventListener('click',()=>{
    popUp.setAttribute('class','pop-up');
});
