import { createBrowserRouter } from "react-router-dom";
import CreateRecipe from "../Components/CreateRecipe";
import Main from "../layouts/Main";
import Home from "../Components/Home";
import SearchRecipe from "../Components/SearchRecipe";
import Recipes from "../Components/Recipes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/recipes",
        element: <Recipes></Recipes>,
      },
      {
        path: "/search-recipe",
        element: <SearchRecipe></SearchRecipe>,
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe></CreateRecipe>,
      },
    ],
  },
]);
