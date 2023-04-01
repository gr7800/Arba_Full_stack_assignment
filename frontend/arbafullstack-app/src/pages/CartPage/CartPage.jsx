import React, { useEffect, useState } from 'react'

import styles from "./CartPage.module.css"
import ProductPage from '../../components/ProductPage/ProductPage'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/products/products.action'


const CartPage = () => {
    let data = useSelector((store) => store.prod.product) || []
    let cartdata = JSON.parse(localStorage.getItem("cartdata")) || {};

    let temp;
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const handleCheckout=()=>{
       let total=0
       temp.forEach((el)=>{
          total+=el.price*cartdata[el._id].quantity
       })
       alert(`Your Have to pay ${total} Rupees !`);
    }

    if (data && data.length > 0) {
        temp = data.filter((el) => {
            if (cartdata[el._id]) {
                return el
            }
        })
    }

    return (
        <>
            <div className={styles.CartContainer}>
                <h1>Cart Page</h1>
                {temp && temp.length > 0 && <ProductPage data={temp} />}
            </div>
            <div className={styles.checkout}>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </>
    )
}

export default CartPage