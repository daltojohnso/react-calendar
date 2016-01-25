'use strict';
import React from 'react';
import moment from 'moment';
import {barChange} from './Actions';
import Bar from './Bar';
import Notes from './Notes';

export default class Day extends React.Component {
    static propTypes = {
        notes: React.PropTypes.array,
        date: React.PropTypes.object.isRequired,
        calendarMonth: React.PropTypes.object.isRequired,
        view: React.PropTypes.string.isRequired,
        barSegment: React.PropTypes.object.isRequired
    };

    //click event to show how bar works. not an actual feature.
    _onClick() {
        const percent = [];
        const date = this.props.date.date();
        for (let i = 0; i < date-1; i++) percent.push(100);
        percent[date-1] = 50;
        barChange.dispatch(percent);
    };

    render() {
        const {barSegment, notes, date, calendarMonth, view} = this.props;

        let className = 'cal-day ';
        if (view == 'month') {
            if (date.isSame(calendarMonth, view))
                className += 'cal-current-month ';
            else
                className += 'cal-not-current-month ';
        } else if (view === 'week') {
            className += 'cal-current-week ';
        } else if (view === 'day') {
            className += 'cal-current-day ';
        }
        if (moment().isSame(date, 'day'))
            className += 'cal-today ';

        return (
            <div ref={date.format('YYYY-MM-DD')} className={className} onClick={::this._onClick}>
                <span className='cal-noselect'>
                    {date.date()}
                </span>
                {!!notes && <Notes notes={notes} />}
                {barSegment.useBar && <Bar {...barSegment} day={date.date()} />}
            </div>
        );
    };
}