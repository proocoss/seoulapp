// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import mainHeader from "./mainHeader.css";

// image
import menuIcon from "assets/images/menu-icon.png";

const st = classNames.bind(mainHeader);

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
        return (
            <header>
                <nav>
                    <ul className={ st("header-wrap") }>
                        <li className={ st("item", "menu-icon") }><img className={ st("icon-img") } src={ menuIcon } alt="menu-icon" /></li>
                        <li className={ st("item", "header-title") }>고고유스</li>
                        {/*
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