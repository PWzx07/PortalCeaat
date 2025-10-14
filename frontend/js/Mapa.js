// Inicializa o mapa
const map = new maplibregl.Map({
  container: 'map', // ID do div
  style: 'https://tiles.openfreemap.org/styles/liberty', // estilo do mapa
  center: [-38.41556954382065, -12.93753374863816], // Centro do mapa (salvador como exemplo)
  zoom: 17 // Zoom inicial
});

// Adiciona marcadores no mapa
map.on('load', () => {
  const marker = new maplibregl.Marker()
    .setLngLat([-38.41556954382065, -12.93753374863816])
    .setPopup(
      new maplibregl.Popup({ offset: 25 }).setText('Colegio estafual de tempo intwgral de aplicacao anisio texeira')
    )
    .addTo(map);
});

// Adiciona controle de navegação (zoom, giro)
map.addControl(new maplibregl.NavigationControl());
