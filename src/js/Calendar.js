'use strict';
import React from 'react';
import moment from 'moment';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

export default class Calendar extends React.Component {
    static propTypes = {
        //moment format.
        daysOfWeekFormat: React.PropTypes.string,
        useBar: React.PropTypes.bool
    };
    static defaultProps = {
        daysOfWeekFormat: 'ddd',
        useBar: true
    };
    state = {
        date: moment(),
        notes: [],
        bar: [],
        previousBar: [],
        previousBarEnd: 0,
        animateBar: true,
        view: 'month'
    };

    componentDidMount() {
        document.addEventListener('rc-bar-change', function(event) {
            this.setState({
                bar: event.detail.bar,
                previousBar: [...this.state.bar],
                previousBarEnd: this.previousBarEnd(this.state.bar),
                animateBar: false
            });
        }.bind(this));

        document.addEventListener('rc-cal-change', function(event) {
            const action = event.detail.action;
            const date = getDate.call(this, action);

            if (!(action === 'current' && this.state.date.isSame(moment(), 'day'))) {
                this.setState({
                    date: date,
                    bar: [],
                    previousBar: [...this.state.bar],
                    previousBarEnd: this.previousBarEnd(this.state.bar),
                    animateBar: false
                });
            }

            function getDate(action) {
                if (action === 'prev') {
                    return this.state.date.subtract(1, this.state.view);
                } else if (action === 'next') {
                    return this.state.date.add(1, this.state.view);
                } else if (action === 'current') {
                    return moment();
                }
            }
        }.bind(this));
    };
    componentWillUnmount() {
        document.removeEventListener('rc-bar-change');
        document.removeEventListener('rc-cal-change');
    };

    previousBarEnd(previousBar) {
        for (let i = previousBar.length-1; i >= 0; i--) {
            if (previousBar[i] !== 0) return i+1;
        }
        return 1;
    }

    render() {
        return (
            <div className='cal-parent'>
                <CalendarHeader date={this.state.date} />
                <CalendarView
                    ref='cal-view'
                    view={this.state.view}
                    useBar={this.props.useBar}
                    date={this.state.date}
                    daysOfWeekFormat={this.props.daysOfWeekFormat}
                    notes={this.state.notes}
                    bar={this.state.bar}
                    previousBar={this.state.previousBar}
                    previousBarEnd={this.state.previousBarEnd}
                    animateBar={this.state.animateBar}
                />

            </div>
        )
    };
}