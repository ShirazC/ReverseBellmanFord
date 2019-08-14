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
var globList;
var loc = [];

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

    // console.log(localStorage.getItem("graphData")[0]);
    globList = JSON.parse(localStorage.getItem("savedData"));
    console.log("GLOBLIST ", globList);
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


            //console.log(array);

            geocoding(globList, map);
            console.log("LOCATION", loc);

        });
}

var driverList = [];
var passengerList = [];

function getGeocode(address, map, geocoder, i){
  setTimeout(function(){

          geocoder.geocode({
      'address': address
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var curLoc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        loc.push(curLoc);
        console.log("HELLO")
        debugger;
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }

      else {
        alert('Geocode was not successful for the following reason: ' + status);
        console.log(status);
      }
    });      }, 600 * i);
}

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
console.log("ARRAY", arr);
  for (var i = 0; i < arr.length; i++) {
      
        getGeocode(arr[i].address, map, geocoder, i);
    
          // var node = Node(arr[i][2], arr[i][0], loc, arr[i][3]);
          //   var node = Node(arr[i][2], arr[i][0], loc, arr[i][3]);
          //   passengerList.push(node);
        }
        // debugger;
    // console.log("LOCATION: ", loc);
    // console.debug("hi");
    // console.debug(arr[i][2] + " " + arr[i][0] + arr[i][3]);
    // debugger;
    // initGraph(passengerList);
  }
  //
  // initGraph(passengerList);


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
