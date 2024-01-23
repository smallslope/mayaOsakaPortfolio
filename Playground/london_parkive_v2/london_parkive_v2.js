const apiKey = 'NFchkRqdrAhfFMcpKViWoyxeBaAiobGE';

const collectionId = 'ngd-base'; // 'ngd-base|asu-bdy|wtr-ctch'

// Modify the JSON style request incorporate a `tiles` property which lists an array of tile endpoints.
// The '&key=' HTTP query parameter is also appended to each tile endpoint to authenticate the request.
// NOTE: The {z}, {x} and {y} template values are replaced with the corresponding integers at runtime.
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [ resource, config ] = args;

    let response = await originalFetch(resource, config);
    if( response.url != `https://api.os.uk/maps/vector/ngd/ota/v1/collections/${collectionId}/styles/3857` )
        return response;

    // Response interceptor.
    const json = () =>
        response.clone().json().then((data) => {
            delete data.sources[ collectionId ].url;
            data.sources[ collectionId ].tiles = [ `https://api.os.uk/maps/vector/ngd/ota/v1/collections/${collectionId}/tiles/3857/{z}/{y}/{x}?key=${apiKey}` ];
            return data;
        });

    response.json = json;
    return response;
};

// Initialize the map.
const mapOptions = {
    minZoom: 10,
    maxZoom: 18,
    center: [ 51.5072, 0.1276  ],
    zoom: 10,
    maxBounds: [
        [ 51.800972, -0.677032 ],
        [ 51.246444, 0.380402]
    ],
    attributionControl: false
};

const map = L.map('map', mapOptions);

// Load and display vector tile layer on the map.
const gl = L.maplibreGL({
    style: `https://api.os.uk/maps/vector/ngd/ota/v1/collections/${collectionId}/styles/3857`
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);
