$(".button").on('click', function() {
    $(".inputs-container").toggleClass("hidden");
});

function disable() {

    document.getElementById("restartButton").disabled = true;
    document.getElementById("quitButton").disabled = true;
    document.getElementById("inputBox").disabled = true;

    document.getElementById("inputBox").disabled = true;
    document.getElementById("playButton").disabled = false;


}

var n = 0;
var globList = [["Mike", "75 Malin Rd, Malvern PA", false, 6], ["Evan", "9206 St Andrews Pl, College Park MD", false, 6]]
var location;

function Graph() {
  this.node = []
  this.edge = []
}

function initMap() {
    var array = [];
    var myLatLng = {
        lat: 38.93055,
        lng: -77.40593
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'

    });

    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click',
        function() {

            n = 6;
            count = 0;
            graph = {};

            for (var i = 1; i < n + 1; i++)
                array.push(document.getElementById('address' + i).value);

            //console.log(array);

            geocoding(globList, map);

        });
}

var driverList = [];
var passengerList = [];

// The array will be [..., [Name, Address, Boolean], ...]
function geocoding(arr, resultsMap) {
  var geocoder = new google.maps.Geocoder();

  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {
          lat: 41.85,
          lng: -87.65
      }
  });

  for (var i = 0; i < arr.length; i++) {
    location = null;

    geocoder.geocode({
      'address': arr[i][1]
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        location = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        console.log(location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

    while (location == null) {
      console.log("waiting");
    }

    console.log("LOCATION: ", location);
    console.debug("hi");
    console.debug(arr[i][2] + " " + arr[i][0] + arr[i][3]);
    debugger;

    if (arr[i][2] === false) {
      // var node = Node(arr[i][2], arr[i][0], location, arr[i][3]);
      // passengerList.push(node);
    } else {
      // driverList.push(Node(arr[i][2], arr[i][0], location, arr[i][3]));
    }
  }
  //
  // initGraph(passengerList);
}

var graph = null;

function initGraph(nodes) {
  graph = Graph();

  console.log(driverList.length + " " + passengerList.length);

    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < graph.node.length; j++) {
        var dist = google.maps.geometry.spherical.computeDistanceBetween (nodes[i][2], graph.node[j][2]);

        graph.edge.push([nodes[i], graph.node[j], dist]);
        console.log("Wooooooooo");
        console.log(nodes[i][1] + " to " + graph.node[j][1] + " is " + dist);
      }

    graph.node.push(nodes[i]);
  }
}
