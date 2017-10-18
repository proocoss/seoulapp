// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import loadingType1 from "./loadingType1.css";

const st = classNames.bind(loadingType1);

class LoadingType1 extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor loadingType1");
        super(props);

    }

    render() {
        return (
            <div className={ st("loading-wrap") }>
                <svg width="300" height="300" className={ st("spinner") } fill="none">
                    <circle className={ st("fourth") } cx="150" cy="150" r="100"/>
                    <circle className={ st("fifth") }  cx="150" cy="150" r="100"/>
                    <circle className={ st("sixth") }  cx="150" cy="150" r="100"/>
                </svg>
            </div>
        );
    }
}

export default LoadingType1;