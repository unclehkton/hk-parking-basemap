(function () {
  'use strict';

  const root = document.getElementById('map');
  const status = document.getElementById('map-status');
  const artifactLabel = document.getElementById('artifact-label');
  const fallbackLabel = document.getElementById('fallback-label');
  const tileMeta = document.getElementById('tile-meta');

  if (!root || !status || !window.L) return;

  const runtime = Object.assign(
    {
      pmtilesUrl: root.dataset.pmtilesUrl || './hong-kong.pmtiles',
      fallbackTileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      fallbackAttribution: '&copy; OpenStreetMap contributors',
      center: [22.3193, 114.1694],
      zoom: 11,
      minZoom: 9,
      maxZoom: 17,
      flavor: 'light',
      lang: 'en',
      tileSizeMb: '29.8 MB',
      tileBounds: '113.8130, 22.1304 to 114.5060, 22.5690',
      generatedAt: ''
    },
    window.HK_BASEMAP_CONFIG || {}
  );

  artifactLabel.textContent = runtime.pmtilesUrl || 'hong-kong.pmtiles';
  fallbackLabel.textContent = runtime.fallbackTileUrl;
  tileMeta.textContent = [
    runtime.tileSizeMb ? 'Artifact size: ' + runtime.tileSizeMb : '',
    runtime.tileBounds ? 'Coverage: ' + runtime.tileBounds : '',
    runtime.generatedAt ? 'Generated: ' + runtime.generatedAt : ''
  ].filter(Boolean).join(' | ');

  const map = L.map(root, {
    zoomControl: true,
    minZoom: runtime.minZoom,
    maxZoom: runtime.maxZoom
  }).setView(runtime.center, runtime.zoom);

  try {
    if (runtime.pmtilesUrl && window.protomapsL && typeof window.protomapsL.leafletLayer === 'function') {
      protomapsL.leafletLayer({
        url: runtime.pmtilesUrl,
        flavor: runtime.flavor,
        lang: runtime.lang
      }).addTo(map);
      status.textContent = 'PMTiles basemap loaded from ' + runtime.pmtilesUrl;
      status.dataset.state = 'ready';
      return;
    }
  } catch (error) {
    console.error(error);
  }

  L.tileLayer(runtime.fallbackTileUrl, {
    attribution: runtime.fallbackAttribution
  }).addTo(map);

  status.textContent = 'Raster fallback loaded. Publish hong-kong.pmtiles or set a PMTiles URL to switch over.';
  status.dataset.state = 'fallback';
})();
