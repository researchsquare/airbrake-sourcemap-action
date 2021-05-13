# Aibrake sourcemap action

This actions takes a manifest file and uploads the
sourcemaps from it to Airbrake.

## Inputs
airbrake-id
airbrake-key

## Outputs
log

## Example usage
uses: researchsquare/airbrake-sourcemap-action@v1
with:
    airbrake-id="some id"
    airbrake-key="some key"

## Development
 - Install `npm i -g @vercel/ncc` locally.
 - Write code
 - `npm run package` to package up the files for distribution
 - Tag with a new version number
 - Open a PR

