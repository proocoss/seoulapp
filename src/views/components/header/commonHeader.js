// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import commonHeader from "./commonHeader.css";

// image
import searchIcon from "assets/images/search-icon.png";
import backIcon from "assets/images/back-icon.png";
import closeIcon from "assets/images/close-icon.png";

const st = classNames.bind(commonHeader);

class CommonHeader extends Component {

    render() {
        let type = this.props.type;

        return (
            <header className={ st("header-wrap") }>
                <nav>
                    <ul className={ st("header-box", this.props.type) }>
                        <li className={ st("item", "menu-icon") } onClick={ this.props.backHistory }>
                            <img className={ st("icon-img") } src={ type === "search" ? closeIcon : backIcon } alt="menu-icon" />
                        </li>
                        <li className={ st("item", "header-title", this.props.type + "-title") }>{ this.props.title }</li>
                        {
                            type !== "detail" && type !== "search" 
                                ?
                                <li className={ st("item", "search-icon") } onClick={ this.props.goSearch }>
                                    <img className={ st("icon-img") } src={ searchIcon } alt="search-icon" />
                                </li>
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