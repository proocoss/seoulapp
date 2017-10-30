// npm modules
import React, {Component} from "react";
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames/bind';

// style
import informationPopup from "./informationPopup.css";

const st = classNames.bind(informationPopup);

class InformationPopup extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor InformationPopup");
        super(props);

        this.state = {
            isShow : true
        };

        this.close = this.close.bind(this);
        this.unMount = this.unMount.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount InformationPopup");
    }

    componentDidMount() {
        console.log("componentDidMount InformationPopup");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps InformationPopup");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate InformationPopup");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate InformationPopup");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate InformationPopup");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount InformationPopup");
    }

    close() {
        this.setState({
            isShow : false
        });
    }

    unMount() {
        this.props.togglePopup(false);
    }

    render() {
        return (
            <Modal className={ st("custom-wrap") } show={this.state.isShow} onExited={this.unMount} onHide={this.close}>
              <Modal.Body className={ st("body-box") }>
                <ul className={ st("infor-wrap", "activity") }>
                    <li className={ st("title") }>청소년 인증활동 프로그램이란?</li>
                    <li className={ st("message") }>
                        청소년활동진흥법 제35조에 의거하여 수련활동이 갖는 일정기준 이상의 형식적 요건과 질적 특성을 갖춘 프로그램.
                    </li>
                    <li className={ st("message") }>
                        안전하고 유익하고 질적 수준이 담보된 청소년을 위한 프로그램.
                    </li>
                </ul>
                <ul className={ st("infor-wrap", "singo") }>
                    <li className={ st("title") }>청소년 신고활동 프로그램이란?</li>
                    <li className={ st("message") }>
                        여성가족부령으로 정하는 절차와 방법에 따라 특별자치시장ㆍ특별자치도지사ㆍ시장ㆍ군수ㆍ구청장에게 그 계획이 신고된 프로그램.
                    </li>
                    <li className={ st("message") }>
                        인터넷 홈페이지 등에 신고내용이 공개됨으로서 19세 미만 청소년을 대상으로 하는 안전이 보장된 숙박형 및 비숙박형 청소년수련활동 프로그램.
                    </li>
                </ul>
                {/*
                <ul className={ st("infor-wrap", "serve") }>
                    <li className={ st("title") }>청소년 자원봉사 프로그램이란?</li>
                    <li className={ st("message") }>청소년이 자원봉사를 경험할 수 있게 여성가족부 청소년 활동진흥원에서 제공하는 자원봉사 프로그램</li>
                </ul>
                */}
              </Modal.Body>
                <Modal.Footer className={ st("footer-box") }>
                    <Button onClick={this.close}>확인</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default InformationPopup;