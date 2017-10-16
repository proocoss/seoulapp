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
import {SET_ACTIVITY_LIST, setListData} from "modules/state";

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
        
        if (!listData) {
            props.setListData(
                {
                    type : SET_ACTIVITY_LIST
                }
            );
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

    sortTarget(_target) {
        let parseItem = _target.splite(",");
        console.log(parseItem);
    }

    makeList() {
        let items = this.props.listData.data;

        return items.map((_item, _idx) => {
            let splitItem = _item.target.split(",");
            let result = "";

            result += splitItem.map((_item, _idx) => {
                let resultTag;
                
                switch(_item.charAt(0)) {
                    case "초" :
                        // _item.replace("초", "")
                        break;
                    case "중" :

                        break;
                    case "고" :

                        break;
                    case "학" :

                        break;
                 }
            });

            return (
                <Link className={ st("link-wrap") } to={"/detail/activity/" + _item.key1} key={_idx}>
                    <ul className={ st("list-wrap") }>
                        <li className={ st("title") }>{_item.pgmNm}</li>
                        <ul className={ st("info-wrap") }>    
                            <li className={ st("item") }>{_item.organNm}</li>
                            <li className={ st("item") }>참가비 <span className={ st("price") }>{_item.price}</span></li>
                        </ul>
                        <li>참가대상 : {_item.target}</li>
                        <li className={ st("date") }><img className={ st("date-icon") } src={dateIcon} alt="date-icon" /> {_item.sdate.replace(/\//gi, ".")}</li>
                    </ul>
                </Link>
            );
        });
    }

    requestList() {
        let props = this.props;

        props.setListData(
            {
                type : SET_ACTIVITY_LIST,
                page : props.page
            }
        );
    }

    render() {
        return(
            <section>
                <div className="list-wrap">
                    {
                        this.props.listData
                            ?
                            this.makeList()
                            :
                            ""
                    }
                </div>
                <div 
                    className="more-btn-wrap"
                    onClick={this.requestList}>
                    더보기
                </div>
            </section>
        );
    }
}

const mapStateToProps = (_state, _ownProps) => {
    return {
        cancelReq : _state.state.cancelReq,
        page : _state.activity.page,
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