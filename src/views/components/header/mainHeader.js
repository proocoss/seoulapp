// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

import {InformationPopup} from "views/components";

// style
import mainHeader from "./mainHeader.css";

// image
import menuIcon from "assets/images/menu-icon.png";
import logoIcon from "assets/images/logo-icon.png";

const st = classNames.bind(mainHeader);

class MainHeader extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor MainHeader");
        super(props);

        // parent page name
        this.showPopup = this.showPopup.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

        this.state = {
            notiNoInput : false
        };
    }

    /**
     * User func
     */
    showPopup() {
        this.setState({
            notiNoInput :true
        });  
    }

    togglePopup(_show) {
        this.setState({
            notiNoInput :_show
        });
    }

    render() {
        return (
            <header>
                <nav className={ st("main-header-wrap") }>
                    <ul className={ st("header-wrap") }>
                        <li className={ st("item", "header-title") }><img className={ st("logo-img") } src={ logoIcon } alt="title-icon" /></li>
                        <li className={ st("item", "menu-icon") } onClick={this.showPopup}><img className={ st("icon-img") } src={ menuIcon } alt="menu-icon" /></li>
                    </ul>
                </nav>
                {
                    this.state.notiNoInput && <InformationPopup togglePopup={this.togglePopup} />
                }
            </header>
        );
    }
}

export default MainHeader;