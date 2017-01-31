import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Shows } from '../shows.js';

Meteor.publish('shows.public', function listsPublic() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
        return Shows.find();
    }

    return Shows.find({}, {
        fields: Shows.publicFields,
    });
});
