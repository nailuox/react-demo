import * as constants from "./constant";
import axios from "axios";
import { CHANGE_EDIT_ITEM } from "./constant";
import { PUT_INFO } from "./constant";

// 刚进入页面时，将从api获取到的列表，初始化到store
export const initListAction = list => {
  return {
    type: constants.INIT_LIST,
    list
  };
};

// 异步获取列表
export const getList = () => {
  return dispatch => {
    axios.get("/api/list.json").then(res => {
      const { data } = res;
      const action = initListAction(data);
      dispatch(action);
    });
  };
};
export const changeEditItem = editItem => {
  return async dispatch => {
    dispatch({ type: CHANGE_EDIT_ITEM, data: editItem });
  };
};

export const putInfo = values => {
  return async dispatch => {
    dispatch({ type: PUT_INFO, data: values });
  };
};
