/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Rooms } from './rooms.js';

if (Meteor.isServer) {
  describe('Rooms', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Rooms.remove({});
        roomId = Rooms.insert({
          name: 'test room',
          createdAt: new Date(),
          owner: userId,
          username: 'meme',
          private: true
        });
        roomId2 = Rooms.insert({
          name: 'notmyroom',
          createdAt: new Date(),
          owner: userId - 1,
          username: 'notme',
           private: false,
        });
        roomId3 = Rooms.insert({
          name: 'notmyroom2',
          createdAt: new Date(),
          owner: userId - 1,
          username: 'notme',
          private: true
        })
      });

      it('can delete owned room', () => {
        // find the internal implementation of the task method so we can
        // test it in isolation
        const deleteRoom = Meteor.server.method_handlers['rooms.remove'];

        // set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // run the method with `this` set to the fake invocation
        deleteRoom.apply(invocation, [roomId]);

        // verify that the method does what we expected
        assert.equal(Rooms.find().count(), 2);
      });
      
      it('cannot delete else\'s room', () => {
        // find the internal implementation of the task method so we can
        // test it in isolation
        const deleteRoom = Meteor.server.method_handlers['rooms.remove'];

        // set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        throwerr = function () {
          deleteRoom.apply(invocation, [roomId2]);
        }

        // verify that the method does what we expected
        assert.throws(throwerr, Error, "not-authorized");
      });

      it('cannot check else\'s private room', () => {
        // find the internal implementation of the task method so we can
        // test it in isolation
        const setChecked = Meteor.server.method_handlers['rooms.setChecked'];

        // set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        throwerr = function () {
          setChecked.apply(invocation, [roomId3, true]);
        }

        // verify that the method does what we expected
        assert.throws(throwerr, Error, "not-authorized");
      });
      
    });
  });
}