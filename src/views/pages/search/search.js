// npm modules
import React, {Component} from "react";

// user modules
import {CommonHeader} from "views/components";

class Search extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Search");
        super(props);

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
    backHistory() {
        this.props.router.goBack();
    }

    render() {

        return (
            <div>
                <CommonHeader title="상세검색" type="search" backHistory={ this.backHistory } />
            </div>
        );
    }
}

export default Search;