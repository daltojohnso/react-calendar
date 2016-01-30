'use strict';
import React from 'react';
import moment from 'moment';

export default class DayHeader extends React.Component {
    static defaultProps = {
        daysOfWeek: (function() {
            const daysOfWeek = [];
            for (let i = 0; i < 7; i++) {
                daysOfWeek.push(moment().weekday(i).format('ddd'));
            }
            return daysOfWeek;
        }())
    };
    render() {
        const headers = this.props.daysOfWeek;
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