'use strict';
import React from 'react';
import moment from 'moment';
import {dateChange, viewChange} from './Actions';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';
import DayHeader from './DayHeader';

export default class Calendar extends React.Component {
    static propTypes = {
        showViewOptions: React.PropTypes.bool,
        showNavigation: React.PropTypes.bool
    };
    static defaultProps = {
        showViewOptions: true,
        showNavigation: true
    };
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
        const {showViewOptions, showNavigation} = this.props;
        const {date, view} = this.state;
        return (
            <div className='cal'>
                <CalendarHeader
                    date={date.clone()}
                    view={view}
                    showViewOptions={showViewOptions}
                    showNavigation={showNavigation} />
                {view !== 'day' && <DayHeader />}
                <CalendarView
                    {...this.state}
                    date={date.clone()} />
            </div>
        )
    };
}