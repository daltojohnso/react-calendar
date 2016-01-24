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
        useBar: React.PropTypes.bool,
        calendarMonth: React.PropTypes.object.isRequired,
        bar: React.PropTypes.number,
        previousBar: React.PropTypes.number,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool,
        view: React.PropTypes.string.isRequired
    };

    //click event to show how bar works. not an actual feature.
    _onClick() {
        const bar = [];
        const date = this.props.date.date();
        for (let i = 0; i < date; i++) bar.push(100);
        bar[date-1] = 50;
        barChange.dispatch(bar);
    };

    render() {
        const {useBar, notes, date, calendarMonth, view, ...props} = this.props;

        let className = 'cal-day ';
        if (date.isSame(calendarMonth, view))
            className += 'cal-current-month ';
        if (view !== 'day' && moment().isSame(date, 'day'))
            className += 'cal-today';

        return (
            <div ref={date.format('YYYY-MM-DD')} className={className} onClick={::this._onClick}>
                <span className='cal-noselect'>
                    {date.date()}
                </span>
                {!!notes && <Notes notes={notes} />}
                {useBar && <Bar ref='bar' {...props} day={date.date()} />}
            </div>
        );
    };
}