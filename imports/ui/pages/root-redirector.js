import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Shows } from '../../api/shows/shows.js';

import './root-redirector.html';

Template.app_rootRedirector.onCreated(() => {
    // We need to set a timeout here so that we don't redirect from inside a redirection
    //   which is a no-no in FR.

});

Template.app_rootRedirector.helpers({
    allShows: function() {
        return Shows.find();
    }
});
