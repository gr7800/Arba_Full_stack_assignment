import { PRODUCT_ERROR, PRODUCT_LOADING, PRODUCT_SUCCESS } from "./products.type";

export const MakeProductRequest = () => {
    return {
        type: PRODUCT_LOADING,
    };
};

export const GenratingError = (payload) => {
    return {
        type: PRODUCT_ERROR,
    };
}

export const ProductSucces = (payload) => {
    return {
        type: PRODUCT_SUCCESS,
        payload
    };
}

export const getProduct = () => async (dispatch) => {
    dispatch(MakeProductRequest())
    try {
        let res = await fetch(
            "https://lazy-rose-dhole-cap.cyclic.app/product/get",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token"),
                },
            }
        );
        res = await res.json();
        if(res.result){
            dispatch(ProductSucces(res.result));
        }
    } catch (error) {
        console.log(error);
        dispatch(GenratingError)
        return false;
    }
};
