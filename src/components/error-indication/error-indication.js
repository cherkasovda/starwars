import React from 'react';

import './error-indication.css';
import icon from './death-star.png';

export default class ErrorBoundry extends React.Component {
    state = {
        hasError: false
    }
    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }
    render() {
        if (this.state.hasError)
            return <ErrorIndicator />;
        return this.props.children
    }
}

export const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon" />
            <span className="boom">BooM!</span>
            <span>
                something has gone terribly

            </span>
            <span>
                (but we already sent droids to fix it)
            </span>

        </div>
    )
};

