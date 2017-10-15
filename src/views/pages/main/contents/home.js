// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import classNames from 'classnames/bind';

// style
import home from "./home.css";

const st = classNames.bind(home);

// user modules


class Home extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Home");
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount Home");
    }

    componentDidMount() {
        console.log("componentDidMount Home");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Home");

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Home");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Home");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Home");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Home");

    }

    /**
     * User func
     */

    render() {
        return(
            <section>
                <ul>
                    <li>
                        <Link className={st("activity-bg")} to="/activity">
                            <div className={st("info-box")}>
                                <span className={st("title")}>청소년 인증 프로그램</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className={st("serve-bg")} to="/serve">
                            <div className={st("info-box")}>
                                <span className={st("title")}>청소년 자원봉사 프로그램</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className={st("international-bg")} to="/international">
                            <div className={st("info-box")}>
                                <span className={st("title")}>청소년 국제 프로그램</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
}

export default Home;