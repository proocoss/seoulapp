// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

// user modules
import {SET_INTERNATIONAL_LIST, setListData} from "modules/state";

class International extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor International");
        super(props);

        this.makeList = this.makeList.bind(this);
        this.requestList = this.requestList.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount International");
    }

    componentDidMount() {
        console.log("componentDidMount International");
        let props = this.props;
        let listData = props.listData;

        if (!listData) {
            props.setListData(
                {
                    type : SET_INTERNATIONAL_LIST
                }
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps International");

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate International");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate International");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate International");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount International");
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
                <Link to={"/detail/international/" + _idx} key={_idx}>
                    <ul>
                        <li>활동프로그램이름 : {_item.arName}</li>
                        {/*<li>내용 : {_item.arContent[0]}</li>*/}
                        {/*<li dangerouslySetInnerHTML={{__html: _item.arContent[0]}}></li>*/}
                        <li>연도 : {_item.arYear}</li>
                        {/*<li>상태코드 : {_item.arStatus[0]}</li>*/}
                        {
                            _item.arStartDate
                            ?
                            <li>시작일자 : {_item.arStartDate}</li>
                            :
                            ""
                        }
                        {
                            _item.arEndDate
                            ?
                            <li>종료일자 : {_item.arEndDate}</li>
                            :
                            ""
                        }
                    </ul>
                </Link>
            );
        });
    }

    requestList() {
        let props = this.props;

        props.setListData(
            {
                type : SET_INTERNATIONAL_LIST,
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
        page : _state.international.page,
        listData : _state.international.listData,
        errorMessage : _state.international.errorMessage
    };
};

const mapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        setListData : (_obj) => {
            return _dispatch(setListData(_obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(International);