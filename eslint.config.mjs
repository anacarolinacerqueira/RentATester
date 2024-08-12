import pluginCypress from 'eslint-plugin-cypress/flat'
export default [
  pluginCypress.configs.globals,
  {
    rules: {
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/assertion-before-screenshot": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error",
        "cypress/no-async-before": "error",
        "cypress/no-pause": "error",
    },
}];