import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/categort.saga";

export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}