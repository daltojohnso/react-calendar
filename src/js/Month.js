'use strict';
import React from 'react';
import moment from 'moment';
import Week from './Week';

export default class Month extends React.Component {
    static propTypes = {
        notes: React.PropTypes.array,
        date: React.PropTypes.object,
        useBar: React.PropTypes.bool,
        bar: React.PropTypes.array,
        previousBar: React.PropTypes.array,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool
    };

    getWeeksInCalendarMonth(firstDayOfMonth) {
        const weeks = [];
        const calendarRows = 6;
        const firstDayOfWeek = firstDayOfMonth.clone().subtract(firstDayOfMonth.day(), 'd');
        for (let i = 0; i < calendarRows; i++) {
            weeks.push(firstDayOfWeek.clone());
            firstDayOfWeek.add(7, 'd');
        }
        return weeks;
    };

    bar(weekIndex) {
        return this.props.bar.slice(weekIndex*7, weekIndex*7 + 6);
    };
    previousBar(weekIndex) {
        return this.props.bar.slice(weekIndex*7, weekIndex*7 + 6);
    }

    render() {
        const firstDayOfMonth = this.props.date.clone().startOf('month');
        const weeks = this.getWeeksInCalendarMonth(firstDayOfMonth);
        return (
            <div className='cal-month'>
            {weeks.map((date, i) => <Week ref={i} key={`week_${i}`}
                {...this.props}
                date={date}
                bar={this.bar.call(this, i)}
                previousBar={this.previousBar.call(this, i)}
                calendarMonth={firstDayOfMonth} />
            )}
            </div>
        )
    };
}