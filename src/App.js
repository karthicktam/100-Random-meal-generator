import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

function App() {
  const [meal, setMeal] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);

  const fetchMeal = () => {
    setButtonLoader(true);
    setMeal({});

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.meals);
        setMeal(res.meals[0]);
        setButtonLoader(false);
      });
  };

  const ingredientsHandler = () => {
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      }
    }

    return ingredients;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Feeling hungry?</h3>
        <p>Get a random meal by clicking below</p>
        <button onClick={fetchMeal} disabled={buttonLoader}>
          {buttonLoader ? (
            /*<i className="fa fa-circle-o-notch fa-spin"></i>*/
            <FontAwesomeIcon icon={faCircleNotch} />
          ) : (
            `GET MEAL 🍔`
          )}
        </button>
      </header>
      {Object.keys(meal).length <= 0 ? (
        <div></div>
      ) : (
        <div className="view">
          <div className="container">
            <div className="container-image">
              <img src={meal.strMealThumb} alt="" />
              <p>Category: {meal.strCategory}</p>
              <p>Area: {meal.strArea}</p>
              {meal.strTags ? (
                <p>
                  <strong>Tags: </strong>
                  {meal.strTags.split(",").join(", ")}
                </p>
              ) : null}
              <h2>Ingredients: </h2>
              <ul>
                {ingredientsHandler().map((ingredient) => (
                  <li key={ingredient + Math.random()}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe">
              <h1>{meal.strMeal}</h1>
              <p className="space">{meal.strInstructions}</p>
            </div>
          </div>
          <div>
            {meal.strYoutube ? (
              <div className="videoWrapper">
                <h5>Video Recipe</h5>
                <div>
                  <iframe
                    title="unique"
                    width="420"
                    height="315"
                    src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}`}
                  ></iframe>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
