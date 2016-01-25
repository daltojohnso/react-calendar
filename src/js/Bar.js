'use strict';
import React from 'react';

export default class Bar extends React.Component {
    static propTypes = {
        percent: React.PropTypes.number,
        previousPercent: React.PropTypes.number,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool
    };

    render() {
        const {day, percent=0, previousPercent=0, previousBarEnd=1, animateBar} = this.props;
        const width = percent + '%';
        const transition = '100ms linear';
        const transitionDelay = Math.abs(100*(day-previousBarEnd))+'ms';
        let barClasses = !animateBar ? 'cal-bar cal-bar-instant ' : 'cal-bar ';
        if (percent && percent < 100)
            barClasses += 'cal-bar-end';
        return <div className={barClasses} style={{transition, transitionDelay, width}} />;
    };
}