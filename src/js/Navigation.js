'use strict';
import React from 'react';
import ImgButton from './ImgButton';

export default class Navigation extends React.Component {
    render() {
        const {cal} = this.props;
        return (
            <div className='cal-nav-buttons cal-button'>
                <ImgButton title='Previous' className='cal-prev-button' handler={cal('prev')} />
                <ImgButton title='Next' className='cal-next-button' handler={cal('next')} />
                <ImgButton title='Current' className='cal-return-button' handler={cal('current')} />
            </div>
        );
    }
}