import { mergeWithDefaultView } from "meteor/vulcan:more-helpers";
// get only own
export const createOwnView = (collection, options) =>
  mergeWithDefaultView(collection, options, (terms, apolloClient, context) => {
    return {
      selector: {
        userId: { $eq: context.currentUser && context.currentUser._id }
      }
    };
  });
