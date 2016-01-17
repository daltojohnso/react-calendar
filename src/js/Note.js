'use strict';
import React from 'react';

export default class Note extends React.Component {
    static propTypes = {
        note: React.PropTypes.string
    };
    static defaultProps = {
        note: ''
    };

    render() {
        return (
            <span>{this.props.note}</span>
        )
    };
}