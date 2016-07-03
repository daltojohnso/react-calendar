'use strict';
import React from 'react';

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children.map(child => child)}
            </div>
        );
    }
}