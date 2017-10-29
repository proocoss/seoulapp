// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import empty from "./empty.css";

// image
import emptyBg from "assets/images/empty-bg.png";

const st = classNames.bind(empty);

class Empty extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Empty");
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount Empty");
    }

    componentDidMount() {
        console.log("componentDidMount Empty");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Empty");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Empty");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Empty");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Empty");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Empty");
    }

    render() {
        return (
            <section className={ st("empty-wrap") }>
                <img src={emptyBg} alt="empty-bg" />
                <p>{this.props.message}</p>
            </section>
        );
    }
}

export default Empty;