import React, { useEffect, useState } from 'react'
import styles from "./Product.module.css"

const ProductPage = ({ data }) => {
  // State to keep track of cart data
  const [cart, setCart] = useState((JSON.parse(localStorage.getItem("cartdata")) || {}));

  // Function to add an item to the cart
  const addToCart = (el) => {
    setCart((prevCart) => ({
      ...prevCart,
      [el._id]: { quantity: 1 } // Add the item to cart with quantity 1
    }));
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: { quantity: (prevCart[id].quantity || 0) + 1 } // Increase the quantity by 1
    }));
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: { quantity: (prevCart[id].quantity || 0) - 1 } // Decrease the quantity by 1
    }));
  };

  // Save cart data to localStorage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cartdata", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={styles.ProductContainer}>
      {/* Map through product data and render each product */}
      {data && data.length > 0 && data.map((el) => (
        <div key={el._id} className={styles.SingleProduct}>
          <div className={styles.productimage}><img src={el.image} alt="productimage" width={"100%"} /></div>
          <div className={styles.productdescription}>
            <h2>{el.title}</h2>
            <p>{el.description}</p>
            <h4>Rs. {el.price}</h4>
            {/* If item is not in cart, show "Add to cart" button, otherwise show quantity and increase/decrease buttons */}
            {!cart[el._id] ? (
              <div className={styles.Product_Add_ToCart} onClick={() => addToCart(el)}>Add To Cart</div>
            ) : (
              <div className={styles.Product_Quantity}>
                <button onClick={() => decreaseQuantity(el._id)} disabled={cart[el._id].quantity === 1}>-</button>
                <span>{cart[el._id].quantity}</span>
                <button onClick={() => increaseQuantity(el._id)}>+</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductPage
