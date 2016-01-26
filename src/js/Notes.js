'use strict';
import React from 'react';

export default class Notes extends React.Component {
    static propTypes = {
        notes: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string])
    };
    static defaultProps = {notes: []};

    render() {
        let notes = this.props.notes;
        notes = typeof notes === 'string' ? [notes] : notes;
        return (
            <div className='cal-notes'>
                {notes.map((note, i) => {
                    return <span key={`note_${i}`}>{note}</span>;
                })}
            </div>
        );
    };
}