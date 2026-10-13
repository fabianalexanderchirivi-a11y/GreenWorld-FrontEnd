const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: false,
  screenshotsFolder: 'cypress/evidence/screenshots',
  videosFolder: 'cypress/evidence/videos',
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
})
