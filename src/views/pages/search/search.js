// npm modules
import React, {Component} from "react";

// user modules
import {CommonHeader} from "views/components";
import {LoadingType1} from "views/components";
import {MoreType1} from "views/components";
import {BasicPopup} from "views/components";

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
        this.togglePopup = this.togglePopup.bind(this);

        this.state = {
            notiNoInput : false
        };
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
        let doc = document;
        let pgmNm = doc.getElementById("pgmNm").value;
        let cTag = doc.getElementById("city");
        let dTag = doc.getElementById("city-detail");
        let city = doc.querySelectorAll("#city option")[cTag.value === "" ? "" : Number(cTag.value, 10) + 1];
        let cityDetail = doc.getElementById("city-detail") !== null ? doc.querySelectorAll("#city-detail option")[dTag.value === "" ? "" : Number(dTag.value, 10) + 1] : undefined;

        if (!pgmNm && !city && !cityDetail) {
            this.togglePopup(true);
        } else {
            this.props.router.push({
                pathname : "/" + this.page,
                state : {
                    p : pgmNm,
                    c : city ? city.innerText : "",
                    d : cityDetail ? cityDetail.innerText : ""
                }
            });
        }
    }

    backHistory() {
        this.props.router.goBack();
    }

    togglePopup(_show) {
        this.setState({
            notiNoInput :_show
        });
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
                {
                    this.state.notiNoInput && <BasicPopup message="검색조건을 입력해주세요." togglePopup={this.togglePopup} />
                }
            </div>
        );
    }
}

export default Search;