import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class EpisodesCollection extends Mongo.Collection {
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
export const Episodes = new EpisodesCollection('episodes');

Episodes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Episodes.schema = new SimpleSchema({
    _id: {
       type: String,
       regEx: SimpleSchema.RegEx.Id,
    },
    showId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    episodeNumber: {
        type: Number
    },
    image: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
    },
    openloadUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
    }
});

Episodes.attachSchema(Episodes.schema);

Episodes.publicFields = {
    showId: 1,
    episodeNumber: 1,
    image: 1,
    openloadUrl: 1,
};