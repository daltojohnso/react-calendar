'use strict';
import React from 'react';

export default class ViewOptions extends React.Component {
    render() {
        const {view} = this.props;
        return (
            <div className='cal-view-options cal-button'>
                <p onClick={() => {view('month');}}>M</p>
                <p onClick={() => {view('week');}}>W</p>
                <p onClick={() => {view('day');}}>D</p>
            </div>
        );
    }
}