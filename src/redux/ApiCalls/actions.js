import { constants } from "./constants";


export const getData = (params) => ({
    type: constants.GET_DATA_REQUEST,
    params
});

export const getDataSuccess = (data) => ({
    type: constants.GET_DATA_SUCCESS,
    payload: data
});

export const getDataFailed = error => ({
    type: constants.GET_DATA_FAILED,
    payload: error
});
