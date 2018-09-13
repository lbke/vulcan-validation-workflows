import _merge from "lodash/merge"
// define a view, so that we can retrieve only valid/own data when the user is 
// not authorized
const createValidDefaultView = (collection, options) => (terms, apolloClient, context) => {
    const defaultView = collection.defaultView ? collection.defaultView(terms) : {}
    const validView = _merge(defaultView, {
        selector: {
            $or: [
                { userId: { $eq: context.currentUser && context.currentUser._id } },
                { [options.validFieldName]: { $eq: true } }
            ]
        }
    })
    //console.log("views", defaultView, validDefaultView)
    return validView
}
export default createValidDefaultView