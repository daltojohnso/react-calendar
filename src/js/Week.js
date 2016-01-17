'use strict';
import React from 'react';
import moment from 'moment';
import Day from './Day';

export default class Week extends React.Component {
    static propTypes = {
        notes: React.PropTypes.array,
        date: React.PropTypes.object,
        useBar: React.PropTypes.bool,
        bar: React.PropTypes.array,
        previousBar: React.PropTypes.array,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool,
        calendarMonth: React.PropTypes.object
    };

    getDaysInWeek() {
        const days = [];
        const date = this.props.date;
        for (let i = 0; i < 7; i++) {
            days.push(date.clone());
            date.add(1, 'd');
        }
        return days;
    };

    render() {
        const {bar, previousBar} = this.props;
        return (
            <div className='cal-week'>
            {this.getDaysInWeek().map((date, i) => <Day ref={i} key={`day_${i}`}
                {...this.props}
                date={date}
                bar={bar[date.date()-1]}
                previousBar={previousBar[date.date()-1]}
                />
            )}
            </div>
        )
    };
}