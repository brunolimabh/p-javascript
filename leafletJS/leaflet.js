
function exibirRota(trajetos) {
    const cordInicial = [Number(trajetos[0].latitude), Number(trajetos[0].longitude)]

    // ------------ INICIALIZANDO O MAPA VAZIO ------------
    const map = L.map('map', {
        center: cordInicial,
        zoom: 14
    })
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    // ------------ INSERINDO MARKER VAN ------------
    const taxiIcon = L.icon({
        className: "taxi-pointers",
        iconUrl: 'taxi.png',
        iconSize: [70, 55]
    })
    L.marker(cordInicial, { icon: taxiIcon })
        .addTo(map)
        .bindPopup(`<b>${trajetos[0].nome}</b><br>${trajetos[0].endereco}`)

    // ------------ INSERINDO MARKER ENDEREÇOS ------------
    const icon = L.icon({
        className: "pointers",
        iconAnchor: [15, 50],
        popupAnchor: [0, -50],
        iconSize: [30, 50],
        iconUrl: 'marker-icon.png'
    })

    for (let i = 1; i < trajetos.length; i++) {
        L.marker([trajetos[i].latitude, trajetos[i].longitude], { icon })
         .addTo(map)
         .bindPopup(`<b>${trajetos[i].nome}</b><br>${trajetos[i].endereco}`)
    }

    // ------------ CALCULANDO O TRAJETO DO INDICE "0" AO FINAL ------------
    let waypoints = [];
    for (var i = 0; i < trajetos.length; i++) {
        waypoints.push(L.latLng(trajetos[i].latitude, trajetos[i].longitude));
    }
    L.Routing.control({
        waypoints: waypoints
    }).addTo(map);

    var dir = MQ.routing.directions()

    dir.route({
        locations: [
            "Rua Tagua 88",
            "Rua Canuto Saiva 429"
        ]
    })
}


