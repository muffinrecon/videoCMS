import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './create.html';

import {
    insert
} from '../../../../api/shows/methods.js';

import { displayError } from '../../../libs/errors.js';

Template.create_Show.events({
    'submit #createShowForm'(event) {
        const formValues = $(event.currentTarget).serializeObject();

        insert.call(formValues, displayError);

        event.preventDefault();
    },
});