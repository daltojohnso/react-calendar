'use strict';
import React from 'react';
import moment from 'moment';
import Bar from './Bar';
import Notes from './Notes';

export default class Day extends React.Component {
    static propTypes = {
        notes: React.PropTypes.array,
        date: React.PropTypes.object,
        useBar: React.PropTypes.bool,
        calendarMonth: React.PropTypes.object,
        bar: React.PropTypes.number,
        previousBar: React.PropTypes.number,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool
    };
    static defaultProps = {
        notes: []
    };

    //click event to show how bar works. not an actual feature.
    _onClick() {
        const bar = [];
        const date = this.props.date.date();
        for (let i = 0; i < date; i++) bar.push(100);
        bar[date-1] = 50;
        const event = new CustomEvent('rc-bar-change', {detail: {bar}});
        document.dispatchEvent(event);
    };

    render() {
        const {useBar, notes, date, calendarMonth, ...props} = this.props;

        let cls = 'cal-day ';
        if (date.isSame(calendarMonth, 'month')) {
            cls += 'cal-current-month ';
        }
        if (moment().isSame(date, 'day')) {
            cls += 'cal-today';
        }

        return (
            <div ref={date.format('YYYY-MM-DD')} className={cls} _onClick={this._onClick}>
                <span className='cal-noselect'>
                    {date.date()}
                </span>
                {!!notes.length && <Notes notes={notes} />}
                {useBar && <Bar ref = 'bar' {...props} day = {date.date()} />}
            </div>
        );
    };
}