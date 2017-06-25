import { Meteor } from 'meteor/meteor';
import { Rooms } from '../imports/api/rooms.js';

Meteor.startup(() => {
  
});

/*import { Meteor } from 'meteor/meteor';

function cleanUpRoomsAndPlayers() {
  var cutOff = moment().subtract(2, 'hours').toDate().getTime();

  var numRoomsRemoved = Rooms.remove({
    createdAt: {$lt: cutOff}
  });

  var numUsersRemoved = Users.remove({
    createdAt: {$lt: cutOff}
  });
}

Meteor.startup(() => {
  // code to run on server at startup
  Rooms.remove({});
  Users.remove({});
});


SyncedCron.add({
  name: 'Remove rooms and users made past 2 hours every 1 minute',
  schedule: function(parser) {
    return parser.text('every 1 minute');
  },
  job: cleanUpRoomsAndPlayers
});

Meteor.publish('rooms', function(code) {
  return Rooms.find({"accessCode": accessCode});
});

Meteor.publish('users', function(roomId) {
  return Users.find({"roomId": roomId});
});

Rooms.find({"state": 'settingUp'}).observeChanges({
  added: function(id, room) {
    var users = Users.find({roomId: id});
    
    Rooms.update(id, {$set: {state: 'inProgress', paused: false}});
  }
});
*/