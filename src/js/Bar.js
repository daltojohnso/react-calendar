'use strict';
import React from 'react';

export default class Bar extends React.Component {
    static propTypes = {
        bar: React.PropTypes.number,
        previousBar: React.PropTypes.number,
        previousBarEnd: React.PropTypes.number,
        animateBar: React.PropTypes.bool
    };

    render() {
        const {day, bar=0, previousBar=0, previousBarEnd=1, animateBar} = this.props;
        const width = bar + '%';
        const transition = '100ms linear';
        const barClasses = !animateBar ? 'cal-bar cal-bar-instant' : 'cal-bar';
        const transitionDelay = previousBar < bar ? 100*(day-previousBarEnd)+'ms' : 100*(previousBarEnd-day)+'ms';
        const styles = {transition, transitionDelay, width};
        return (
            <div className={barClasses} style={styles} />
        );
    };
}