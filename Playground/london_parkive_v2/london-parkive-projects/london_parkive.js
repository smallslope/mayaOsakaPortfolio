var mapContainer = document.getElementById('map');
var map = new maplibregl.Map({
    container: mapContainer, 
    style: 'https://tiles.stadiamaps.com/styles/stamen_toner_lite.json', 
    center: [-0.13067, 51.5068], 
    zoom: 12
});

var parksInformation = false;
var parksShapes = false;
var popup = new maplibregl.Popup({closeOnClick: false})
//View Modes// 
var parkStatusViewMode = {
    id : "park_status_layer",
    type : "fill",
    source : "parkShapesSource",
    paint : {
        'fill-color' : [
            'match',
            ['get', 'status'],
            'Open', '#50b848',
            'Defunct', '#ff4c3f',
            'Under Threat', '#FDFD11',
            '#5A5AE2'
        ],
        'fill-opacity' : 1
    }
};
var yearOpenedViewMode = {
    id : "year_opened_layer",
    type : "fill",
    source : "parkShapesSource",
    paint : {
        'fill-color' : [
            'match',
            ['get', 'period_opened'],
            '<1850', '#870E8A',
            '1850-1874', '#CA1CCD',
            '1875-1899', '#FC51FF',
            '1900-1924', '#102C8F',
            '1925-1949', '#244BD6',
            '1950-1974', '#809CFF',
            '1975-1999', '#BDCCFF',
            '2000-2025', '#AAA30D',
            '#000000'
        ],
        'fill-opacity' : 0
    }
};
//Park Alteraations -> Different shapes and colours depending on whether a park has been expanded, shrunk or remained the same.
var shrunkParksLayer = {
    id : "shrunk_park_areas",
    type : "fill",
    source : "parksAlterationsSource",
    paint : {
        "fill-color" : "#ff4c3f",
        "fill-opacity" : 0
    },
    filter : ["==", ["get", "alteration"], "Shrunk"],
   
}
var alterationParksLayer = {
    id : "park_alterations",
    type : "fill",
    source : "parkShapesSource",
    paint : {
        "fill-color" : [
            "match",
            ["get", "altered"],
            "Unchanged", "#50b848",
            "Expanded", "#059FDC",
            "Shrunk", "#50b848",
            "Closed", "#ff4c3f",
            "#000000"
        ],
        "fill-opacity" : 0,
        
    }
}
var expandedParksLayer = {
    id : "expanded_park_areas",
    type : "fill",
    source : "parksAlterationsSource",
    paint :  {
        "fill-color" : '#50b848',
        "fill-opacity" : 0.8
    },
    filter : ["==", ["get", "alteration"], "Expanded"]
} 
map.on('load', () =>{

    fetch('./data_files/london_parks_info.json')
    .then(response => response.json())
    .then(response => {
    parksInformation = response;
    console.log(parksInformation);
    })

    map.addSource("parkShapesSource",{
        type : "geojson",
        data : './data_files/park_shapes_source.json'
    })

    map.addSource("boroughs_shapes",{
        type : "geojson",
        data : './data_files/uk_local_district_boundaries.json'            
    })
    map.addSource("parksAlterationsSource",{
        type : "geojson",
        data : "./data_files/parks_alterations_source.json"
    });

    map.addLayer({
        id : "boroughs_line_layer",
        type : "line",
        source : "boroughs_shapes",
        paint : {
            "line-opacity" : 0.5,
            "line-color" : "#000000",
            "line-width" : 2.5
        }
    })
    map.addLayer(parkStatusViewMode);
    map.addLayer(yearOpenedViewMode);
    map.addLayer(shrunkParksLayer);
    map.addLayer(alterationParksLayer);
    map.addLayer(expandedParksLayer);
})


map.on('click', 'park_status_layer', function(e){
    const clickedFeatures = map.queryRenderedFeatures(e.point, { layers : ['park_status_layer']})
    console.log(clickedFeatures)

    let clickedParkName = clickedFeatures[0].properties.name;
    let yearOpened = 0;
    parksInformation.forEach(function(thisPark){
        if(thisPark.name === clickedParkName){
            yearOpened = thisPark["year_opened"];
            
        } 
    })
    popup.setLngLat(e.lngLat).setHTML(
        `${clickedParkName} was opened in ${yearOpened}`
    ).addTo(map)
})
document.getElementById("status_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0.8)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0)
    map.setPaintProperty("park_alterations", "fill-opacity", 0)   
});
document.getElementById("year_opened_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0.8)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0)
    map.setPaintProperty("park_alterations", "fill-opacity", 0)   
});
document.getElementById("alterations_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0.8)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0.8)
    map.setPaintProperty("park_alterations", "fill-opacity", 0.8)   
});

//Find code that is currently not being used but could be useful later down the line here://
    //Function for merging park data. 
    // mergeParkData = function (parkinfo, parkshapes){
    //     console.log(parkinfo);
    //     console.log(parkshapes);
    //     parkshapes.features.forEach((feature) => {
    //     console.log(feature.properties);
    //     let data = parkinfo.filter((info)=>info.name == feature.properties.name);
    //     console.log(data);
    //     feature.properties = data[0]
    //     });
    //     console.log(parkshapes);
    // }

   // Year Opened Option 1 (Different shades of green -> Don't think the deestinction is obvious enough.)
        // map.addLayer({
        //     id : "park_shapes_layer",
        //     type : "fill",
        //     source : "parkShapesSource",
        //     paint : {
        //         'fill-color' : [
        //             'match',
        //             ['get', 'period_opened'],
        //             '<1850', '#0D5A00',
        //             '1850-1874', '#158204',
        //             '1875-1899', '#1BA405',
        //             '1900-1924', '#56B647',
        //             '1925-1949', '#85DE76',
        //             '1950-1974', '#ACEEA1',
        //             '1975-1999', '#D5FBCF',
        //             '2000-2025', '#E2F7DF',
        //             '#000000'
        //         ],
        //         'fill-opacity' : 0.5
        //     }
        // })