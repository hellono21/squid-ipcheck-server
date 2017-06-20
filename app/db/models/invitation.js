/**
 * Created by ccc on 6/19/17.
 */

/**
 * Created by ccc on 6/16/17.
 */

import mongoose from 'mongoose';
import uid from 'uid';
import validate from 'mongoose-validator';

const duration = 3600*24;

const invitationSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: validate({
      validator: 'isEmail',
      message: 'is not valid',
    }),
  },
  created_at: {
    type: Date,
    expires: duration,
  },
}, {
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.token;
      delete ret.id;
    },
  },
});

invitationSchema.virtual('expires_in')
  .get(function getExpiresIn() {
    const expirationTime = this.created_at.getTime() + (duration * 1000);
    return parseInt((expirationTime - Date.now()) / 1000, 10);
  });


invitationSchema.pre('validate', function preSave(next) {
  if (this.isNew) {
    this.token = uid(16);
    this.created_at = Date.now();
  }
  next();
});

export default mongoose.model('Invitation', invitationSchema);
