'use strict';
import React from 'react';
import moment from 'moment';

export default class DayHeader extends React.Component {
    static propTypes = {
        view: React.PropTypes.string
    };

    getDaysOfWeek(view) {
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            daysOfWeek.push(moment().weekday(i).format('ddd'));
        }
        return daysOfWeek;
    };

    render() {
        const headers = this.getDaysOfWeek(this.props.view);
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