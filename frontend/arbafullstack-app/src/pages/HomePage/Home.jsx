import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css";
import Carousel from '../../components/Crousel/Carousel';
import TermsCondition from '../../components/TermandCondition/TermandCondition';
import ProductPage from '../../components/ProductPage/ProductPage';
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from '../../redux/products/products.action';

const Home = () => {
  let isLoading = useSelector((store) => store.prod.loading)
  let data = useSelector((store) => store.prod.product);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [])

  if (isLoading) {
    return (
      <h1>...Loading</h1>
    )
  }

  return (
    <>
      <Carousel />
      <TermsCondition />
      <div className={styles.Home_Main}>
        {/* main content goes here */}
        <h1 style={{ width: "100%" }}>Product</h1>
      </div>
      {data && data.length > 0 && <ProductPage data={data} />}
    </>
  );
};

export default Home;
