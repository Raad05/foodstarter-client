import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import contractABI from "../abi/contractABI.json";
import { useEffect, useState } from "react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";
import { parseEther } from "viem";

const Recipes = () => {
  const [result, setResult] = useState([]);
  const { address } = useAccount();

  const contractAddress = "0xeB69A07abbD481e7F8Ac04b6C154FF301fd2F150";

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

  const sendFund = async (name, amount) => {
    try {
      const request = await prepareWriteContract({
        abi: contractABI,
        address: contractAddress,
        value: amount,
        functionName: "sendFunding",
        args: [name],
        account: address,
      });

      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });

      alert("Successfully sent fund");
    } catch (err) {
      alert("Failed to send fund");
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
              onClick={() => sendFund(recipe.name, recipe.fundAmount)}
              className="bg-red-400 p-2 text-white rounded"
            >
              Fund
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
