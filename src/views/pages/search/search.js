// npm modules
import React, {Component} from "react";

// user modules
import {CommonHeader} from "views/components";
import {LoadingType1} from "views/components";
import {MoreType1} from "views/components";

class Search extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Search");
        super(props);
        let params = this.props.params;

        // parent page name
        this.page = params.page;
        this.requestList = this.requestList.bind(this);
        this.backHistory = this.backHistory.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Search");
    }

    componentDidMount() {
        console.log("componentDidMount Search");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Search");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Search");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Search");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Search");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Search");
    }

    /**
     * User func
     */
    requestList() {
        // let props = this.props;

        // props.setListData(
        //     {
        //         type : SET_ACTIVITY_LIST,
        //         page : props.page
        //     }
        // );
    }

    backHistory() {
        this.props.router.goBack();
    }

    render() {

        return (
            <div>
                <CommonHeader title="상세검색" type="search" backHistory={ this.backHistory } />
                {
                    React.cloneElement(this.props.children, { page : this.page })
                }
                <MoreType1 type="search-btn-wrap" value="선택 완료" requestList={this.requestList} />
                {
                    this.props.isLoading && <LoadingType1 />
                }
            </div>
        );
    }
}

export default Search;