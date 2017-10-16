// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import moreType1 from "./moreType1.css";

// image
import moreIcon from "assets/images/more-icon.png";

const st = classNames.bind(moreType1);

class MoreType1 extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor MoreType1");
        super(props);

    }

    render() {
        return (
            <div 
                className={ st("more-btn-wrap") }
                onClick={this.props.requestList}>
                더보기 <img className={ st("more-icon") } src={moreIcon} alt="more-icon" />
            </div>
        );
    }
}

export default MoreType1;