// Load variables
//$('#datetimepicker1').datetimepicker();


var TableData = data;
console.log('Load table');
var tbody = d3.select("#ufo-table > tbody");

renderHTML(TableData);

d3.select("#filter-btn").on("click",FilterTable);
getCities();
getStates();
getCountries();
getShapes();
getDuration();



/* ================== Functions ================== */

// Render the HTML table with data
function renderHTML(dataUFO){
    // restart HTMl content 
    var originalBody = tbody.html("");
    // Create HTML table structure for each row
    dataUFO.forEach(function(ufo){
        // Create a row
        var row = tbody.append("tr")
        Object.entries(ufo).forEach(([key,value]) => {
            // Add all properties inside td element
            row.append("td").text(value);
        });
    });
}

// Filter and render the HTML table
function FilterTable(){
    // Get date selection
    var DateTime = d3.select("#datetime").property("value");

    if(DateTime.length == 0){
        console.log('Empty filter');
        renderHTML(TableData);
    }
    else
    {
        console.log("Filter: " + DateTime);
        var filterData = TableData.filter((ufo) => {
            return ufo.datetime == DateTime;
        });
        renderHTML(filterData)
    }
    
}


function getCities(){
    console.log(TableData.lenght)
    var uniqueCities = []
    var cities = TableData.map(ufo => ufo.city)
    uniqueCities = cities.filter((value, index) => cities.indexOf(value)=== index);
    console.log(uniqueCities);
}

function getStates(){
    console.log(TableData.lenght)
    var uniqueStates = []
    var states = TableData.map(ufo => ufo.state)
    uniqueStates = states.filter((value, index) => states.indexOf(value)=== index);
    console.log(uniqueStates);
}

function getCountries(){
    console.log(TableData.lenght)
    var uniqueCountries = []
    var countries = TableData.map(ufo => ufo.country)
    uniqueCountries = countries.filter((value, index) => countries.indexOf(value)=== index);
    console.log(uniqueCountries);
}

function getShapes(){
    console.log(TableData.lenght)
    var uniqueShapes = []
    var shapes = TableData.map(ufo => ufo.shape)
    uniqueShapes = shapes.filter((value, index) => shapes.indexOf(value)=== index);
    console.log(uniqueShapes);
}

function getDuration(){
    console.log(TableData.lenght)
    var uniqueDuration = []
    var durations = TableData.map(ufo => ufo.durationMinutes)
    uniqueDuration = durations.filter((value, index) => durations.indexOf(value)=== index);
    console.log(uniqueDuration);
}