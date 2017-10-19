import { combineReducers } from 'redux';
import axios from 'axios';

/**
 * init value
 */
const initData = {
    state : {
        pageType : undefined,
        isLoading : false,
        cancelReq : undefined
    },
    activity : {
        page : 1,
        listData : undefined,
        detailData : undefined,
        errorMessage : ""
    },
    serve : {
        page : 1,
        listData : undefined,
        detailData : undefined,
        errorMessage : ""
    },
    vacation : {
        page : 1,
        listData : undefined,
        detailData : undefined,
        errorMessage : ""
    },
    international : {
        page : 1,
        listData : undefined,
        detailData : undefined,
        errorMessage : ""
    }
};

/**
 * private logic function
 */
const requestData = (_obj, _dispatch) => {
    let result;
    let CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    let type = _obj.type;
    let key = _obj.key;
    let page = _obj.page ? _obj.page * 10 : 10;

    switch(type) {
        case SET_ACTIVITY_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getCertiProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_SERVE_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getVolProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_VACATION_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getVacationProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_INTERNATIONAL_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getYngbgsIntrlExchgProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_ACTIVITY_DETAIL :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/detail/getCertiProgrmInfo/" + key,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_SERVE_DETAIL :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/detail/getVolProgrmInfo/" + key,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_VACATION_DETAIL :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/detail/getVacationProgrmInfo/" + key,
                {
                    cancelToken: source.token
                }
            );
            break;
        default :
            break;
    }

    // Start loading
    _dispatch(setLoadingState(true, source.cancel));

    return result;
};

/**
 * Actions (private, public)
 */
const SET_LOADING_STATE = "app/modules/state/SET_LOADING_STATE";
export const SET_PAGE_TYPE = "app/modules/state/SET_PAGE_TYPE";
// List
export const SET_ACTIVITY_LIST = "app/modules/state/SET_ACTIVITY_LIST";
export const SET_SERVE_LIST = "app/modules/state/SET_SERVE_LIST";
export const SET_VACATION_LIST = "app/modules/state/SET_VACATION_LIST";
export const SET_INTERNATIONAL_LIST = "app/modules/state/SET_INTERNATIONAL_LIST";
// Detail
export const SET_ACTIVITY_DETAIL = "app/modules/state/SET_ACTIVITY_DETAIL";
export const SET_SERVE_DETAIL = "app/modules/state/SET_SERVE_DETAIL";
export const SET_VACATION_DETAIL = "app/modules/state/SET_VACATION_DETAIL";
export const SET_INTERNATIONAL_DETAIL = "app/modules/state/SET_INTERNATIONAL_DETAIL";

/**
 * Action Creators (private, public)
 */
const setLoadingState = (_isLoading, _cancelReq) => ({
    type : SET_LOADING_STATE,
    isLoading : _isLoading,
    cancelReq : _cancelReq
});

export const setPageType = (_pageType) => ({
    type : SET_PAGE_TYPE,
    pageType : _pageType
});

