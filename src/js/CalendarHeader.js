'use strict';
import React from 'react';
import {dateChange} from './Actions';
import ImgButton from './ImgButton';

export default class CalendarHeader extends React.Component {
    static propTypes = {
        date: React.PropTypes.object
    };

    click(action) {
        return function() {
            dateChange.dispatch(action)
        };
    };

    render() {
        const formattedDate = this.props.date.format('MMMM YYYY');
        return (
            <div className='cal-header'>
                <div className='cal-buttons'>
                    <ImgButton title='Previous' className='cal-prev-button cal-noselect' handler={this.click('prev')} />
                    <ImgButton title='Next' className='cal-next-button cal-noselect' handler={this.click('next')} />
                    <ImgButton title='Current' className='cal-return-button' handler={this.click('current')} />
                </div>
                <div className='cal-title'>
                    <p>{formattedDate}</p>
                </div>
                <div className='cal-views'></div>
            </div>
        );
    };
}