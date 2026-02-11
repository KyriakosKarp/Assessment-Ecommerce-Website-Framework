exports.config = {
  runner: "local",

  specs: ["./test/specs/**/cart.spec.js"],

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        // Fixed viewport for deterministic UI behavior across environments
        args: [
          "--headless,",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--window-size=1920,1080",
        ],
      },
    },
  ],

  logLevel: "info",

  baseUrl: "https://www.saucedemo.com",

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",

  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
