import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import contractABI from "../abi/contractABI.json";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Recipes = () => {
  const [result, setResult] = useState([]);
  const { address } = useAccount();

  const contractAddress = "0xF2A46987867c148691FD8FFBe906A49937C451aF";

  const fetchData = async () => {
    try {
      const data = await readContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "getAllRecipes",
      });
      setResult(data);
    } catch (err) {
      console.log("Error loading recipes", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendFund = async (name) => {
    try {
      const request = await prepareWriteContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "sendFunding",
        args: [name],
        account: address,
      });

      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });

      alert("Successfully sent fund");
      window.location.reload();
    } catch (err) {
      alert("Failed to send fund");
      console.log(err);
    }
  };

  const withdrawFund = async (name) => {
    try {
      const request = await prepareWriteContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "withdrawFunding",
        args: [name],
        account: address,
      });

      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });

      alert("Fund withdrawal successful");
      window.location.reload();
    } catch (err) {
      alert("Failed to withdraw fund");
      console.log(err);
    }
  };

  return (
    <div className="recipes">
      <h1>Recipes</h1>
      <div className="grid grid-cols-3">
        {result.map((recipe, idx) => (
          <div key={idx} className="w-80 h-80 border">
            <p>Recipe name: {recipe.name}</p>
            <p>
              Ingredients:{" "}
              <span>
                <ul>
                  {" "}
                  {recipe.ingredients.map((flavor, idx) => (
                    <li key={idx}>{flavor}</li>
                  ))}
                </ul>
              </span>
            </p>
            <p>Fund raised: {recipe.fundRaisedSoFar.toString()}</p>
            <button
              onClick={() => sendFund(recipe.name)}
              className="bg-red-400 p-2 text-white rounded"
            >
              Fund
            </button>
            <button
              onClick={() => withdrawFund(recipe.name)}
              className="bg-red-400 p-2 text-white rounded"
            >
              Withdraw Fund
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
