import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";

import reducer from "./reducer";

export default function configureStore(initialState = {
    shavedIceOptions: ["Tiger's Blood", "Strawberry Cheesecake", "Pink Lemonade", "Red Velvet"]
}) {
  const store = createStore(reducer, initialState, applyMiddleware(logger));
  return store;
}