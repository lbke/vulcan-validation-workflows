Package.describe({
  name: "vulcan:validation-workflows"
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:users", "vulcan:more-helpers"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
