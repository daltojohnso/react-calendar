'use strict';
import React from 'react';
import moment from 'moment';
import {dateChange, viewChange} from './Actions';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

export default class Calendar extends React.Component {
    state = {
        date: moment(),
        view: 'month'
    };

    componentDidMount() {
        dateChange.subscribe(function(event) {
            const action = event.detail;
            const {date, view} = this.state;
            const newDate = getDate.call(this, date.clone(), view, action);
            if (!(action === 'current' && newDate.isSame(date, view))) {
                this.setState({
                    date: newDate
                });
            }

            function getDate(date, view, action) {
                let newDate;
                if (action === 'prev') {
                    newDate = date.subtract(1, view);
                } else if (action === 'next') {
                    newDate = date.add(1, view);
                } else if (action === 'current') {
                    newDate = moment();
                }
                return !newDate.isSame(moment(), 'month') ? newDate.startOf(view) : newDate;
            }
        }, this);

        viewChange.subscribe(function(event) {
            this.setState({
                view: event.detail
            });
        }, this);
    };

    componentWillUnmount() {
        dateChange.unsubscribe();
        viewChange.unsubscribe();
    };

    render() {
        return (
            <div className='cal'>
                <CalendarHeader date={this.state.date.clone()} view={this.state.view} />
                <CalendarView {...this.props} {...this.state} date={this.state.date.clone()} />
            </div>
        )
    };
}