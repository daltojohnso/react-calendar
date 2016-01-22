'use strict';
import React from 'react';
import moment from 'moment';
import Day from './Day';
import WeekHeader from './WeekHeader';
import Wrapper from './Wrapper';

export default class CalendarView extends React.Component {
    static propTypes = {
        view: React.PropTypes.string,
        useBar: React.PropTypes.bool,
        date: React.PropTypes.object,
        daysOfWeekFormat: React.PropTypes.string,
        notes: React.PropTypes.array,
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

    getDaysInWeek(firstDayOfWeek) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(firstDayOfWeek.clone());
            firstDayOfWeek.add(1, 'd');
        }
        return days;
    };

    getDayProps(date) {
        const i = date.date() - 1;
        const {notes, useBar, bar, previousBar, previousBarEnd, animateBar, view} = this.props;
        return { date, notes: notes[i], useBar, bar: bar[i], previousBar: previousBar[i], previousBarEnd, animateBar, view };
    }

    render() {
        const {date, view, daysOfWeekFormat} = this.props;
        const firstDayOfMonth = date.clone().startOf('month');
        const firstDayOfWeek = date.clone().day(-date.day());

        switch(view) {
            case 'day':
                return (
                    <div className='cal-view cal-view-day'>
                        <Day {...::this.getDayProps(date)} calendarMonth={firstDayOfMonth} />
                    </div>);
            case 'week':
                const days = this.getDaysInWeek(firstDayOfWeek);
                return (
                    <div className='cal-view cal-view-week'>
                        <WeekHeader format={daysOfWeekFormat} />
                        <Wrapper className='cal-week'>
                        {days.map((day, i) => {
                            <Day key={`day_${i}`} {...::this.getDayProps(day)} calendarMonth={firstDayOfMonth} />
                        })}
                        </Wrapper>
                    </div>
                );
            case 'month':
                const weeks = this.getWeeksInCalendarMonth(firstDayOfMonth).map((firstDayOfWeek) => {
                    return this.getDaysInWeek(firstDayOfWeek);
                }, this);
                return (
                    <div className='cal-view cal-view-month'>
                        <WeekHeader format={daysOfWeekFormat} />
                        <Wrapper className='cal-month'>
                            {weeks.map((week, i) => {
                                return (
                                    <Wrapper key={`week_${i}`} className='cal-week'>
                                        {week.map((day, i) => {
                                            return (
                                                <Day key={`day_${i}`} {...::this.getDayProps(day)} calendarMonth={firstDayOfMonth} />
                                            )
                                        }, this)}
                                    </Wrapper>
                                );
                            }, this)}
                        </Wrapper>
                    </div>
                );
        }
    };
}