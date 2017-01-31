import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

import { Episodes } from './episodes.js';

export const insert = new ValidatedMethod({
    name: 'episodes.insert',
    validate: Episodes.simpleSchema().pick(
        ['showId', 'episodeNumber', 'image', 'openloadUrl']
    ).validator({ clean: true, filter: false }),
    run({ showId, episodeNumber, image, openloadUrl }) {

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('episodes.insert.accessDenied',
                'Must have permission to add a new episode.');
        }

        const episode = {
            showId: showId,
            episodeNumber: episodeNumber,
            image: image,
            openloadUrl: openloadUrl
        };

        Episodes.insert(episode);
    }
});