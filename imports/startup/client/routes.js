import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Roles } from 'meteor/alanning:roles';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/not-found.js';

import '../../ui/pages/root-redirector.js';
import '../../ui/pages/watch.js';

// Admin Routes
import '../../ui/pages/admin/dashboard.js';
import '../../ui/pages/admin/shows/create.js';
import '../../ui/pages/admin/shows/edit.js';
import '../../ui/pages/admin/episodes/index.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

let exposed = FlowRouter.group();

let loggedIn = FlowRouter.group({
    triggersEnter: [AccountsTemplates.ensureSignedIn]
});

let admininstrator =  loggedIn.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
        if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return redirect('/404');
        }
    }]
});

exposed.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'app_rootRedirector' });
    },
});

exposed.route('/watch', {
    name: 'App.watch',
    action() {
        BlazeLayout.render('App_body', { main: 'app_Watch' });
    },
});

exposed.route('/logout', {
    name: 'App.logout',
    action() {
        AccountsTemplates.logout();
    },
});

admininstrator.route('/', {
    name: 'App.admin.dashboard',
    action() {
        BlazeLayout.render('App_body', { main: 'admin_Dashboard' });
    },
});

admininstrator.route('/shows/create', {
    name: 'App.admin.show.create',
    action() {
        BlazeLayout.render('App_body', { main: 'create_Show' });
    }
});

admininstrator.route('/shows/edit/:showId', {
    name: 'App.admin.show.edit',
    action() {
        BlazeLayout.render('App_body', { main: 'edit_Show' });
    }
});

admininstrator.route('/episodes/:showId', {
    name: 'App.admin.episodes.index',
    action() {
        BlazeLayout.render('App_body', { main: 'index_Episodes' });
    }
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};