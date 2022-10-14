import { constants } from "./constants";

const INIT_STATE = {
  data:[],
  loading: false,
  errorMessage: null,
  successMessage: null,
};

const Reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case constants.GET_DATA_REQUEST: //RESET MSGS
      return {
        ...state,
        loading:true,
        errorMessage: null,
        successMessage: null,
      };

    //
    case constants.GET_DATA_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case constants.GET_DATA_SUCCESS: //SUCCESS
      return {
        ...state,
        loading: false,
        errorMessage: null,
        data:action.payload
      };
  
    default:
      return { ...state };
  }
};

export default Reducer;
