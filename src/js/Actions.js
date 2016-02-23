'use strict';
export function Action(event) {
    this.event = event;
};
Action.prototype.dispatch = function(detail) {
    document.dispatchEvent(new CustomEvent(this.event, {detail}));
};
Action.prototype.subscribe = function(callback, thisArg) {
    this.callback = callback;
    document.addEventListener(this.event, callback.bind(thisArg));
};
Action.prototype.unsubscribe = function() {
    document.removeEventListener(this.event, this.callback);
};

export const dateChange = new Action('rc-date-change');
export const viewChange = new Action('rc-view-change');