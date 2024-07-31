// vendorSchema.js
const mongoose = require("mongoose");
const shortid = require("shortid");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
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
    verificationToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "vendors",
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
