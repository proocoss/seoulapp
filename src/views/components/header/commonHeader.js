// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import commonHeader from "./commonHeader.css";

// image
import searchIcon from "assets/images/search-icon.png";
import backIcon from "assets/images/back-icon.png";

const st = classNames.bind(commonHeader);

class CommonHeader extends Component {

    render() {
        return (
            <header>
                <nav>
                    <ul className={ st("header-wrap", this.props.type) }>
                        <li className={ st("item", "menu-icon") } onClick={ this.props.backHistory }><img className={ st("icon-img") } src={ backIcon } alt="menu-icon" /></li>
                        <li className={ st("item", "header-title") }>{ this.props.title }</li>
                        {
                            this.props.type !== "detail"
                                ?
                                <li className={ st("item", "search-icon") }><img className={ st("icon-img") } src={ searchIcon } alt="search-icon" /></li>
                                :
                                ""
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default CommonHeader;