import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import logger from "redux-logger";
//import { loggerMiddleware } from "./middleware/logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage, //shortcut for stor variable as the key name (oklart om det ska vara fuuttar): storage: storage
  //blacklist: ["user"],
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//only use logger in development environment. Filter out booleans so we don't send false as middleware
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  //thunk,
  sagaMiddleware,
].filter(Boolean);

//Use redux devtools if not in production, otherwise use normal compose from redux
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
