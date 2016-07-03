'use strict';
import React from 'react';

export default class Navigation extends React.Component {
    render() {
        const {cal} = this.props;
        return (
            <div className='cal-nav-buttons cal-button'>
                <img src={'./src/img/Previous.png'} onClick={() => {cal('prev');}} title='Previous' />
                <img src={'./src/img/Next.png'} onClick={() => {cal('next');}} title='Next' />
                <img src={'./src/img/Current.png'} onClick={() => {cal('current');}} title='Current' />
            </div>
        );
    }
}
