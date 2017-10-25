// npm modules
import React, {Component} from "react";
import Modal from 'react-bootstrap/lib/Modal';
import classNames from 'classnames/bind';

// style
import basicPopup from "./basicPopup.css";

const st = classNames.bind(basicPopup);

class BasicPopup extends Component {
    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor BasicPopup");
        super(props);

        this.state = {
            isShow : true
        };

        this.close = this.close.bind(this);
        this.unMount = this.unMount.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount BasicPopup");
    }

    componentDidMount() {
        console.log("componentDidMount BasicPopup");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps BasicPopup");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate BasicPopup");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate BasicPopup");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate BasicPopup");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount BasicPopup");
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
              <Modal.Header className={ st("header-box") } closeButton>
              </Modal.Header>
              <Modal.Body className={ st("body-box") }>
                <p>{this.props.message}</p>
              </Modal.Body>
            </Modal>
        );
    }
}

export default BasicPopup;