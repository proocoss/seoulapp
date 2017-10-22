// npm modules
import React, {Component} from "react";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import classNames from 'classnames/bind';

// style
import content from "./content.css";

const st = classNames.bind(content);

class Content extends Component {
    constructor(props) {
        console.log("constructor Content");
        super(props);

        this.state = {
            isDetailOption : false
        };
    }

    componentWillMount() {
        console.log("componentWillMount Content");
    }

    componentDidMount() {
        console.log("componentDidMount Content");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Content");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Content");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Content");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Content");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Content");
    }

    render() {
        return (
            <section className={ st("total-search-wrap") }>
                <form className={ st("content-wrap") }>
                    <FormGroup className={ st("input-pgm") } bsSize="large">
                      <FormControl type="text" placeholder="프로그램 명" />
                    </FormGroup>
                    <FormGroup className={ st("select-list") } controlId="city">
                        <ControlLabel className={ st("title") }>상세지역</ControlLabel>
                        <FormControl componentClass="select" required placeholder="지역을 선택해주세요.">
                            <option value="" hidden>지역을 선택해주세요.</option>
                            <option value="select">select</option>
                            <option value="other">...</option>
                        </FormControl>
                    </FormGroup>
                    {
                        this.state.isDetailOption && 
                        <FormGroup className={ st("select-list") } controlId="city-detail">
                            <FormControl componentClass="select" required placeholder="상세지역을 선택해주세요.">
                                <option value="" hidden>상세지역을 선택해주세요.</option>
                                <option value="select">select</option>
                                <option value="other">...</option>
                            </FormControl>
                        </FormGroup>
                    }
                </form>
            </section>
        );
    }
}

export default Content;