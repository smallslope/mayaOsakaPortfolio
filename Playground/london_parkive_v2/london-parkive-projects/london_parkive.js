var mapContainer = document.getElementById('map');
var map = new maplibregl.Map({
    container: mapContainer, 
    style: 'https://tiles.stadiamaps.com/styles/stamen_toner_lite.json', 
    center: [-0.0670045430832684,51.47066260405178], 
    zoom: 12
});
var parksInformation = false;
var parksShapes = false;
var popup = new maplibregl.Popup({closeOnClick: false});
//Status Polygon Colours//
var statusOpenColor = "#50b848";
document.getElementById("status_open").style = `background-color: ${statusOpenColor}`;
document.getElementById("alterations_unchanged").style = `background-color: ${statusOpenColor}`;
var statusDefunctColor = "#ff4c3f";
document.getElementById("status_defunct").style = `background-color: ${statusDefunctColor}`;
var statusUnderThreatColor = "#fee400";
document.getElementById("status_under_threat").style = `background-color: ${statusUnderThreatColor}`;
//Year Opened Polygon Colours//
var yoBefore1850Color = "#870E8A";
document.getElementById("yo_before1850").style = `background-color: ${yoBefore1850Color}`;
var yo1850to1874Color = "#CA1CCD";
document.getElementById("yo_1850to1874").style = `background-color: ${yo1850to1874Color}`;
var yo1875to1899Color = "#FC51FF";
document.getElementById("yo_1875to1899").style = `background-color: ${yo1875to1899Color}`;
var yo1900to1924Color = "#102C8F";
document.getElementById("yo_1900to1924").style = `background-color: ${yo1900to1924Color}`;
var yo1925to1949Color = "#244BD6";
document.getElementById("yo_1925to1949").style = `background-color: ${yo1925to1949Color}`;
var yo1950to1974Color = "#809CFF";
document.getElementById("yo_1950to1974").style = `background-color: ${yo1950to1974Color}`;
var yo1975to1999Color = "#BDCCFF";
document.getElementById("yo_1975to1999").style = `background-color: ${yo1975to1999Color}`;
var yo2000to2024Color = "#AAA30D";
document.getElementById("yo_2000to2024").style = `background-color: ${yo2000to2024Color}`;
//Alterations Polygon Colours//
var alterationsExpandedColor = "#059FDC";
document.getElementById("alterations_expanded").style = `background-color: ${alterationsExpandedColor}`;
var alterationsShrunkColor = "#ff4c3f";
document.getElementById("alterations_shrunk").style = `background-color: ${alterationsShrunkColor}`;

//View Modes// 
var parkStatusViewMode = {
    id : "park_status_layer",
    type : "fill",
    source : "parkShapesSource",
    paint : {
        'fill-color' : [
            'match',
            ['get', 'status'],
            'Open', statusOpenColor,
            'Defunct', statusDefunctColor,
            'Under Threat', statusUnderThreatColor,
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
        "fill-color" : [
            "match",
            ["get", "period_opened"],
            "<1850", yoBefore1850Color,
            "1850-1874", yo1850to1874Color,
            "1875-1899", yo1875to1899Color,
            "1900-1924", yo1900to1924Color,
            "1925-1949", yo1925to1949Color,
            "1950-1974", yo1950to1974Color,
            "1975-1999", yo1975to1999Color,
            "2000-2024", yo2000to2024Color,
            "#000000"
        ],
        'fill-opacity' : 0
    }
};
var shrunkParksLayer = {
    id : "shrunk_park_areas",
    type : "fill",
    source : "parksAlterationsSource",
    paint : {
        "fill-color" : alterationsShrunkColor,
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
            "Unchanged", statusOpenColor,
            "Expanded", alterationsExpandedColor,
            "Shrank", statusOpenColor,
            "Closed", statusDefunctColor,
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
        "fill-color" : statusOpenColor,
        "fill-opacity" : 0.8
    },
    filter : ["==", ["get", "alteration"], "Expanded"]
} 

mergeParkData = function (parkinfo, parkshapes){
    console.log(parkinfo);
    console.log(parkshapes);
    parkshapes.features.forEach((feature) => {
    console.log(feature.properties);
    let data = parkinfo.filter((info)=>info.name == feature.properties.name);
    console.log(data);
    feature.properties = data[0]
    });
    console.log(parkshapes);
}
map.on('load', () =>{

    fetch('./data_files/london_parks_info.json')
    .then(response => response.json())
    .then(response => {
    parksInformation = response;
    console.log(parksInformation);
    })
    fetch('./data_files/park_shapes_source.json')
    .then(response => response.json())
    .then(response => {
    parksShapes = response;
    console.log(parksShapes);
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

    mergeParkData(parksInformation,parksShapes);
})
document.getElementById("status_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0.8)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0)
    map.setPaintProperty("park_alterations", "fill-opacity", 0)
    
    document.getElementById("status_keys").style.display = "flex";
    document.getElementById("yearOpened_keys").style.display = "none";
    document.getElementById("alterations_keys").style.display = "none";
});
document.getElementById("year_opened_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0.8)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0)
    map.setPaintProperty("park_alterations", "fill-opacity", 0)
    
    document.getElementById("status_keys").style.display = "none";
    document.getElementById("yearOpened_keys").style.display = "flex";
    document.getElementById("alterations_keys").style.display = "none";
});
document.getElementById("alterations_button").addEventListener("click", function(){
    map.setPaintProperty("year_opened_layer", "fill-opacity", 0)
    map.setPaintProperty("park_status_layer", "fill-opacity", 0)
    map.setPaintProperty("shrunk_park_areas", "fill-opacity", 0.8)
    map.setPaintProperty("expanded_park_areas", "fill-opacity", 0.8)
    map.setPaintProperty("park_alterations", "fill-opacity", 0.8)  
    
    document.getElementById("status_keys").style.display = "none";
    document.getElementById("yearOpened_keys").style.display = "none";
    document.getElementById("alterations_keys").style.display = "flex";
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