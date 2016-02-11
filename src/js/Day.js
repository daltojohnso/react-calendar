'use strict';
import React from 'react';
import moment from 'moment';

export default class Day extends React.Component {
    static propTypes = {
        date: React.PropTypes.object.isRequired,
        view: React.PropTypes.string.isRequired,
        calendarMonth: React.PropTypes.object
    };

    render() {
        const {date, calendarMonth, view} = this.props;

        let className = 'cal-day ';
        if (view === 'month')
            className += date.isSame(calendarMonth, 'month') ? 'cal-current-month ' : 'cal-not-current-month ';
        if (view !== 'day' && moment().isSame(date, 'day'))
            className += 'cal-today ';

        return (
            <div className={className} >
                {view !== 'day' && <span>{date.date()}</span>}
            </div>
        );
    };
}