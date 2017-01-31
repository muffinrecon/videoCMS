import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Shows } from '../../../api/shows/shows.js';

import './dashboard.html';

import {
    remove
} from '../../../api/shows/methods.js';

import { displayError } from '../../libs/errors.js';

Template.admin_Dashboard.helpers({
    allShows: function() {
        return Shows.find();
    }
});

Template.admin_Dashboard.events({
    'click .delete'(event){
        event.preventDefault();

        // Delete the show
        remove.call({
            showId : this._id
        },displayError);
    },
    'click .episodes'(event) {
        event.preventDefault();

        FlowRouter.go('/admin/episodes/:showId', { showId: this._id });
    },
    'click .edit'(event) {
        event.preventDefault();

        const params = {
            showId: this._id
        };

        FlowRouter.go('/admin/shows/edit/:showId', params);
    }
});