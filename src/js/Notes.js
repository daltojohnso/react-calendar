'use strict';
import React from 'react';
import Note from './Note';

export default class Notes extends React.Component {
    static propTypes = {
        notes: React.PropTypes.array
    };

    render() {
        return (
            <div className='cal-notes'>
                {this.props.notes.map((note, i) => {
                    return <Note key={`key_${i}`} note={note} />
                })}
            </div>
        )
    };
}