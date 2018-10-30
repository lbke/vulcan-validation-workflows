import mergeWithDefaultView from "./mergeWithDefaultView";
// define a view, so that we can retrieve only valid/own data when the user is
// not authorized
export const createValidOrOwnView = (collection, options) =>
  mergeWithDefaultView(collection, options, (terms, apolloClient, context) => {
    return {
      selector: {
        $or: [
          { userId: { $eq: context.currentUser && context.currentUser._id } },
          { [options.validFieldName]: { $eq: true } }
        ]
      }
    };
  });
// retrieve valid only
export const createValidOnlyView = (collection, options) =>
  mergeWithDefaultView(collection, options, (terms, apolloClient, context) => ({
    selector: {
      [options.validFieldName]: { $eq: true }
    }
  }));
