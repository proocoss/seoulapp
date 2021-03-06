// npm modules
import React, {Component} from "react";
import {connect} from "react-redux";

// user modules
import {MainHeader} from "views/components";
import {CommonHeader} from "views/components";
import {LoadingType1} from "views/components";

class Main extends Component {
    constructor(props) {
        console.log("constructor Main");
        super(props);

        // page name
        this.page = this.props.location.pathname;
        this.searchQuery = this.props.location.state;

        this.getTitle = this.getTitle.bind(this);
        this.backHistory = this.backHistory.bind(this);
        this.goSearch = this.goSearch.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Main");
    }

    componentDidMount() {
        console.log("componentDidMount Main");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Main");
        // page name
        this.page = nextProps.location.pathname;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Main");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Main");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Main");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Main");
    }

    /**
     * User func
     */
    getTitle() {
        let title;

        switch(this.page) {
            case "/activity" :
                title = this.searchQuery ? "검색결과" : "청소년 인증활동 프로그램";
                break;
            case "/serve" :
                title = this.searchQuery ? "검색결과" : "청소년 자원봉사 프로그램";
                break;
            case "/singo" :
                title = this.searchQuery ? "검색결과" : "청소년 신고활동 프로그램";
                break;
            default :
                title = "";
                break;
        }

        return title;
    }

    backHistory() {
        this.props.router.goBack();
    }

    goSearch() {
        let path;

        switch(this.page) {
            case "/activity" :
                path = "/search/activity";
                break;
            case "/serve" :
                path = "/search/serve";
                break;
            case "/singo" :
                path = "/search/singo";
                break;
            default :
                path = "/";
                break;
        }

        this.props.router.push(path);
    }

    render() {
        return (
            <div>
                {
                    this.page === "/" 
                        ? 
                        <MainHeader /> 
                        : 
                        <CommonHeader title={ this.getTitle() } type={this.searchQuery ? "search-list" : "list"} backHistory={ this.backHistory } goSearch={ this.goSearch } />
                }
                { this.props.children }
                {
                    this.props.isLoading && <LoadingType1 />
                }
            </div>
        );
    }
}

const mapStateToProps = (_state, _ownProps) => {
    return {
        isLoading : _state.state.isLoading
    };
};

export default connect(mapStateToProps)(Main);