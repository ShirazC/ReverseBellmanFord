
$(document).ready(function(){
$('#file-upload').change(function() {
    var filepath = this.value;
    var m = filepath.match(/([^\/\\]+)$/);
    var filename = m[1];
    $('#filename').html(filename);
    $('#file-upload').parse({
      config: {
          delimiter: "auto",
          complete: displayHTMLTable,
        },
      before: function(file, inputElem)
        {
          console.log("Parsing file...", file);
        },
      error: function(err, file)
        {
        console.log("ERROR:", err, file);
        },
      complete: function(res)
        {
        console.log("Done with all files");
        // displayHTMLTable(res);
        }
    });
});

function displayHTMLTable(results){
    // var table = "<table class='table'>";
    var data = results.data;
    var tabData = [];
    
     
    for(i=0;i<data.length;i++){
      // table+= "<tr>";
      var row = data[i];
      var cells = row.join(",").split(",");
       
      // for(j=0;j<cells.length;j++){
      //   table+= "<td>";
      //   table+= cells[j];
      //   table+= "</th>";



      // }
      var obj = {
      'name' : cells[0],
      'address' : cells[1],
      'city' : cells[2],
      'state' : cells[3],
      'seats' : 0
    }
      tabData.push(obj);
      // table+= "</tr>";
      
    }
    // table+= "</table>";
    // $("#parsed_csv_list").html(table);



    var table = new Tabulator("#example-table", {
        data: tabData,
        layout:"fitDataFill",
        paginationSize: 100,
        // height:"311px",
        columns:[
        {title:"Name", field:"name", align:"center"},
        {title:"Address", field:"address", align:"center", sorter:"number"},
        {title:"City", field:"city", align:"center"},
        {title:"State", field:"state", align:"center"},
        {title:"Driver", field:"driver", formatter:"tickCross",formatterParams:{
          color:["green", "black"]
        },
          align:"center", sorter:"boolean", editor:true},
        {title:"Number of Seats", field:"seats", editor: true, align:"center"},
        ],
    });
  }

  });

