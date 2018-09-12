# Vulcan Validation Workflows

## Validate only the best

This package helps to manage document validation workflows in [Vulcan.js](http://vulcanjs.org/) applications. Its goal is to help developers to setup validation process, for example if you need documents to be validated by an admin before they are shown to the public.

**/!\ This is an experimental package, API will certainly evolve in the months to come**.

## Installation

Clone this repo:

```sh
git clone https://github.com/lbke/vulcan-validation-workflows
```

You can clone it directly in your app `packages` folder. You can also clone it in an isolated `vulcan-packages` folder outside of your app, and then set the `METEOR_PACKAGE_DIRS` environment variable to `"/some-dir/vulcan-packages"`. This way, you can put all your reusable package in this `vulcan-packages` folder without polluting your own app.

Then use the package in your app:

```js
import { theFunctionYouNeed } from "vulcan:validation-workflows"
```

This package won't be published on Atmosphere or npm until it is a bit more mature.

## Contributing

This package will evolve and improve depending on the use cases we encounter. Best way to contribute is to use it in your own app, and propose ideas, suggestions and PR based on your experience.

We seek for maximum reusability, so each method should be as configurable as possible, and split into independant functions whenever possible.

Possible improvements:

- Add a `_refused` state to the current workflow (right now user can't know if its document has been refused)
- Add more complex workflows (validation by a specific assigned user, multiple validations, remember who validated what, etc.)
- Handle drafts (would need to deactivate mandatory data validation, e.g if the title is needed but the document is only a draft, do not trigger errors if the title is not set yet)

*[Built with love by LBKE](https://github.com/lbke)*

