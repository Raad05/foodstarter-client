import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <h1 className="text-center">Welcome to FoodStarter</h1>
      <button
        onClick={() => navigate("/create-recipe")}
        className="bg-green-500 text-black border shadow-lg rounded p-2 m-2"
      >
        Create a Recipe
      </button>
      <button
        onClick={() => navigate("/recipes")}
        className="bg-green-500 text-black border shadow-lg rounded p-2 m-2"
      >
        View Recipes
      </button>
    </div>
  );
};

export default Home;
