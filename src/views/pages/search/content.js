// npm modules
import React, {Component} from "react";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import classNames from 'classnames/bind';

// style
import content from "./content.css";

const st = classNames.bind(content);

class Content extends Component {
    constructor(props) {
        console.log("constructor Content");
        super(props);
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
                <form>
                    <FormGroup bsSize="large">
                      <FormControl type="text" placeholder="프로그램 명" />
                    </FormGroup>
                </form>
            </section>
        );
    }
}

export default Content;