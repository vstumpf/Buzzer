import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  //Only publish tasks that are public or belong to current user
  Meteor.publish('rooms', function roomsPublication() {
    return Rooms.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'rooms.insert'(name) {
    check(name, String);

    //make sure user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.user().username,
    });
  },
  'rooms.remove'(roomId) {
    check(roomId, String);

    const room = Rooms.findOne(roomId);
    if (room.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.remove(roomId);
  },
  'rooms.setChecked'(roomId, setChecked) {
    check(roomId, String);
    check(setChecked, Boolean);

    const room = Rooms.findOne(roomId);
    if (room.private && room.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.update(roomId, { $set: { checked: setChecked } });
  },
  'rooms.setPrivate'(roomId, setToPrivate) {
    check(roomId, String);
    check(setToPrivate, Boolean);

    const room = Rooms.findOne(roomId);

    if (room.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.update(roomId, { $set: { private: setToPrivate } });
  },
});