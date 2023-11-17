import { createStore, combineReducers } from "redux";
import data from "../data.json";

const initialState = {
  products: data,
  currentCategory: null,
  currentPage: 1,
  removedItems: [],
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload, currentPage: 1 };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "REMOVE_ITEM":
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.category]: state.products[
            action.payload.category
          ].filter((product) => product.id !== action.payload.id),
        },
        removedItems: [
          ...state.removedItems,
          state.products[action.payload.category].find(
            (product) => product.id === action.payload.id
          ),
        ],
      };
    case "RESTORE_ITEM":
      const restoredItem = state.removedItems.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.category]: [
            ...state.products[action.payload.category],
            restoredItem,
          ],
        },
        removedItems: state.removedItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  productsData: productsReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
