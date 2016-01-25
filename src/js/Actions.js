'use strict';
const action = {
    dispatch: function(detail) {
        document.dispatchEvent(new CustomEvent(this.event, {detail}));
    },
    subscribe: function(callback, thisArg) {
        this.callback = callback;
        document.addEventListener(this.event, callback.bind(thisArg));
    },
    unsubscribe: function() {
        document.removeEventListener(this.event, this.callback);
    }
};

export const dateChange = Object.assign({event: 'rc-date-change'}, action);
export const viewChange = Object.assign({event: 'rc-view-change'}, action);
export const barChange = Object.assign({event: 'rc-bar-change'}, action);