export const setListData = (_obj) => (_dispatch, _getState) => {
    let currentListData;
    let currentPage;
    let type = _obj.type;

    switch(type) {
        case SET_ACTIVITY_LIST :
            currentListData = _getState().activity.listData;
            currentPage = _getState().activity.page;
            break;
        case SET_SERVE_LIST :
            currentListData = _getState().serve.listData;
            currentPage = _getState().serve.page;
            break;
        case SET_VACATION_LIST :
            currentListData = _getState().vacation.listData;
            currentPage = _getState().vacation.page;
            break;
        case SET_INTERNATIONAL_LIST :
            currentListData = _getState().international.listData;
            currentPage = _getState().international.page;
            break;
        case SET_ACTIVITY_DETAIL :
        case SET_SERVE_DETAIL :
        case SET_VACATION_DETAIL :
        case SET_INTERNATIONAL_DETAIL :
            // Init detailData before call http
            _dispatch(
                {
                    type : type,
                    detailData : undefined,
                    errorMessage : ""
                }
            );
            break;
        default :
            break;
    }

    if (type === SET_INTERNATIONAL_DETAIL) {

        currentListData = _getState().international.listData;

        _dispatch(
            {
                type : type,
                detailData : currentListData ? { data : [currentListData.data[Number(_obj.key, 10)]] } : undefined,
                errorMessage : currentListData ? "" : "empty"
            }
        );    
    } else {
        return requestData(_obj, _dispatch).then(
            (_response) => {
                if (_response.errorMessage) {
                    switch(type) {
                        case SET_ACTIVITY_LIST :
                        case SET_SERVE_LIST :
                        case SET_VACATION_LIST :
                        case SET_INTERNATIONAL_LIST :
                            _dispatch(
                                {
                                    type : type,
                                    listData : currentListData,
                                    errorMessage : _response.errorMessage
                                }
                            );       
                            break;
                        case SET_ACTIVITY_DETAIL :
                        case SET_SERVE_DETAIL :
                        case SET_VACATION_DETAIL :
                        case SET_INTERNATIONAL_DETAIL :
                            _dispatch(
                                {
                                    type : type,
                                    detailData : undefined,
                                    errorMessage : _response.errorMessage
                                }
                            );   
                            break;
                        default :
                            break;
                    }
                } else {
                    switch(type) {
                        case SET_ACTIVITY_LIST :
                        case SET_SERVE_LIST :
                        case SET_VACATION_LIST :
                        case SET_INTERNATIONAL_LIST :
                            if (currentListData) {

                                currentListData.data = currentListData.data.concat(_response.data.data);

                                _dispatch(
                                    {
                                        type : type,
                                        page : ++currentPage,
                                        listData : currentListData,
                                        errorMessage : ""
                                    } 
                                );
                            } else {
                                _dispatch(
                                    {
                                        type : type,
                                        page : ++currentPage,
                                        listData : _response.data,
                                        errorMessage : ""
                                    } 
                                );
                            }
                            break;
                        case SET_ACTIVITY_DETAIL :
                        case SET_SERVE_DETAIL :
                        case SET_VACATION_DETAIL :
                        case SET_INTERNATIONAL_DETAIL :
                            _dispatch(
                                {
                                    type : type,
                                    detailData : _response.data,
                                    errorMessage : ""
                                } 
                            );
                            break;
                        default :
                            break;
                    }
                }

                // Stop loading
                _dispatch(setLoadingState(false, undefined));
            }
        ).catch(
            (_error) => {
                _dispatch(
                    {
                        type : type,
                        listData : currentListData,
                        errorMessage : _error
                    }
                );

                _dispatch(setLoadingState(false, undefined));
            }
        );
    }
};

/**
 * Reducers
 */
const state = (_state = initData.state, _action) => {
    let state;

    switch (_action.type) {
        case SET_PAGE_TYPE :
            state = Object.assign({}, _state, {
                pageType : _action.pageType
            });
            break;
        case SET_LOADING_STATE :
            state = Object.assign({}, _state, {
                isLoading : _action.isLoading,
                cancelReq : _action.cancelReq
            }); 
            break; 
        default :
            state = _state;
            break;
    }

    return state;
};

const activity = (_state = initData.activity, _action) => {
    switch (_action.type) {
        case SET_ACTIVITY_LIST :
            return Object.assign({}, _state, {
                page : _action.page,
                listData : _action.listData,
                errorMessage : _action.errorMessage
            });
        case SET_ACTIVITY_DETAIL :
            return Object.assign({}, _state, {
                detailData : _action.detailData,
                errorMessage : _action.errorMessage
            });
        default :
            return _state;
    }
};

const serve = (_state = initData.serve, _action) => {
    switch (_action.type) {
        case SET_SERVE_LIST :
            return Object.assign({}, _state, {
                page : _action.page,
                listData : _action.listData,
                errorMessage : _action.errorMessage
            }); 
        case SET_SERVE_DETAIL :
            return Object.assign({}, _state, {
                detailData : _action.detailData,
                errorMessage : _action.errorMessage
            });
        default :
            return _state;
    }
};

const vacation = (_state = initData.vacation, _action) => {
    switch (_action.type) {
        case SET_VACATION_LIST :
            return Object.assign({}, _state, {
                page : _action.page,
                listData : _action.listData,
                errorMessage : _action.errorMessage
            });
        case SET_VACATION_DETAIL :
            return Object.assign({}, _state, {
                detailData : _action.detailData,
                errorMessage : _action.errorMessage
            });
        default :
            return _state;
    }
};

const international = (_state = initData.international, _action) => {
    switch (_action.type) {
        case SET_INTERNATIONAL_LIST :
            return Object.assign({}, _state, {
                page : _action.page,
                listData : _action.listData,
                errorMessage : _action.errorMessage
            });
        case SET_INTERNATIONAL_DETAIL :
            return Object.assign({}, _state, {
                detailData : _action.detailData,
                errorMessage : _action.errorMessage
            });    
        default :
            return _state;
    }
};

export default combineReducers({
    state : state,
    activity : activity,
    serve : serve,
    vacation : vacation,
    international : international
});