import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ShowsCollection extends Mongo.Collection {
    insert(show, callback) {
        const thisShow = show;
        thisShow.createdAt = thisShow.createdAt || new Date();

        return super.insert(thisShow, callback);
    }
    update(selector, modifier) {
        return super.update(selector, modifier);
    }
    remove(selector) {
        return super.remove(selector);
    }
}
export const Shows = new ShowsCollection('shows');

Shows.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Shows.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    image: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
    },
    tags: {
        type: [String],
        optional: true
    }
});

Shows.attachSchema(Shows.schema);

Shows.publicFields = {
    title: 1,
    description: 1,
    image: 1,
};