import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Rooms } from '../api/rooms.js';

import './room.js';
import './buzzer.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('rooms');
});

Template.body.helpers({
  rooms() {
    const instance = Template.instance();
    var filter = {};
    if (instance.state.get('hideCompleted')) {
      filter.checked = { $ne: true };
    }
    return Rooms.find(filter, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Rooms.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-room'(event) {
    //prevent placeholder from submit
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;

    //insert new room into collection;
    Meteor.call('rooms.insert', name);
    
    //Clear form
    target.name.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
})