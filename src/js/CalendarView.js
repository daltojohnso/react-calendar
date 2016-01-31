'use strict';
import React from 'react';
import moment from 'moment';
import Day from './Day';
import Wrapper from './Wrapper';
import {dateChange} from './Actions';

export default class CalendarView extends React.Component {
    static propTypes = {
        view: React.PropTypes.string,
        date: React.PropTypes.object
    };

    onWheel(event) {
        if (event.deltaY > 0) {
            dateChange.dispatch('next');
        } else if (event.deltaY < 0) {
            dateChange.dispatch('prev');
        }
    }

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

    getDaysInWeek(firstDayOfWeek) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(firstDayOfWeek.clone());
            firstDayOfWeek.add(1, 'd');
        }
        return days;
    };

    day(date, view) {
        return (
            <Day date={date} view={view} />
        );
    };

    week(date, view) {
        const firstDayOfWeek = date.startOf('week');
        const days = this.getDaysInWeek(firstDayOfWeek);
        return (
            <Wrapper className='cal-week'>
                {days.map((day, i) => <Day key={`day_${i}`} date={day} view={view} />)}
            </Wrapper>
        );
    };

    month(date, view) {
        const firstDayOfMonth = date.startOf('month');
        const weeks = this.getWeeksInCalendarMonth(firstDayOfMonth).map(firstDayOfWeek => this.getDaysInWeek(firstDayOfWeek));
        return (
            <Wrapper className='cal-month'>
                {weeks.map((week, i) => (
                    <Wrapper key={`week_${i}`} className='cal-week'>
                        {week.map((day, i) => (
                            <Day key={`day_${i}`}
                                date={day} view={view}
                                calendarMonth={firstDayOfMonth}
                            />))}
                    </Wrapper>
                ))}
            </Wrapper>
        );
    };

    render() {
        const {date, view} = this.props;
        return (
            <div className={`cal-view cal-view-${view}`} onWheel={this.onWheel}>
                {this[view].call(this, date, view)}
            </div>
        )
    };
}