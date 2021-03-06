import Users from "meteor/vulcan:users";
import { getMergedOptions } from "./defaultOptions";
/**
 * If the current user can not validate data,
 * we filter with _valid = true OR own documents
 * otherwise we use the default view of the collection
 *
 * @param {*} currentUser
 */
export const getValidationView = (currentUser, options) => {
  const mergedOptions = getMergedOptions(options);
  return !Users.isMemberOf(currentUser, mergedOptions.moderatorGroups)
    ? "defaultValidView"
    : undefined;
};

export default getValidationView;
