const { Types } = require('mongoose');
function validateId(productId) {
    if (!productId) {
        console.log("inisde rhe ",productId)
      throw new Error('Product ID must not be provided'); // Throw an Error object
    }
    if (!Types.ObjectId.isValid(productId)) {
        console.log("inisd",productId)
       throw new Error(`errorCode:'3001', error: err.message`);
      }
  }
  
  module.exports = validateId;
  