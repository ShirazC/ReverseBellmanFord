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

            geocoding([["Mike", "75 Malin Rd, Malvern PA", true, 6], ["Evan", "9206 St Andrews Pl, College Park MD", true, 6]], map);

        });
}
var graph;
var count;

function initMap2(path) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {
            lat: 41.85,
            lng: -87.65
        }
    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, path);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, path) {
    var waypts = [];
    window.alert(path);
    debugger;
    for (var i = 1; i < n - 1; i++) {
        waypts.push({
            location: Object.keys(graph)[path[i]],
            stopover: true
        });
        console.log("------------*-------------");
        console.log(graph);
        console.log(path);
        console.log("------------*-------------");
    }
    console.log("*!!!!!!!!!!" + Object.keys(graph)[path[n - 1]] + "!!!!!!!!!!!!*");
    console.log(waypts);
    directionsService.route({
        origin: Object.keys(graph)[path[0]],
        destination: Object.keys(graph)[path[5]],
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = " ";
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function retrieve() {

    var matrix = [];
    for (var i = 0; i < n; i++) {
        matrix[i] = [];
        for (var j = 0; j < n; j++)
            matrix[i].push(0);
    }
    var keys = Object.keys(graph)
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            matrix[i][j] = (graph[keys[i]][0] - graph[keys[j]][0]) * (graph[keys[i]][0] - graph[keys[j]][0]) + (graph[keys[i]][1] - graph[keys[j]][1]) * (graph[keys[i]][1] - graph[keys[j]][1]);
            matrix[j][i] = matrix[i][j];
        }
        matrix[i][i] = 0;
    }
    console.log("-----------------------------");
    console.log(graph);
    console.log("-----------------------------");
    return matrix;

}

function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

function calc(matrix, array) {

    var sum = 0;
    for (var i = 0; i < n - 1; i++)
        sum += matrix[array[i]][array[i + 1]];

    return sum;

}

function findPath() {
    matrix = retrieve();
    per = [];
    for (var i = 1; i < n - 1; i++) {
        per.push(i);
    }
    var min = -1;
    var path = null;

    x = permutator(per);

    for (var i = 0; i < x.length; i++) {
        x[i].unshift(0);
        x[i].push(n - 1);
        var len = calc(matrix, x[i]);

        if (min == -1 || len < min) {
            min = len;
            path = x[i];
        }

    }
    //console.log(path);
    initMap2(path);

}

var nodeList = [];

function Node(label, id, location, seats) {
  // Driver is true, passenger is false
  this.label = label;
  this.id = id;
  this.location = location;
  // Will be empty for all passengers
  this.connections = [];
  // Will be zero for all passengers
  this.seats = seats;
  this.flag = null;
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

  for (var i = 0; i < arr.length; i++) {
    var location = null

    geocoder.geocode({
      'address': arr[i][1]
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        location = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

    if (location != null) {
      nodeList.push(Node(arr[i][2], arr[i][0], location, arr[i][3]))
    }
  }
}


function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}
