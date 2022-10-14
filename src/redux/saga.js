// @flow
import { all } from "redux-saga/effects";

import publicSaga from "./ApiCalls/saga";

export default function* rootSaga(getState: any): any {
  yield all([
    publicSaga(),
  ]);
}
