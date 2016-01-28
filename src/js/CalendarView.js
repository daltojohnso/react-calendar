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


    render() {
        const {date, view} = this.props;
        const firstDayOfMonth = date.clone().startOf('month');
        const firstDayOfWeek = date.clone().startOf('week');

        switch(view) {
            case 'day':
                return (
                    <div className='cal-view cal-view-day'>
                        <Day {...this.props} calendarMonth={firstDayOfMonth} />
                    </div>);
            case 'week':
                const days = this.getDaysInWeek(firstDayOfWeek);
                return (
                    <div className='cal-view cal-view-week'>
                        <DayHeader view={view} />
                        <Wrapper className='cal-week'>
                            {days.map((day, i) => <Day key={`day_${i}`} {...this.props} calendarMonth={firstDayOfMonth} date={day} />, this)}
                        </Wrapper>
                    </div>
                );
            case 'month':
                const weeks = this.getWeeksInCalendarMonth(firstDayOfMonth).map(firstDayOfWeek => this.getDaysInWeek(firstDayOfWeek), this);
                return (
                    <div className='cal-view cal-view-month'>
                        <DayHeader view={view} />
                        <Wrapper className='cal-month'>
                            {weeks.map((week, i) => (
                                    <Wrapper key={`week_${i}`} className='cal-week'>
                                        {week.map((day, i) => <Day key={`day_${i}`} {...this.props} calendarMonth={firstDayOfMonth} date={day} />, this)}
                                    </Wrapper>
                                ), this)}
                        </Wrapper>
                    </div>
                );
        }
    };
}