import _merge from "lodash/merge"
export const defaultOptions = {
    moderatorGroups: ["admins"],
    // document are invalid as a default, but user may want documents
    // to be valid as a default, and only invalidate if needed
    defaultValidation: false,
    validFieldName: "_valid"
};

export const getMergedOptions = (options = {}) => _merge(defaultOptions, options)