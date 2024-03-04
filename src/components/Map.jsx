import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader"
const Map = ()=>{

  // const loader = new Loader({
  //   apiKey: "AIzaSyDrwYGDoA786fwSmeoh8PNw7Lol7Eu3WZw",
  //   version: "weekly",
  // });
  
  // loader
  //   .importLibrary('maps')
  //   .then(({Map}) => {
  //     var map = new Map(document.getElementById("map"), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8,
  //     });
  //     return map;
  //   })
  //   .catch((e) => {
  //     // do something
  //     console.error(e);
  //     return <></>
  // });
  maptilersdk.config.apiKey = 'hHP8GzQBqGQyFuQXlHJh';
      var map = new maptilersdk.Map({
          container: 'map',
          zoom: 0.3,
          center: [0, 20],
          style: maptilersdk.MapStyle.DATAVIZ.DARK
      });
  
      map.on('load', function () {
        // add a clustered GeoJSON source for a sample set of earthquakes
        map.addSource('school_source', {
          'type': 'geojson',
          'data': 'https://docs.maptiler.com/sdk-js/assets/Public_School_Characteristics_2020-21_no_prop.geojson',
        });
  
        map.addLayer({
          id: 'school_heat',
          type: 'heatmap',
          source: 'school_source',
          maxzoom: 14,
          paint: {
  
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'students'],
              0,
              0,
              20000, // 20k students to reach the max of colormap
              1
            ],
  
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              12,
              3
            ],
  
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, "rgba(68, 1, 84, 0)",
              0.01, "rgba(68, 1, 84, 0.2)",
              0.13, "rgba(71, 44, 122, 1)",
              0.25, "rgba(59, 81, 139, 1)",
              0.38, "rgba(44, 113, 142, 1)",
              0.5, "rgba(33, 144, 141, 1)",
              0.63, "rgba(39, 173, 129, 1)",
              0.75, "rgba(92, 200, 99, 1)",
              0.88, "rgba(170, 220, 50, 1)",
              1, "rgba(253, 231, 37, 1)",
            ],
  
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              18,
              0
            ]
          }
        });
  
        map.addLayer({
          'id': 'school_point',
          'type': 'circle',
          'source': 'school_source',
          'minzoom': 8,
          'paint': {
            'circle-pitch-alignment': "map",
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9,
              ['interpolate', ['linear'], ['get', 'students'], 10, 0.1 * 5, 4000, 2 * 2.5],
              16,
              ['interpolate', ['linear'], ['get', 'students'], 10, 1 * 5, 4000, 20 * 2.5]
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'students'],
              2000 * 0, "rgba(68, 1, 84, 0)",
              2000 * 0.01, "rgba(68, 1, 84, 20)",
              2000 * 0.13, "rgba(71, 44, 122, 100)",
              2000 * 0.25, "rgba(59, 81, 139, 100)",
              2000 * 0.38, "rgba(44, 113, 142, 100)",
              2000 * 0.5, "rgba(33, 144, 141, 100)",
              2000 * 0.63, "rgba(39, 173, 129, 100)",
              2000 * 0.75, "rgba(92, 200, 99, 100)",
              2000 * 0.88, "rgba(170, 220, 50, 100)",
              2000 * 1, "rgba(253, 231, 37, 100)",
            ],
            // 'circle-stroke-color': 'white',
            'circle-stroke-width': 0,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              8,
              0,
              12,
              0.8
            ]
          }
        });
      });
}
export default Map;