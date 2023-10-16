import { useAccount } from "wagmi";
import contractABI from "../abi/contractABI.json";
import { readContract } from "@wagmi/core";
import { useState } from "react";

const SearchRecipe = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  const contractAddress = "0xeB69A07abbD481e7F8Ac04b6C154FF301fd2F150";

  const getData = async (e) => {
    e.preventDefault();
    try {
      const data = await readContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "getRecipe",
        args: [name],
        account: address,
      });

      const blob = {
        name: data[0],
        ingredients: data[1],
        fundAmount: data[2],
        recipeBy: data[3],
        fundRaised: data[4],
        time: data[5],
      };
      setResult(blob);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("No recipes matched");
    }
  };

  const handleInput = (e) => {
    const form = e.target;
    const recipe = form.value;
    setName(recipe);
  };

  return (
    <div className="search-recipe">
      <form onSubmit={getData}>
        <input
          onChange={handleInput}
          type="text"
          name="recipe"
          className="border p-2"
        />
        <button type="submit">Search</button>
      </form>
      {!loading ? (
        <div className="w-80 h-80 border">
          <p>Name: {result.name}</p>
          <p>Ingredients:</p>
          <ul>
            {result.ingredients.map((flavor, idx) => (
              <li key={idx}>{flavor}</li>
            ))}
          </ul>
          <p>Fund amount: {result.fundAmount.toString()}</p>
          <p>Fund raised: {result.fundRaised.toString()}</p>
          <p>Time: {result.time}</p>
        </div>
      ) : (
        <p>Search for a recipe</p>
      )}
    </div>
  );
};

export default SearchRecipe;
