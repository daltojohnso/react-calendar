'use strict';
import React from 'react';

export default class Navigation extends React.Component {
    render() {
        const {cal} = this.props;
        return (
            <div className='cal-nav-buttons cal-button'>
                <img src={`./src/img/previous.png`} onClick={() => {cal('prev')}} title='Previous' />
                <img src={`./src/img/next.png`} onClick={() => {cal('next')}} title='Next' />
                <img src={`./src/img/current.png`} onClick={() => {cal('current')}} title='Current' />
            </div>
        );
    }
}