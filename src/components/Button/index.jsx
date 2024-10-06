import './styles.css';

import { Component } from "react";

export class Button extends Component {
    render() {
        const { text, actionFn, disabled } = this.props;

        return (
            <button
                className='button'
                onClick={actionFn}
                disabled={disabled}
            >
                {text}
            </button>
        );
    }
}