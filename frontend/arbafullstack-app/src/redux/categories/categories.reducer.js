import { GETALLPRODUCTS, EDITPRODUCT, DELETEPRODUCT, ADDNEWPRODUCT } from "./categories.type";
const init = {
    data: [],
    isloading: false
}
export default function CategoryReducer(state = init, { type, payload }) {
    switch (type) {
        case GETALLPRODUCTS:
            return {
                ...state, data: payload
            }
        case EDITPRODUCT:
            return {
                ...state, data: payload
            }
        case ADDNEWPRODUCT: return {
            ...state, data: payload
        }
        case DELETEPRODUCT:
            return {
                ...state, data: payload
            }
        default: return state
    }


}