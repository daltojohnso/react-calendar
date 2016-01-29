'use strict';
import React from 'react';
import moment from 'moment';
import {barChange} from './Actions';

export default class Day extends React.Component {
    static propTypes = {
        date: React.PropTypes.object.isRequired,
        view: React.PropTypes.string.isRequired,
        calendarMonth: React.PropTypes.object
    };

    _onClick() {
        const {onClick} = this.props;
        if (onClick && typeof onClick === 'function')
            onClick.call(this);
    }

    render() {
        const {date, calendarMonth, view} = this.props;

        let className = 'cal-day ';
        if (view == 'month')
            className += date.isSame(calendarMonth, 'month') ? 'cal-current-month ' : 'cal-not-current-month ';
        if (view !== 'day' && moment().isSame(date, 'day'))
            className += 'cal-today ';

        return (
            <div className={className} onClick={::this._onClick}>
                {view !== 'day' && <span>{date.date()}</span>}
            </div>
        );
    };
}