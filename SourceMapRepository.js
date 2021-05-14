const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { logError } = require("./log");

module.exports = class SourceMapRepository {
    constructor(projectId, projectKey) {
        this.airbrakeUrl = `https://airbrake.io/api/v4/projects/${projectId}`;

        if (!projectId || !projectKey) {
            logError("Airbrake id and Airbrake key are required");
            process.exit(1);
        }

        this.projectId = projectId;
        this.projectKey = projectKey;
        this.resource = `${airbrakeUrl}/sourcemaps`;
    }

    // List all sourcemaps in an Airbrake project
    async all() {
        try {
            const response = await axios.get(this.resource, {
                params: {
                    key: this.projectKey,
                },
            });

            const data = response.data.sourcemaps;
            if (typeof data === "undefined" || data === null) {
                return [];
            }

            return data;
        } catch (error) {
            const { code, type, message } = error.response.data;
            logError(`Unable to view sourcemaps`);
            console.log(message);
            process.exit(1);
        }
    }

    // Delete a sourcemap from an Airbrake project
    async delete(sourceMapId) {
        try {
            const response = await axios.delete(
                `${this.resource}/${sourceMapId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.projectKey}`,
                    },
                }
            );

            return response;
        } catch (error) {
            logError(`Unable to delete sourcemap.`);
            console.log(error);
            process.exit(1);
        }
    }

    // Upload a sourcemap to an Airbrake project
    async upload(filePath, file) {
        const form = new FormData();
        form.append("file", fs.createReadStream(filePath));
        form.append("name", file);

        try {
            const response = await axios.post(this.resource, form, {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${this.projectKey}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return response;
        } catch (error) {
            logError(`Unable to upload sourcemap.`);
            console.log(error.message);
            process.exit(1);
        }
    }
};
