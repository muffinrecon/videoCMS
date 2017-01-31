import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Shows } from '../../../../api/shows/shows.js';

import './edit.html';

import {
    update
} from '../../../../api/shows/methods.js';


import { displayError } from '../../../libs/errors.js';

Template.edit_Show.helpers({
    thisShow: function() {
        const show = FlowRouter.getParam("showId");

        return Shows.findOne(show);
    }
});

Template.edit_Show.events({
    'submit #editShowForm'(event) {
        const formValues = $(event.currentTarget).serializeObject();

        update.call(formValues, displayError);

        event.preventDefault();
    },
    'click .cancel'(event){
        FlowRouter.go('/admin');
    }
});