import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

import { Shows } from './shows.js';

export const insert = new ValidatedMethod({
    name: 'shows.insert',
    validate: Shows.simpleSchema().pick(['title', 'image', 'description']).validator({ clean: true, filter: false }),
    run({ title, image, description }) {

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('shows.insert.accessDenied',
                'Must have permission to add a new show.');
        }

        const ourShow = {
            title: title,
            image: image,
            description: description,
        };

        Shows.insert(ourShow);
    },
});

export const update = new ValidatedMethod({
    name: 'shows.update',
    validate: new SimpleSchema({
        _id: Shows.simpleSchema().schema('_id'),
        title: Shows.simpleSchema().schema('title'),
        image: Shows.simpleSchema().schema('image'),
        description: Shows.simpleSchema().schema('description'),
    }).validator({ clean: true, filter: false }),
    run ({ _id, title, image, description }){
        const show = Shows.findOne(_id);

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('shows.update.accessDenied',
                'Must have permission to update a show.');
        }

        Shows.update(_id, {
            $set: {
                title: (_.isUndefined(title) ? null : title),
                image: (_.isUndefined(image) ? null : image),
                description: (_.isUndefined(description) ? null : description),
            },
        });
    }
});

export const remove = new ValidatedMethod({
    name: 'shows.remove',
    validate: new SimpleSchema({
        showId: Shows.simpleSchema().schema('_id'),
    }).validator({ clean: true, filter: false }),
    run({ showId }) {
        const show = Shows.findOne({ _id: showId });

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('shows.insert.accessDenied',
                'Must have permission to add a new show.');
        }

        Shows.remove(show);
    }
});
