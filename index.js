const core = require("@actions/core");
const github = require("@actions/github");

try {
    const id = core.getInput("airbrake-id");
    console.log(`Airbrake Id: ${id}!`);

    const key = core.getInput("airbrake-key");
    console.log(`Airbrake Key: ${key}!`);

    const log = "Some stuff happened";
    core.setOutput("log", log);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
