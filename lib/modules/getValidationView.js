import Users from "meteor/vulcan:users"
import { getMergedOptions } from "./defaultOptions"
/**
 * If the current user can not validate data,
 * we filter with _valid = true
 * otherwise we use the default view
 * @param {*} currentUser 
 */
export const getValidationView = (currentUser, options) => {
    const mergedOptions = getMergedOptions(options)
    console.log("not member", currentUser, mergedOptions.moderatorGroups, !Users.isMemberOf(currentUser, mergedOptions.moderatorGroups))
    return (!Users.isMemberOf(currentUser, mergedOptions.moderatorGroups)) ? "defaultValidView" : undefined
}

export default getValidationView