'use strict';
import React from 'react';
import moment from 'moment';
import {barChange} from './Actions';

export default class Day extends React.Component {
    static propTypes = {
        date: React.PropTypes.object.isRequired,
        calendarMonth: React.PropTypes.object.isRequired,
        view: React.PropTypes.string.isRequired
    };

    _onClick() {
        const {onClick} = this.props;
        if (onClick && typeof onClick === 'function')
            onClick.call(this);
    }

    render() {
        const {date, calendarMonth, view} = this.props;

        let className = 'cal-noselect cal-day ';
        if (view == 'month')
            className += date.isSame(calendarMonth, view) ? 'cal-current-month ' : 'cal-not-current-month ';
        if (view !== 'day' && moment().isSame(date, 'day'))
            className += 'cal-today ';

        return (
            <div ref={date.format('YYYY-MM-DD')} className={className} onClick={::this._onClick}>
                {view !== 'day' && <span className='cal-noselect'>{date.date()}</span>}
            </div>
        );
    };
}