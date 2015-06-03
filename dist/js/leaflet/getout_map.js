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
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2FuZGVlcGt1IiwiYSI6IkFSY3ZlWk0ifQ.5oM1TFkbzFtB74EpnEOh-w';
    var map = L.mapbox.map('map')
        .setView([59.9155, 10.7419], 10)
        .addLayer(L.mapbox.tileLayer('mapbox.streets'));

    var geolocationLayer = L.mapbox.featureLayer().addTo(map);

    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);

        geolocationLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Your location',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });

        // And hide the geolocation button
        //geolocate.parentNode.removeChild(geolocate);
    });

// If the user chooses not to allow their location
// to be shared, display an error message.
    map.on('locationerror', function() {
       console.log("Position could not be found");
    });

    var clusterGroup;
    L.mapbox.featureLayer()
        .loadURL('/getout/getout/data/getout.js')
        .on('ready', function(e) {
           /* layers = e.target;
            showStations();
            */
            clusterGroup = new L.MarkerClusterGroup({
                iconCreateFunction: function(cluster) {
                    return L.mapbox.marker.icon({
                        'marker-symbol': cluster.getChildCount(),
                        'marker-color': '#422'
                    });
                }
            });
            e.target.eachLayer(function(layer) {
                var popupContent="";
               if(layer.feature){
                    for (key in layer.feature.properties) {
                        if (layer.feature.properties.hasOwnProperty(key)) {
                            if(layer.feature.properties[key].toString().indexOf("http:")>=0){
                                popupContent += key + " <b><a href='" + layer.feature.properties[key] + "' target='_blank'>" + layer.feature.properties[key] + "</a></b><br>";
                            }else {
                                popupContent += key + " <b>" + layer.feature.properties[key] + "</b><br>";
                            }
                        }
                    }
                    layer.bindPopup(popupContent);

               }
                clusterGroup.addLayer(layer);

            });

            map.addLayer(clusterGroup);
        });

    if (!navigator.geolocation) {
       console.log("Geolocation is not available");
    } else {
        map.locate();
    }
  /*
    L.mapbox.featureLayer('sandeepku.m4g0dckf').on('ready', function(e) {
        var clusterGroup = new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.mapbox.marker.icon({
                    'marker-symbol': cluster.getChildCount(),
                    'marker-color': '#422'
                });
            }
        });
        e.target.eachLayer(function(layer) {
            clusterGroup.addLayer(layer);
        });
        map.addLayer(clusterGroup);
    });
*/

  /*
    map = L.map('map').setView([59.9155, 10.7419], 10);
    layer = L.esri.basemapLayer('Streets',{
        detectRetina: true
    }).addTo(map);

    map.addControl( new L.Control.Gps({marker: new L.Marker([0,0])}) );//inizialize control

    var basemaps = document.getElementById('basemaps');

    basemaps.addEventListener('change', function(){
        setBasemap(basemaps.value);
    });

    function onEachFeature(feature, layer) {
       // console.log(feature.properties);
        var popupContent="";
        for (key in feature.properties) {
            if (feature.properties.hasOwnProperty(key)) {
                if(feature.properties[key].toString().indexOf("http:")>=0){
                    popupContent += key + " <b><a href='" + feature.properties[key] + "' target='_blank'>" + feature.properties[key] + "</a></b><br>";
                }else {
                    popupContent += key + " <b>" + feature.properties[key] + "</b><br>";
                }
            }
        }

        layer.bindPopup(popupContent);
    }
    var coorsLayer = L.geoJson(getout, {

        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) });  //L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) });

        },

        onEachFeature: onEachFeature
    }).addTo(map);

*/
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

