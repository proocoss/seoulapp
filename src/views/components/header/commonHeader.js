import React, {Component} from "react";

class CommonHeader extends Component {

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <div
                                className=""
                                onClick={this.props.backHistory}>
                                뒤로가기
                            </div>
                        </li>
                        <li>
                            <div
                                className="">
                                { this.props.title }
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default CommonHeader;