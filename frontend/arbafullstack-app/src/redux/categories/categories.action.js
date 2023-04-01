import { ADDNEWPRODUCT, DELETEPRODUCT, EDITPRODUCT, GETALLPRODUCTS } from "./categories.type"

export const getCategory = () => async (dispatch) => {
    try {
        let res = await fetch("https://lazy-rose-dhole-cap.cyclic.app/category/get", {
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem("token")
            }
        }).then((res) => res.json())
        console.log(res);
        return dispatch({ type: GETALLPRODUCTS, payload: res.result })
    } catch (error) {
        console.log(error, "arr")
    }
}
export const addNewCategory = (data) => async (dispatch) => {
    try {
        let res = await fetch(`https://lazy-rose-dhole-cap.cyclic.app/category/add`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem("token")
            }
        }).then((res) => res.json())
        console.log(res);
        // return dispatch({ type: ADDNEWPRODUCT, payload: res })
    } catch (error) {
        console.log(error, "arr")
    }
}

export const updateCategory = (data) => async (dispatch) => {
    try {
        let res = await fetch(`https://lazy-rose-dhole-cap.cyclic.app/category/update/${data._id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem("token")
            }
        }).then((res) => res.json())
        console.log(res);
        // return dispatch({ type: ADDNEWPRODUCT, payload: data })
    } catch (error) {
        console.log(error, "arr")
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        let res = await fetch(`https://lazy-rose-dhole-cap.cyclic.app/category/delete${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem("token")
            }
        })
        console.log(res)
        // return dispatch({ type: DELETEPRODUCT, payload: { _id: id } })
    } catch (error) {
        console.log(error, "arr")
    }
}