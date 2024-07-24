const { required } = require("joi");
const mongoose = require("mongoose");
const shortid = require("shortid");

const venderSchema = new mongoose.Schema(
  {
    venderName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType:{
        type:String,
        required:true
    },
    vendId: {
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
    collection: "venders",
  }
);

const Vendor = mongoose.model("Vendors", venderSchema);

module.exports = Vendor;
