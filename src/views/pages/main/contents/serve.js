// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import classNames from 'classnames/bind';

// user modules
import {BasicPopup} from "views/components";

// style
import serve from "./serve.css";

// image
import dateIcon from "assets/images/date-icon.png";

// user modules
import {SET_SERVE_LIST, SET_SERVE_SEARCH, RESET_SERVE_SEARCH, setListData, resetSearchData} from "modules/state";
import {MoreType1, Empty} from "views/components";

const st = classNames.bind(serve);

class Serve extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Serve");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.checkProgram = this.checkProgram.bind(this);

        this.state = {
            noData : false
        };
    }

    componentWillMount() {
        console.log("componentWillMount Serve");
    }

    componentDidMount() {
        console.log("componentDidMount Serve");
        let props = this.props;
        let listData = props.listData;
        let searchQuery = props.location.state;

        if (searchQuery) {
            props.setListData(
                {
                    type : SET_SERVE_SEARCH,
                    searchQuery : searchQuery
                }
            );
        } else {
            if (!listData) {
                props.setListData(
                    {
                        type : SET_SERVE_LIST
                    }
                );
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Serve");

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Serve");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Serve");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Serve");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Serve");
        let props = this.props;

        if (props.cancelReq) {
            props.cancelReq();
        }

        props.resetSearchData(
            {
                type : RESET_SERVE_SEARCH
            }
        );
    }

    /**
     * User func
     */

    checkProgram(_event) {
        let count = _event.target.closest("a").getAttribute("data-count");

        if (count === "0") {
            _event.preventDefault();
            this.setState({
                noData :true
            });
            return false
        }
    }

    togglePopup(_show) {
        this.setState({
            noData :_show
        });
    }
     
    makeList() {
        let items = this.props.location.state ? this.props.searchData.data : this.props.listData.data;

        return items.map((_item, _idx) => {
            // let splitItem = _item.target.split(",");
            // let splitTitle = _item.target.split("(");
            // let count = splitTitle[1].replace(/[^0-9]/g, "");
            // let result = [];
            let count = _item.target.replace(/[^0-9]/g, "");

//             result.push(splitItem.map((_item, _idx) => {
//                 let count = "";
//                 let type = "";
//                 let bgType = "";
// 초,중,고,대,일반,미재학(2명)
//                 count = _item.replace(/[^0-9]/g, "");
                
//                 switch(_item.charAt(0)) {
//                     case "초" :
//                         bgType = "ele";
//                         type = "초";
//                         break;
//                     case "중" :
//                         bgType = "mid";
//                         type = "중";
//                         break;
//                     case "고" :
//                         bgType = "hig";
//                         type = "고";
//                         break;
//                     case "학" :
//                         bgType = "par";
//                         type = "학";
//                         break;
//                     case "대" :
//                         bgType = "uni";
//                         type = "대";
//                         break;
//                     default :
//                         break;
//                 }

//                 return (
//                     <div className={ st("target") }>
//                         <span className={ st("item", "type", bgType) }>{type}</span>
//                         <span className={ st("item", "count", "c-" + bgType) }>{count}</span>
//                     </div>
//                 );
//             }));

            return (
                <Link className={ st("link-wrap") }
                    data-count={count} 
                    onClick={this.checkProgram}
                    to={
                        { 
                            pathname : "/detail/serve/" + _item.key1, 
                            query : { 
                                t : encodeURIComponent(_item.pgmNm) 
                            } 
                        }
                    } key={_idx}>
                    <ul className={ st("list-box") }>
                        <li className={ st("title") }>{_item.pgmNm.replace(/&quot/g,"\"")}</li>
                        <ul className={ st("info-wrap") }>    
                            <li className={ st("item") }>{_item.organNm}</li>
                            <li className={ st("item") }>참가비 <span className={ st("price") }>{_item.price}</span></li>
                        </ul>
                        <ul className={ st("term-wrap") }>
                            <li className={ st("target-wrap") }>
                            {/*
                                <div className={ st("target") }>
                                    <span className={ st("item", "type", bgType) }>{type}</span>
                                    <span className={ st("item", "count", "c-" + bgType) }>{count}</span>
                                </div>
                                                        */}
                            </li>
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
                    type : SET_SERVE_SEARCH,
                    searchQuery : searchQuery,
                    searchPage : props.searchPage
                }
            );
        } else {
            props.setListData(
                {
                    type : SET_SERVE_LIST,
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
                    data ? (data.data.length > 0 ? this.makeList() : <Empty message="검색결과가 없습니다." />) : ""
                }
                {
                    data && data.data.length > 0
                        ?
                        <MoreType1 type="main-btn-type" value="더보기" requestList={this.requestList} />
                        :
                        ""
                }
                {
                    this.state.noData && <BasicPopup message="종료된 프로그램입니다." togglePopup={this.togglePopup} />
                }
            </section>
        );
    }
}

const mapStateToProps = (_state, _ownProps) => {
    return {
        cancelReq : _state.state.cancelReq,
        page : _state.serve.page,
        searchPage : _state.serve.searchPage,
        searchData : _state.serve.searchData,
        listData : _state.serve.listData,
        errorMessage : _state.serve.errorMessage
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

export default connect(mapStateToProps, mapDispatchToProps)(Serve);