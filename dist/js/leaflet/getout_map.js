/**
 * Created by sandeepk on 10.05.2015.
 */
var map,layer,layerLabels;
function initMap()
{
  /*
    var map = L.map('map', 'examples.map-9ijuk24y').setView([59.9155, 10.7419], 10);//center around oslo //'examples.map-9ijuk24y'sandeepku.hp2c12pf) sandeepku.hp67k9lk


    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-20v6611k'
    }).addTo(map);
    var baseballIcon = L.icon({
        iconUrl: 'baseball-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
    });
*/

    map = L.map('map').setView([59.9155, 10.7419], 10);
    layer = L.esri.basemapLayer('Streets',{
        detectRetina: true
    }).addTo(map);

    var basemaps = document.getElementById('basemaps');

    basemaps.addEventListener('change', function(){
        setBasemap(basemaps.value);
    });

    function onEachFeature(feature, layer) {
        var popupContent = "<p>I started out as a GeoJSON " +
            feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
    }
    var coorsLayer = L.geoJson(getout, {

        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) });  //L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) });

        },

        onEachFeature: onEachFeature
    }).addTo(map);
}
function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }
    layer = L.esri.basemapLayer(basemap);
    map.addLayer(layer);
    if (layerLabels) {
        map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {

        layerLabels = L.esri.basemapLayer(basemap + 'Labels');
        map.addLayer(layerLabels);
    }
}

