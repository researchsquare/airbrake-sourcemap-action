const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const { logError, logInfo } = require("./log");
const SourceMapRepository = require("./SourceMapRepository");

async function main() {
    try {
        const airbrakeId = core.getInput("airbrake-id");
        const airbrakeKey = core.getInput("airbrake-key");
        const buildPath = core.getInput("build-path");
        const manifest = core.getInput("manifest");
    } catch (error) {
        core.setFailed(error.message);
    }

    if (!("files" in manifest)) {
        logError(
            "We currently only support Create React App generated manifest files at this time."
        );

        process.exit(1);
    }

    const sourceMapRepository = new SourceMapRepository(
        airbrakeId,
        airbrakeKey
    );

    const sourceMaps = await sourceMapRepository.all();

    logInfo(`Existing sourcemaps: ${sourceMaps.length}`);
    logInfo(`Removing all existing maps...`);

    await sourceMaps.forEach(async ({ id }) => {
        await sourceMapRepository.delete(id);
    });

    // Look at each file key in the manifest and if it's a .map file
    // then let's upload it to Airbrake.
    Object.keys(manifest.files)
        .filter((name) => name.slice(-4) === ".map")
        .forEach(async (name) => {
            const pathToFile = `${buildPath}/${name}`;

            await sourceMapRepository.upload(pathToFile, name);
            logInfo(`New sourcemap uploaded: ${name}`);
        });
}

main();
