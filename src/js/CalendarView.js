'use strict';
import React from 'react';
import moment from 'moment';
import Day from './Day';
import DayHeader from './DayHeader';
import Wrapper from './Wrapper';

export default class CalendarView extends React.Component {
    static propTypes = {
        view: React.PropTypes.string,
        date: React.PropTypes.object
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
            <div className='cal-view cal-view-day'>
                <Day date={date} view={view} />
            </div>
        );
    };

    week(date, view) {
        const firstDayOfWeek = date.startOf('week');
        const days = this.getDaysInWeek(firstDayOfWeek);
        return (
            <div className='cal-view cal-view-week'>
                <DayHeader />
                <Wrapper className='cal-week'>
                    {days.map((day, i) => <Day key={`day_${i}`} date={day} view={view} />)}
                </Wrapper>
            </div>
        );
    };

    month(date, view) {
        const firstDayOfMonth = date.startOf('month');
        const weeks = this.getWeeksInCalendarMonth(firstDayOfMonth).map(firstDayOfWeek => this.getDaysInWeek(firstDayOfWeek));
        return (
            <div className='cal-view cal-view-month'>
                <DayHeader />
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
            </div>
        );
    };

    render() {
        const {date, view} = this.props;
        return this[view].call(this, date, view);
    };
}