import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  FETCH_DATA: "fetch-data",
  ERROR: "error"
};

const initialState = {
  data: [],
  loading: false,
  error: null
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_DATA:
      return { data: payload, loading: false };
    case ACTIONS.ERROR:
      return { data: [], error: payload };
    default:
      return state;
  }
}

function useFetch(url, data) { // Passing a data argument is necessary: https://stackoverflow.com/questions/71668249/cant-map-fetched-data-from-custom-usefetch-hook
  const [state, dispatch] = useReducer(reducer, {...initialState, data});
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR, payload: e.error });
      });
  }, [url]);
  return state;
}
export default useFetch;
