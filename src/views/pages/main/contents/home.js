// npm modules
import React, {Component} from "react";
import {Link} from "react-router";
import classNames from 'classnames/bind';

// style
import home from "./home.css";

// image
import mainIconActivity from "assets/images/main-icon-activity.png";
import mainIconServe from "assets/images/main-icon-serve.png";
import mainIconVacation from "assets/images/main-icon-international.png";

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
                        <Link className={ st("activity-bg") } to="/activity">
                            <div className={ st("info-box") }>
                                <span className={ st("title") }>청소년 인증활동 프로그램</span>
                                <img className={ st("act-img") } src={mainIconActivity} alt="main-icon-activity" />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className={st("international-bg")} to="/vacation">
                            <div className={st("info-box")}>
                                <span className={st("title")}>청소년 신고활동 프로그램</span>
                                <img className={ st("int-img") } src={mainIconVacation} alt="main-icon-vacation" />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className={st("serve-bg")} to="/serve">
                            <div className={st("info-box")}>
                                <span className={st("title")}>청소년 자원봉사 프로그램</span>
                                <img className={ st("ser-img") } src={mainIconServe} alt="main-icon-serve" />
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
}

export default Home;