// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import mainHeader from "./mainHeader.css";

// image
import menuIcon from "assets/images/menu-icon.png";
import searchIcon from "assets/images/search-icon.png";

const st = classNames.bind(mainHeader);

// import {Link} from "react-router";

class MainHeader extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor MainHeader");
        super(props);

        //this.testFunc = this.testFunc.bind(this);
    }

    // testFunc() {
    //     var provider = new firebase.auth.FacebookAuthProvider();
    //     firebase.auth().signInWithRedirect(provider);
    // }

    render() {
        // const {router} = this.context;

        return (
            <header>
                <nav>
                    <ul>
                        <li className={st("item", "menu-icon")}><img src={menuIcon} alt="menu-icon" /></li>
                        <li className={st("item", "header-title")}>서울시 청소년활동</li>
                        <li className={st("item", "search-icon")}><img src={searchIcon} alt="search-icon" /></li>
                        {/*
                        <li>
                            <Link to="/activity"
                                className={"nav-item" + router.isActive("/", true) ? "active" : ""}>
                                청소년 인증 프로그램
                            </Link>
                        </li>
                        <li>
                            <Link to="/serve"
                                className={"nav-item" + router.isActive("/", true) ? "active" : ""}>
                                청소년 자원봉사 프로그램
                            </Link>
                        </li>
                        <li>
                            <Link to="/international"
                                className={"nav-item" + router.isActive("/", true) ? "active" : ""}>
                                청소년 국제 프로그램
                            </Link>
                        </li>
                        <li>
                            <div onClick={this.testFunc}>페이스북 로그인</div>
                        </li>
                        */}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default MainHeader;