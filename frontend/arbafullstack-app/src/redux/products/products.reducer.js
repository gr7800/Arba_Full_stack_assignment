import {
    PRODUCT_ERROR,
    PRODUCT_LOADING,
    PRODUCT_SUCCESS,
  } from "./products.type";
  
  export const authInitalState = {
    loading: false,
    product: [],
    error: false,
  };
  
  export const productReducer = (state = authInitalState, action) => {
    switch (action.type) {
      case PRODUCT_SUCCESS: {
        return {
          ...state,
          loading:false,
          product: action.payload,
        };
      }
      case PRODUCT_ERROR: {
        return {
          ...state,
          loading:false,
          error: true,
        };
      }
      case PRODUCT_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      default: {
        return state;
      }
    }
  };
  