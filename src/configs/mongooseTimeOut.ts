import mongoose from "mongoose";

const originalFindOne = mongoose.Query.prototype.findOne;

mongoose.Query.prototype.findOne = function (...args) {
  const timeOut = 12000;

  this.maxTimeMS(timeOut);

  return originalFindOne.apply(this, args as [any?]);
};
