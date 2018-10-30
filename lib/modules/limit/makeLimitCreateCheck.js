/** Limit the number of item an user can create */
import { getCollection } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import { getTypeName } from "meteor/vulcan:more-helpers";
import _merge from "lodash/merge";

const defaultOptions = {
  limit: 10,
  excludedGroups: ["admins"]
};
/**
 * Create mutation check that test the limit
 * NOTE: this is a naive implementation, that could fails if the user
 * either create the document very quickly or run creation in parallel
 */
export const makeLimitCreateCheck = (collectionName, providedOptions = {}) => (
  currentUser,
  document
) => {
  if (Meteor.isClient) {
    console.log(
      "Warning: creation limit check only works server side for the moment"
    );
  }
  const options = _merge({}, defaultOptions, providedOptions);
  const collection = getCollection(collectionName);
  if (!collection) {
    throw new Error(`Collection ${collectionName} not found`);
  }
  const typeName = getTypeName(collection);
  // if the user can not create document we simply return false
  // TODO: rely on collection.createCheck instead
  const canDo = Users.canDo(currentUser, [
    `${typeName.toLowerCase()}.create`,
    `${collectionName.toLowerCase()}.new`
  ]);
  // user can't create a document in any case -> return false
  if (!canDo) return false;
  // logged out -> ignore
  if (!currentUser) {
    console.log(
      "Warning: you can't set document creation limit for disconnected users. Fallback to default createCheck."
    );
    return canDo;
  }
  // excluded group -> ignore
  if (Users.isMemberOf(currentUser, options.excludedGroups)) return canDo;
  // admin -> true
  if (Users.isAdmin(currentUser)) return true;
  // non-admin member that is not excluded -> test the limit
  const limit = options.limit;
  const currentCount = collection.find({ userId: currentUser._id }).count();
  if (currentCount >= limit) {
    return false;
  }
  return true;
};

export default makeLimitCreateCheck;
