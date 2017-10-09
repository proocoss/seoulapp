// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

// user modules
import {SET_ACTIVITY_LIST, setListData} from "modules/state";

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
    makeList() {
        let items = this.props.listData.data;

        return items.map((_item, _idx) => {
            return (
                <Link to={"/detail/activity/" + _item.key1} key={_idx}>
                    <ul>
                        <li>기관명 : {_item.organNm}</li>
                        <li>프로그램명 : {_item.pgmNm}</li>
                        <li>참가비 : {_item.price}</li>
                        <li>참가대상 : {_item.target}</li>
                        <li>등록일 : {_item.sdate}</li>
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