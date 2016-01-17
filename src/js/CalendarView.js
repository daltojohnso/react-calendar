'use strict';
import React from 'react';
import moment from 'moment';
import Day from './Day';
import Week from './Week';
import WeekHeader from './WeekHeader';
import Month from './Month';

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

    render() {
        const date = this.props.date;
        const view = this.props.view;
        const viewProperties = {
            date,
            notes: this.props.notes,
            useBar: this.props.useBar,
            bar: this.props.bar,
            previousBar: this.props.previousBar,
            previousBarEnd: this.props.previousBarEnd,
            animateBar: this.props.animateBar
        };
        const firstDayMonth = date.clone().startOf('month');
        const firstDayWeek = date.clone().day(-date.day());

        switch(view) {
            case 'day':
                return (
                    <div className={`cal-view cal-view-${view}`}>
                        <Day ref='view'
                        {...viewProperties}
                            firstDay={firstDayMonth}
                        />
                    </div>);
            case 'week':
                return (
                    <div className={`cal-view cal-view-${view}`}>
                        <WeekHeader format={this.props.daysOfWeekFormat} />
                        <Week ref='view'
                            {...viewProperties}
                            firstDay={firstDayWeek}
                        />
                    </div>
                );
            case 'month':
                return (
                    <div className={`cal-view cal-view-${view}`}>
                        <WeekHeader format={this.props.daysOfWeekFormat} />
                        <Month ref='view' key = 'view'
                        {...viewProperties}
                        />
                    </div>
                );
        }
    };
}