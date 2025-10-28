import React, { useState } from "react";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient!");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError("No recipes found for that ingredient.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-orange-700 mb-4">
        🍳 Recipe Ideas
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Enter an ingredient to discover easy and delicious recipes!
      </p>

      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="e.g., chicken, egg, tomato..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="flex-grow p-3 rounded-xl border border-orange-300 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <button
          onClick={fetchRecipes}
          className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-orange-600 text-lg">Loading recipes...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-xl mb-3 w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {recipe.strMeal}
            </h3>
            <a
              href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              View Recipe →
            </a>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Made with ❤️ using React & TheMealDB API
      </footer>
    </div>
  );
}

export default App;
