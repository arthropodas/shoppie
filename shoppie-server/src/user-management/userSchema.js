const mongoose = require('mongoose');
const shortid = require('shortid');

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
     
      unique: true,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
     
    },
    isVerified: { type: Number, default: 0},
    cust_id: {
      type: String,
      unique: true,
      default: function () {
        return `SHP${shortid.generate()}`;
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'customers',
  }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

