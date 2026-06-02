# Hong Kong Parking Basemap

This folder is ready to become a separate public GitHub repository for the Hong Kong parking basemap used by Carpark Monitor.

It serves two jobs:

1. host a lightweight public PMTiles viewer on GitHub Pages
2. generate and publish `hong-kong.pmtiles` from OSM using a workflow adapted from `anscg/hk-pmtiles-generation`

## What this repo contains

- `index.html`
  - standalone bilingual basemap viewer for quick validation
- `app.js`
  - runtime map bootstrap with PMTiles-first loading and raster fallback
- `styles.css`
  - compact public-facing viewer styling
- `config.example.js`
  - optional runtime configuration override
- `.github/workflows/build-and-deploy.yml`
  - GitHub Actions workflow to build Hong Kong vector PMTiles and deploy the viewer to Pages
- `hong-kong.pmtiles`
  - optional checked-in artifact for immediate publishing

## Generation approach

The workflow follows the same general model as [anscg/hk-pmtiles-generation](https://github.com/anscg/hk-pmtiles-generation):

- use `protomaps/basemaps`
- download the Hong Kong Geofabrik extract
- build a Hong Kong-focused vector PMTiles basemap
- publish the viewer plus artifact to GitHub Pages

This repo keeps the scope intentionally narrow:

- vector basemap only
- no parking overlay data
- no private runtime logic

## Suggested publish flow

1. create a new public repo under `unclehkton`
2. copy this folder into that repo root
3. enable GitHub Pages for GitHub Actions
4. push to `main`
5. run the `Build And Deploy HK PMTiles` workflow if you want a fresh artifact from CI

## Hosting notes

- The current local Hong Kong PMTiles artifact is about 29.8 MB, so GitHub Pages can serve it directly.
- If future artifacts grow too large for repo history comfort, keep the viewer in Pages and move the `.pmtiles` file to Releases or object storage.

## Attribution

Visible attribution should remain in the public viewer:

- `© OpenStreetMap contributors`
- `Map rendered with Leaflet`
- `Basemap generation approach adapted from anscg/hk-pmtiles-generation`
