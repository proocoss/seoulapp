// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import classNames from 'classnames/bind';

// style
import international from "./international.css";

// user modules
import {SET_INTERNATIONAL_LIST, setListData} from "modules/state";
import {MoreType1} from "views/components";

const st = classNames.bind(international);

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
                <Link className={ st("link-wrap") } to={"/detail/international/" + _idx} key={_idx}>
                    <ul className={ st("list-box") }>
                        <li className={ st("year") }>{_item.arYear}</li>
                        <li className={ st("title") }>{_item.arName}</li>
                        <ul className={ st("info-wrap") }>    
                            <li className={ st("item") }>시작일자 <span className={ st("date") }>{ _item.arStartDate ? _item.arStartDate.replace(/\//gi, ".") : "" }</span></li>
                            <li className={ st("item") }>종료일자 <span className={ st("date") }>{ _item.arEndDate ? _item.arEndDate.replace(/\//gi, ".") : "" }</span></li>
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
                type : SET_INTERNATIONAL_LIST,
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