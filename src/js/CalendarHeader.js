'use strict';
import React from 'react';
import {dateChange, viewChange} from './Actions';
import Navigation from './Navigation';
import ViewOptions from './ViewOptions';

export default class CalendarHeader extends React.Component {
    static propTypes = {
        date: React.PropTypes.object
    };

    cal(action) {
        return function() {
            dateChange.dispatch(action)
        };
    };

    view(view) {
        return function() {
            viewChange.dispatch(view);
        }
    };

    day(date) {
        return date.format('dddd, MMMM Do, YYYY');
    }

    week(date) {
        const format = 'MMM Do, YYYY';
        return `${date.startOf('week').format(format)} - ${date.endOf('week').format(format)}`;
    }

    month(date) {
        return date.format('MMMM YYYY');
    }

    render() {
        const {date, view, showViewOptions, showNavigation} = this.props;
        const formattedDate = this[view](date.clone());
        return (
            <div className='cal-header'>
                {showNavigation && <Navigation cal={this.cal} />}
                <div className='cal-title'>
                    <p>{formattedDate}</p>
                </div>
                {showViewOptions && <ViewOptions view={this.view} />}
            </div>
        );
    };
}