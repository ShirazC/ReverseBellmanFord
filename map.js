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


class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw 'Already Exist!!!';
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)){
        let arr = this.AdjList.get(vertex);
        if(!arr.includes(node)){
          arr.push(node);
        }
      }else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value);
    }
  }
}

var n = 0;
var globList;
var loc = [];
var count = 0;
var graphData = [];
var driverList = [];
var passengerList = [];
var id = 0;
var finalGraphData;
var graphSet = new Graph();

globList = JSON.parse(localStorage.getItem("savedData"));

function checkIfFinished(){
    return(graphData.length >= globList.length);
}

function graphContains(array, obj){
  for(var i = 0; i<array.length; i++){
    if((array[i].source == obj.source && array[i].target == obj.target) || (array[i].source == obj.target && array[i].target == obj.source)){
      return true;
    }
  }
  return false;
}

function computeDist(p1, p2){
  var lat1 = p1[0];
  var lon1 = p1[1];
  var lat2 = p2[0];
  var lon2 = p2[1];
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function initMap() {
    var array = [];
    var myLatLng = {
        lat: 38.93055,
        lng: -77.40593
    };

    // console.log(localStorage.getItem("graphData")[0]);

    // globList = {{ mapData }};
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

              geocoding(globList, map).then(function(intentsArr){
                console.log('Finally, I can execute!!!');
                var timeout = setInterval(function() {
                    if(checkIfFinished()) {
                      console.log("finished");
                      console.log(graphData.length);
                      addEdges();
                        clearInterval(timeout);
                        isFinished = true;

                    }
                }, 100);
                // console.log("finished");
                // console.log(graphData.length);
                // addEdges();
              },
              function(err){
                console.log('This is error message.');
              });


              // setTimeout(function(){
              //
              //   console.log("Waiting 10 seconds...");
              //
              //
              // }, 20000);
              // setTimeout(function(){
              //   addEdges();
              // }, 1000);



        });
}

function addEdges(){
  console.log("LOCATION: ", loc);
  console.log("*********************************************");
  console.log("*********************************************");
  console.log("GRAPH DATA: ", graphData);
  console.log("*********************************************");
  console.log("*********************************************");
  // console.log("FIRST FIRST ELEMENT: ", graphData[0]);
  id = graphData.length;
  num = graphData.length;
  console.log("CURRENT ID: ", id);
  // for(var i =0; i<22; i++){
  //   console.log("GRAPH AT: ", i, " IS: ", graphData[i]);
  // }
  // console.log("GRAPH DATA: ", graphData);
  finalGraphData = graphData;

  for(var i=0; i<num; i++){
    for(var j=1; j<num; j++){
      if(i != j){
        var obj ={
          id: id++,
          source: i,
          target: j,
          weight: computeDist(graphData[i].address, graphData[j].address)
        }
        
        if(!graphContains(finalGraphData, obj)){
          finalGraphData.push(obj);
        }
      }


    }
  }

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
          id: count,
          address: curLoc,
        };
        graphData.push(obj);
        graphSet.addVertex(count++)
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

  console.log('Inside waitForMe');

  return new Promise(function(resolve, reject){
      if(true){ // Try changing to 'false'
          setTimeout(function(){

              for (var i = 0; i < arr.length; i++) {
                getGeocode(arr[i].address, map, geocoder, i);
              }
              console.log('waitForMe\'s function succeeded');
              resolve();
          }, 2500);
      }
      else{
          setTimeout(function(){
              console.log('waitForMe\'s else block failed');
              resolve();
          }, 2500);
      }
  });
}
