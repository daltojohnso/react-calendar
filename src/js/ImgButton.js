'use strict';
import React from 'react';

export default class ImgButton extends React.Component {
    render() {
        const {src, title, handler} = this.props;
        return (
            <img src={src || `./src/img/${title}.png`}
                onClick={handler}
                title={title}
                className={'cal-noselect call-img-button '}
            />
        )
    };
}