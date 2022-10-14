import { all, call, put, takeLatest } from "redux-saga/effects";

import { constants } from "./constants";
import { apiCall } from "../api";
import { getDataFailed, getDataSuccess } from "./actions";

function* getData({ params }) {
  let options = {
    method: "get",
    url: "https://restcountries.com/v2/all?fields=name,region,flag ",
    data: {},
  };
  try {
    const response = yield call(apiCall, options);
    if (response.status === 200 && response.data) {
      yield put(getDataSuccess(response.data));
    } else {
      yield put(getDataFailed(response.data.message));
    }
  } catch (error) {
    yield put(getDataFailed(error || "Error not found!"));
  }
}

//Watcher
export function* watchGetData() {
  yield takeLatest(constants.GET_DATA_REQUEST, getData);
}
function* publicSaga() {
  yield all([watchGetData()]);
}

export default publicSaga;
