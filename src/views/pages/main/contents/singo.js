// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import classNames from 'classnames/bind';

// style
import singo from "./singo.css";

// image
import dateIcon from "assets/images/date-icon.png";

// user modules
import {SET_SINGO_LIST, SET_SINGO_SEARCH, RESET_SINGO_SEARCH, setListData, resetSearchData} from "modules/state";
import {MoreType1} from "views/components";

const st = classNames.bind(singo);

class Singo extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Singo");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Singo");
    }

    componentDidMount() {
        console.log("componentDidMount Singo");
        let props = this.props;
        let listData = props.listData;
        let searchQuery = props.location.state;

        if (searchQuery) {
            props.setListData(
                {
                    type : SET_SINGO_SEARCH,
                    searchQuery : searchQuery
                }
            );
        } else {
            if (!listData) {
                props.setListData(
                    {
                        type : SET_SINGO_LIST
                    }
                );
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Singo");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Singo");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Singo");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Singo");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Singo");
        let props = this.props;

        if (props.cancelReq) {
            props.cancelReq();
        }

        props.resetSearchData(
            {
                type : RESET_SINGO_SEARCH
            }
        );
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
                        bgType = "all";
                        type = "ALL"
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
                            pathname : "/detail/singo/" + _item.key1, 
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
                    type : SET_SINGO_SEARCH,
                    searchQuery : searchQuery,
                    searchPage : props.searchPage
                }
            );
        } else {
            props.setListData(
                {
                    type : SET_SINGO_LIST,
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
        page : _state.singo.page,
        searchPage : _state.singo.searchPage,
        searchData : _state.singo.searchData,
        listData : _state.singo.listData,
        errorMessage : _state.singo.errorMessage
    };
};

const mapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        setListData : (_obj) => {
            return _dispatch(setListData(_obj));
        },
        resetSearchData : (_obj) => {
            return _dispatch(resetSearchData(_obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singo);