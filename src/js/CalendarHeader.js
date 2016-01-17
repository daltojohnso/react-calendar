'use strict';
import React from 'react';
import ImgButton from './ImgButton';

export default class CalendarHeader extends React.Component {
    static propTypes = {
        date: React.PropTypes.object
    };
    click(action) {
        return function() {
            const event = new CustomEvent('rc-cal-change', {detail: {action}});
            document.dispatchEvent(event);
        }
    };
    render() {
        const formattedDate = this.props.date.format('MMMM YYYY');
        return (
            <div className='cal-header' style={{backgroundImage: 'url("./src/img/background.jpg")'}}>
                <div className='cal-buttons'>
                    <ImgButton title='Previous' className='cal-prev-button cal-noselect' handler={this.click('prev')} />
                    <ImgButton title='Next' className='cal-next-button cal-noselect' handler={this.click('next')} />
                    <ImgButton title='Current' className='cal-return-button' handler={this.click('current')} />
                </div>
                <div className='cal-title'>
                    <p>{formattedDate}</p>
                </div>
                <div className='cal-views'></div>
            </div>
        );
    };
}