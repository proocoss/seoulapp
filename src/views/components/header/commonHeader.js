import React, {Component} from "react";
import styles from "./header.css";

class CommonHeader extends Component {

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <div
                                className="ppp"
                                onClick={this.props.backHistory}>
                                뒤로가기
                            </div>
                        </li>
                        <li>
                            <div
                                className={styles.ppp}>
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