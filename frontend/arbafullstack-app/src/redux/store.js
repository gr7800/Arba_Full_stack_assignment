import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { productReducer } from "./products/products.reducer";
import CategoryReducer from "./categories/categories.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  prod:productReducer,
  category:CategoryReducer,
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhanser = composer(applyMiddleware(thunk));

export const store = legacy_createStore(rootReducer, enhanser);
