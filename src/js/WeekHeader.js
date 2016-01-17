'use strict';
import React from 'react';
import moment from 'moment';

export default class WeekHeader extends React.Component {
    static propTypes = {
        format: React.PropTypes.string
    };

    getDaysOfWeek(format) {
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            if (format === 'd') {
                daysOfWeek.push(moment().weekday(i).format('dd').charAt(0));
            } else {
                daysOfWeek.push(moment().weekday(i).format(format));
            }
        }
        return daysOfWeek;
    };

    render() {
        const daysOfWeek = this.getDaysOfWeek(this.props.format);
        return (
            <div className='cal-day-headers'>
            {daysOfWeek.map((day, i) => {
                return (
                    <div key={`weekdayHeader_${i}`}>
                        <p>{day}</p>
                    </div>
                );
            })}
            </div>
        );
    };
}