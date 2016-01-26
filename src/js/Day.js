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
        view: React.PropTypes.string.isRequired
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

        let className = 'cal-noselect cal-day ';
        if (view == 'month')
            className += date.isSame(calendarMonth, view) ? 'cal-current-month ' : 'cal-not-current-month ';
        if (view !== 'day' && moment().isSame(date, 'day'))
            className += 'cal-today ';

        return (
            <div ref={date.format('YYYY-MM-DD')} className={className} onClick={::this._onClick}>
                {view !== 'day' && <span className='cal-noselect'>{date.date()}</span>}
                {!!notes && <Notes notes={notes} />}
                {barSegment.useBar && <Bar {...barSegment} day={date.date()} />}
            </div>
        );
    };
}