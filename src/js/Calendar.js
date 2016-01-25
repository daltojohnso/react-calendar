'use strict';
import React from 'react';
import moment from 'moment';
import {dateChange, barChange, viewChange} from './Actions';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

export default class Calendar extends React.Component {
    state = {
        date: moment(),
        notes: [],
        bar: {
            percent: [],
            previousPercent: [],
            previousBarEnd: 0,
            animateBar: true,
            useBar: true
        },
        view: 'month'
    };

    componentDidMount() {
        barChange.subscribe(function(event) {
            this.setState({
                bar: Object.assign({}, this.state.bar, {
                    percent: event.detail,
                    previousPercent: [this.state.bar.percent],
                    previousBarEnd: this.previousBarEnd(this.state.bar.percent),
                    animateBar: true
                })
            });
        }, this);

        dateChange.subscribe(function(event) {
            const action = event.detail;
            const {date, view} = this.state;
            const newDate = getDate.call(this, date.clone(), view, action);
            if (!(action === 'current' && newDate.isSame(date, view))) {
                this.setState({
                    date: newDate,
                    bar: Object.assign({}, this.state.bar, {
                        percent: [],
                        previousPercent: [this.state.bar.percent],
                        previousBarEnd: this.previousBarEnd(this.state.bar),
                        animateBar: false
                    })
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
        barChange.unsubscribe();
        viewChange.unsubscribe();
    };

    previousBarEnd(previousPercent) {
        for (let i = previousPercent.length-1; i >= 0; i--) {
            if (previousPercent[i] !== 0) return i+1;
        }
        return 1;
    }

    render() {
        return (
            <div className='cal-parent'>
                <CalendarHeader date={this.state.date} view={this.state.view} />
                <CalendarView {...this.state} />
            </div>
        )
    };
}