import _merge from "lodash/merge";
// define a view, so that we can retrieve only valid/own data when the user is
// not authorized
const mergeWithDefaultView = (collection, options, view) => (
  terms,
  apolloClient,
  context
) => {
  const defaultView = collection.defaultView
    ? collection.defaultView(terms, apolloClient, context)
    : {};
  const mergedView = _merge(defaultView, view(terms, apolloClient, context)); //console.log("views", defaultView, validDefaultView)
  return mergedView;
};
export default mergeWithDefaultView;
