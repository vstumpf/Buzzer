import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './room.html';

Template.room.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
})

Template.room.events({
  'click .toggle-checked'() {
    // Set the checked property to the oposite of its current value
    Meteor.call('rooms.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('rooms.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('rooms.setPrivate', this._id, !this.private);
  },
});