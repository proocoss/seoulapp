// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import classNames from 'classnames/bind';

// style
import vacation from "./vacation.css";

// image
import dateIcon from "assets/images/date-icon.png";

// user modules
import {SET_VACATION_LIST, setListData} from "modules/state";
import {MoreType1} from "views/components";

const st = classNames.bind(vacation);

class Vacation extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Vacation");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Vacation");
    }

    componentDidMount() {
        console.log("componentDidMount Vacation");
        let props = this.props; 
        let listData = props.listData;
        
        if (!listData) {
            props.setListData(
                {
                    type : SET_VACATION_LIST
                }
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Vacation");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Vacation");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Vacation");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Vacation");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Vacation");
        let props = this.props;
        if (props.cancelReq) {
            props.cancelReq();
        }
    }

    /**
     * User func
     */
    makeList() {
        let items = this.props.listData.data;

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
                            pathname : "/detail/vacation/" + _item.key1, 
                            query : { 
                                t : encodeURIComponent(_item.pgmNm)} 
                            }
                        } key={_idx}>
                    <ul className={ st("list-box") }>
                        <li className={ st("title") }>{_item.pgmNm}</li>
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

        props.setListData(
            {
                type : SET_VACATION_LIST,
                page : props.page
            }
        );
    }

    render() {
        return(
            <section className={ st("list-wrap") }>
                {
                    this.props.listData
                        ?
                        this.makeList()
                        :
                        ""
                }
                {
                    this.props.listData
                        ?
                        <MoreType1 requestList={this.requestList} />
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
        page : _state.vacation.page,
        listData : _state.vacation.listData,
        errorMessage : _state.vacation.errorMessage
    };
};

const mapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        setListData : (_obj) => {
            return _dispatch(setListData(_obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacation);