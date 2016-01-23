'use strict';
import React from 'react';
import moment from 'moment';

export default class DayHeader extends React.Component {
    static propTypes = {
        format: React.PropTypes.string,
        view: React.PropTypes.string
    };

    getDaysOfWeek(format, view) {
        const daysOfWeek = [];
        const number = view === 'day' ? 1 : 7;
        for (let i = 0; i < number; i++) {
            if (format === 'd') {
                daysOfWeek.push(moment().weekday(i).format('dd').charAt(0));
            } else {
                daysOfWeek.push(moment().weekday(i).format(format));
            }
        }
        return daysOfWeek;
    };

    render() {
        const headers = this.getDaysOfWeek(this.props.format, this.props.view);
        return (
            <div className='cal-day-header'>
            {headers.map((day, i) => {
                return (
                    <div key={`dayHeader_${i}`}>
                        <p>{day}</p>
                    </div>
                );
            })}
            </div>
        );
    };
}