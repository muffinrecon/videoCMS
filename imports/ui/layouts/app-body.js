/* global alert */
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Roles } from 'meteor/alanning:roles';

import '../components/loading.js';
import './app-body.html';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
    // Only show the connection error box if it has been 5 seconds since
    // the app started

    setTimeout(() => {
        // FIXME:
        // Launch screen handle created in lib/router.js
        // dataReadyHold.release();

        // Show the connection error box
        showConnectionIssue.set(true);
    }, CONNECTION_ISSUE_TIMEOUT);
});

Template.App_body.onCreated(function appBodyOnCreated() {
    this.subscribe('shows.public');

    this.state = new ReactiveDict();
    this.state.setDefault({
        menuOpen: false,
        userMenuOpen: false,
    });
});

Template.App_body.onRendered(function () {

});

Template.App_body.helpers({
    userIsAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(), 'admin');
    }
});

Template.App_body.events({
    // TODO:: Find a better way to handle this
    'mouseenter .dropdown-button'(event) {
        $(event.currentTarget).dropdown();
        event.preventDefault();
    },
    'click .button-collapse'(event) {
        $(event.currentTarget).sideNav();
        event.preventDefault();
    }
});