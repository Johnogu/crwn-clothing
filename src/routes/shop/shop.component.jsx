/*import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
*/
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
//import { setCategories } from "../../store/categories/category.action";
import {
  fetchCategoriesAsync,
  fetchCategoriesStart,
} from "../../store/categories/category.action";

//import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";
//import SHOP_DATA from "../../shop-data.json";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //used fetchCategoriesStart when used with Saga
    //dispatch(fetchCategoriesAsync());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
