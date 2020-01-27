// import * as Prim from './js/graph.js';

// var Graph = Prim.Graph;
// var Edge = Prim.Edge;
// var Vertex = Prim.Vertex;


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
var count = 0;
// var graphData = [];
var driverList = [];
var passengerList = [];
var id = 0; 
var finalGraphData;


function initMap() {
    var array = [];
    var myLatLng = {
        lat: 38.93055,
        lng: -77.40593
    };

    // console.log(localStorage.getItem("graphData")[0]);
    // globList = JSON.parse(localStorage.getItem("savedData"));
    // globList = '{{ mapData }}';
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

            // geocoding(globList, map);
            // console.log("LOCATION: ", loc);
            // console.log("*********************************************");
            // console.log("*********************************************");
            // console.log("GRAPH DATA: ", graphData);
            // console.log("*********************************************");
            // console.log("*********************************************");

            // var id = graphData.length;
            // var finalGraphData = graphData;
            // console.log("PRE COUNT: ", id);
            // for(var index=0; index<graphData.length; index++){
            //   // if(i<graphData.length-1){
            //     console.log("COUNT: ", id);
            //     var obj = {
            //       'id': id++,
            //       'source': index,x
            //       'target': index+1
            //     };
            //     alert(obj);
            //     finalGraphData.push(obj);
            //     console.log("Hello");
            //     console.log(typeof(obj));

            //   // }
            // }
            // console.log("POST COUNT: ", id);
            // console.log("FINAL GRAPH DATA: ", finalGraphData);
            geocoding(globList, map);
              
              setTimeout(function(){
                
                console.log("Waiting 10 seconds...");
              
                
              }, 20000);
              setTimeout(function(){
                addEdges();
              }, 1000);

              

        });
}

function addEdges(){
  console.log("LOCATION: ", loc);
  console.log("*********************************************");
  console.log("*********************************************");
  console.log("GRAPH DATA: ", graphData);
  console.log("*********************************************");
  console.log("*********************************************");
  console.log("FIRST FIRST ELEMENT: ", graphData[0]);
  id = graphData.length;
  finalGraphData = graphData;
  console.log("FIRST ELEMENT: ", graphData[0]);
  console.log("RESULT: ", graphData);
  console.log("PRE COUNT: ", id);
  for(var index=0; index<22; index++){
  // if(i<graphData.length-1){
    console.log()
    console.log("COUNT: ", id);
    var obj = {
      'id': id++,
      'source': index,
      'target': index+1
    };
    // alert(obj);
    finalGraphData.push(obj);
    console.log("Hello");
    console.log(typeof(obj));

  // }
  }
  console.log("POST COUNT: ", id);
  console.log("FINAL GRAPH DATA: ", finalGraphData);
}




function getGeocode(address, map, geocoder, i){
  setTimeout(function(){

          geocoder.geocode({
      'address': address
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {

        var curLoc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        loc.push(curLoc);

        var obj = {
          'id': count++,
          'address': curLoc,
        };
        graphData.push(obj);

        console.log("HELLO")
        // debugger;
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

        new Promise(function(resolve, reject) {
          getGeocode(arr[i].address, map, geocoder, i);
          return resolve();
        }).then(function(){
          console.log("ITERATION: ", i);
        });

          // var node = Node(arr[i][2], arr[i][0], loc, arr[i][3]);
          //   var node = Node(arr[i][2], arr[i][0], loc, arr[i][3]);
          //   passengerList.push(node);
        }



  }


