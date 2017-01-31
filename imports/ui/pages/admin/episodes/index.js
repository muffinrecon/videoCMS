import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Shows } from '../../../../api/shows/shows.js';

import './index.html'

Template.index_Episodes.helpers({
    thisShow: function() {
        const show = FlowRouter.getParam("showId");

        return Shows.findOne(show);
    }
});

Template.index_Episodes.events({
    'click .newEpisode'(event){
        FlowRouter.go('/admin');
        console.log('suh')
    }
});