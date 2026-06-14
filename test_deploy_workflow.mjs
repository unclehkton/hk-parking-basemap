import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const workflow = fs.readFileSync(
  path.join(process.cwd(), 'map-basemap-repo', '.github', 'workflows', 'deploy.yml'),
  'utf8'
);

test('workflow opts into Node 24 compatible action runtime', () => {
  assert.match(workflow, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24:\s*true/);
  assert.match(workflow, /uses:\s*actions\/checkout@v5/);
  assert.match(workflow, /uses:\s*actions\/setup-java@v5/);
});

test('workflow pins protomaps basemaps and predownloads fragile auxiliary sources', () => {
  assert.match(workflow, /PROTOMAPS_BASEMAPS_REF:/);
  assert.match(workflow, /git(?:\s+-C\s+basemaps)?\s+checkout "\$PROTOMAPS_BASEMAPS_REF"/);
  assert.match(workflow, /water-polygons-split-3857\.zip/);
  assert.match(workflow, /land-polygons-split-3857\.zip/);
  assert.match(workflow, /daylight-landcover\.gpkg/);
  assert.match(workflow, /pgf-encoding\.zip/);
  assert.doesNotMatch(workflow, /--download/);
});
