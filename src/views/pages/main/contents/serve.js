// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

// user modules
import {SET_SERVE_LIST, setListData} from "modules/state";

class Serve extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Serve");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Serve");
    }

    componentDidMount() {
        console.log("componentDidMount Serve");
        let props = this.props;
        let listData = props.listData;

        if (!listData) {
            props.setListData(
                {
                    type : SET_SERVE_LIST
                }
            );
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
    }

    /**
     * User func
     */
    makeList() {
        let items = this.props.listData.data;

        return items.map((_item, _idx) => {
            return (
                <Link to={"/detail/serve/" + _item.key1} key={_idx}>
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
                type : SET_SERVE_LIST,
                page : props.page
            }
        );
    }

    render() {
        return(
            <div>
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
            </div>
        );
    }
}

const mapStateToProps = (_state, _ownProps) => {
    return {
        cancelReq : _state.state.cancelReq,
        page : _state.serve.page,
        listData : _state.serve.listData,
        errorMessage : _state.serve.errorMessage
    };
};

const mapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        setListData : (_obj) => {
            return _dispatch(setListData(_obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Serve);