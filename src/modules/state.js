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
        searchPage : 1,
        listData : undefined,
        searchData : undefined,
        detailData : undefined,
        errorMessage : ""
    },
    serve : {
        page : 1,
        searchPage : 1,
        listData : undefined,
        searchData : undefined,
        detailData : undefined,
        errorMessage : ""
    },
    singo : {
        page : 1,
        searchPage : 1,
        listData : undefined,
        searchData : undefined,
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
    let source = CancelToken.source();
    let type = _obj.type;
    let key = _obj.key;
    let page = _obj.page ? _obj.page * 10 : 10;
    let searchPage = _obj.searchPage ? _obj.searchPage * 10 : 10;
    let query = _obj.searchQuery;
    let queryString = "";

    switch(type) {
        case SET_ACTIVITY_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getCertiProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_ACTIVITY_SEARCH :
            queryString = query.p + "|" + query.c + "|" + query.d;
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getCertiProgrmList/" + searchPage + "/" + queryString,
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
        case SET_SERVE_SEARCH :
            queryString = query.p + "|" + query.c + "|" + query.d;
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getVolProgrmList/" + searchPage + "/" + queryString,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_SINGO_LIST :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getSingoProgrmList/" + page,
                {
                    cancelToken: source.token
                }
            );
            break;
        case SET_SINGO_SEARCH :
            queryString = query.p + "|" + query.c + "|" + query.d;
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/list/getSingoProgrmList/" + searchPage + "/" + queryString,
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
        case SET_SINGO_DETAIL :
            result = axios.get("https://kytza9xk2k.execute-api.ap-northeast-1.amazonaws.com/content/detail/getSingoProgrmNewInfo/" + key,
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
export const SET_SINGO_LIST = "app/modules/state/SET_SINGO_LIST";
export const SET_ACTIVITY_SEARCH = "app/modules/state/SET_ACTIVITY_SEARCH";
export const SET_SERVE_SEARCH = "app/modules/state/SET_SERVE_SEARCH";
export const SET_SINGO_SEARCH = "app/modules/state/SET_SINGO_SEARCH";
export const RESET_ACTIVITY_SEARCH = "app/modules/state/RESET_ACTIVITY_SEARCH";
export const RESET_SERVE_SEARCH = "app/modules/state/RESET_SERVE_SEARCH";
export const RESET_SINGO_SEARCH = "app/modules/state/RESET_SINGO_SEARCH";

// Detail
export const SET_ACTIVITY_DETAIL = "app/modules/state/SET_ACTIVITY_DETAIL";
export const SET_SERVE_DETAIL = "app/modules/state/SET_SERVE_DETAIL";
export const SET_SINGO_DETAIL = "app/modules/state/SET_SINGO_DETAIL";

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

export const resetSearchData = (_obj) => (_dispatch, _getState) => {
    let type = _obj.type;

    _dispatch(
        {
            type : type,
            searchData : undefined,
            searchPage : 1,
            errorMessage : ""
        }
    );
};

export const setListData = (_obj) => (_dispatch, _getState) => {
    let currentListData;
    let currentPage = 1;
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
        case SET_SINGO_LIST :
            currentListData = _getState().singo.listData;
            currentPage = _getState().singo.page;
            break;
        case SET_ACTIVITY_DETAIL :
        case SET_SERVE_DETAIL :
        case SET_SINGO_DETAIL :
            // Init detailData before call http
            _dispatch(
                {
                    type : type,
                    detailData : undefined,
                    errorMessage : ""
                }
            );
            break;
        case SET_ACTIVITY_SEARCH :
            // Init searchData before call http
            currentPage = _getState().activity.searchPage;
            currentListData = _getState().activity.searchData;
            break;
        case SET_SERVE_SEARCH :
            // Init searchData before call http
            currentPage = _getState().serve.searchPage;
            currentListData = _getState().serve.searchData;
            break;
        case SET_SINGO_SEARCH :
            // Init searchData before call http
            currentPage = _getState().singo.searchPage;
            currentListData = _getState().singo.searchData;
            break;
        default :
            break;
    }

    return requestData(_obj, _dispatch).then(
        (_response) => {
            if (_response.errorMessage) {
                switch(type) {
                    case SET_ACTIVITY_LIST :
                    case SET_SERVE_LIST :
                    case SET_SINGO_LIST :
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
                    case SET_SINGO_DETAIL :
                        _dispatch(
                            {
                                type : type,
                                detailData : undefined,
                                errorMessage : _response.errorMessage
                            }
                        );   
                        break;
                    case SET_ACTIVITY_SEARCH :
                    case SET_SERVE_SEARCH :
                    case SET_SINGO_SEARCH :
                        // Init searchData before call http
                        _dispatch(
                            {
                                type : type,
                                searchData : undefined,
                                errorMessage : ""
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
                    case SET_SINGO_LIST :
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
                    case SET_SINGO_DETAIL :
                        _dispatch(
                            {
                                type : type,
                                detailData : _response.data,
                                errorMessage : ""
                            } 
                        );
                        break;
                    case SET_ACTIVITY_SEARCH :
                    case SET_SERVE_SEARCH :
                    case SET_SINGO_SEARCH :
                        if (currentListData) {
                            currentListData.data = currentListData.data.concat(_response.data.data);

                            _dispatch(
                                {
                                    type : type,
                                    searchPage : ++currentPage,
                                    searchData : currentListData,
                                    errorMessage : ""
                                } 
                            );
                        } else {
                            _dispatch(
                                {
                                    type : type,
                                    searchPage : ++currentPage,
                                    searchData : _response.data,
                                    errorMessage : ""
                                } 
                            );
                        }
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
        case SET_ACTIVITY_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
                errorMessage : _action.errorMessage
            });
        case RESET_ACTIVITY_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
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
        case SET_SERVE_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
                errorMessage : _action.errorMessage
            });
        case RESET_SERVE_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
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

const singo = (_state = initData.singo, _action) => {
    switch (_action.type) {
        case SET_SINGO_LIST :
            return Object.assign({}, _state, {
                page : _action.page,
                listData : _action.listData,
                errorMessage : _action.errorMessage
            });
        case SET_SINGO_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
                errorMessage : _action.errorMessage
            });
        case RESET_SINGO_SEARCH :
            return Object.assign({}, _state, {
                searchPage : _action.searchPage,
                searchData : _action.searchData,
                errorMessage : _action.errorMessage
            });
        case SET_SINGO_DETAIL :
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
    singo : singo
});