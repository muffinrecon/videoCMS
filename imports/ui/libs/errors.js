import { FlowRouter } from 'meteor/kadira:flow-router';

export const displayError = (error) => {
    if (error) {
        // It would be better to not alert the error here but inform the user in some
        // more subtle way
        console.log(error.error); // eslint-disable-line no-alert
        alert('Error, check console.')
    } else {
       FlowRouter.go('/admin');
    }
};