// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import classNames from 'classnames/bind';

// style
import activity from "./activity.css";

// image
import dateIcon from "assets/images/date-icon.png";

// user modules
import {SET_ACTIVITY_LIST, SET_ACTIVITY_SEARCH, setListData} from "modules/state";
import {MoreType1} from "views/components";

const st = classNames.bind(activity);

class Activity extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Activity");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Activity");
    }

    componentDidMount() {
        console.log("componentDidMount Activity");
        let props = this.props; 
        let listData = props.listData;
        let searchQuery = props.location.state;
        
        if (searchQuery) {
            props.setListData(
                {
                    type : SET_ACTIVITY_SEARCH,
                    query : searchQuery
                }
            );
        } else {
            if (!listData) {
                props.setListData(
                    {
                        type : SET_ACTIVITY_LIST
                    }
                );
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Activity");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Activity");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Activity");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Activity");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Activity");
        let props = this.props;
        if (props.cancelReq) {
            props.cancelReq();
        }
    }

    /**
     * User func
     */
    makeList() {
        let items = this.props.location.state ? this.props.searchData.data : this.props.listData.data;

        return items.map((_item, _idx) => {
            let splitItem = _item.target.split(",");
            let result = [];

            result.push(splitItem.map((_item, _idx) => {
                let count = "";
                let type = "";
                let bgType = "";
                
                count = _item.replace(/[^0-9]/g, "");

                switch(_item.charAt(0)) {
                    case "초" :
                        bgType = "ele";
                        type = "초";
                        break;
                    case "중" :
                        bgType = "mid";
                        type = "중";
                        break;
                    case "고" :
                        bgType = "hig";
                        type = "고";
                        break;
                    case "학" :
                        bgType = "par";
                        type = "학";
                        break;
                    case "대" :
                        bgType = "uni";
                        type = "대";
                        break;
                    default :
                        break;
                }

                return (
                    <div className={ st("target") }>
                        <span className={ st("item", "type", bgType) }>{type}</span>
                        <span className={ st("item", "count", "c-" + bgType) }>{count}</span>
                    </div>
                );
            }));

            return (
                <Link className={ st("link-wrap") } 
                    to={
                        {
                            pathname : "/detail/activity/" + _item.key1, 
                            query : { 
                                t : encodeURIComponent(_item.pgmNm)} 
                            }
                        } key={_idx}>
                    <ul className={ st("list-box") }>
                        <li className={ st("title") }>{_item.pgmNm.replace(/&quot/g,"\"")}</li>
                        <ul className={ st("info-wrap") }>    
                            <li className={ st("item") }>{_item.organNm}</li>
                            <li className={ st("item") }>참가비 <span className={ st("price") }>{_item.price}</span></li>
                        </ul>
                        <ul className={ st("term-wrap") }>
                            <li className={ st("target-wrap") }>{result}</li>
                            <li className={ st("date-wrap") }><img className={ st("date-icon") } src={dateIcon} alt="date-icon" /> {_item.sdate.replace(/\//gi, ".")}</li>
                        </ul>
                    </ul>
                </Link>
            );
        });
    }

    requestList() {
        let props = this.props;
        let searchQuery = props.location.state;
        
        if (searchQuery) {
            props.setListData(
                {
                    type : SET_ACTIVITY_SEARCH,
                    query : searchQuery,
                    searchPage : props.searchPage
                }
            );
        } else {
            props.setListData(
                {
                    type : SET_ACTIVITY_LIST,
                    page : props.page
                }
            );
        }
    }

    render() {
        let data = this.props.location.state ? this.props.searchData : this.props.listData;
        
        return(
            <section className={ st("list-wrap") }>
                {
                    data ? this.makeList() : ""
                }
                {
                    data
                        ?
                        <MoreType1 type="main-btn-type" value="더보기" requestList={this.requestList} />
                        :
                        ""
                }
            </section>
        );
    }
}

const mapStateToProps = (_state, _ownProps) => {
    return {
        cancelReq : _state.state.cancelReq,
        page : _state.activity.page,
        searchPage : _state.activity.searchPage,
        searchData : _state.activity.searchData,
        listData : _state.activity.listData,
        errorMessage : _state.activity.errorMessage
    };
};

const mapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        setListData : (_obj) => {
            return _dispatch(setListData(_obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);