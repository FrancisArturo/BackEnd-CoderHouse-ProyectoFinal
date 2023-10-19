import moongose from 'mongoose';

const messagesCollection = 'messages';

const messagesSchema = new moongose.Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
});

export const messagesModel = moongose.model(messagesCollection, messagesSchema);