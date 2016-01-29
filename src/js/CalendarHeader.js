'use strict';
import React from 'react';
import {dateChange, viewChange} from './Actions';
import ImgButton from './ImgButton';

export default class CalendarHeader extends React.Component {
    static propTypes = {
        date: React.PropTypes.object
    };

    cal(action) {
        return function() {
            dateChange.dispatch(action)
        };
    };

    view(view) {
        return function() {
            viewChange.dispatch(view);
        }
    };

    day(date) {
        return date.format('dddd, MMMM Do, YYYY');
    }

    week(date) {
        const format = 'MMM Do, YYYY';
        return `${date.startOf('week').format(format)} - ${date.endOf('week').format(format)}`;
    }

    month(date) {
        return date.format('MMMM YYYY');
    }

    render() {
        const {date, view} = this.props;
        const formattedDate = this[view](date.clone());
        return (
            <div className='cal-header'>
                <div className='cal-nav-buttons cal-button'>
                    <ImgButton title='Previous' className='cal-prev-button' handler={this.cal('prev')} />
                    <ImgButton title='Next' className='cal-next-button' handler={this.cal('next')} />
                    <ImgButton title='Current' className='cal-return-button' handler={this.cal('current')} />
                </div>
                <div className='cal-title'>
                    <p>{formattedDate}</p>
                </div>
                <div className='cal-view-buttons cal-button'>
                    <p onClick={this.view('month')}>M</p>
                    <p onClick={this.view('week')}>W</p>
                    <p onClick={this.view('day')}>D</p>
                </div>
            </div>
        );
    };
}