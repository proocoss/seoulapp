// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import moreType1 from "./moreType1.css";

// image
import btnMoreIcon1 from "assets/images/btn-more-icon-1.png";

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
                className={ st(this.props.type) }
                onClick={this.props.requestList}>
                더보기 <img className={ st("more-icon") } src={btnMoreIcon1} alt="more-icon" />
            </div>
        );
    }
}

export default MoreType1;