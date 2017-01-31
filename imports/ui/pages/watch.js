import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './watch.html';

Template.app_Watch.onCreated(() => {
    // We need to set a timeout here so that we don't redirect from inside a redirection
    //   which is a no-no in FR.

});

Template.app_Watch.onRendered(function (){
    $('.parallax').parallax();

});