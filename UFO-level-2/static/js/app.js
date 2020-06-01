// Load variables
//$('#datetimepicker1').datetimepicker();


var TableData = data;
console.log('Load table');
var tbody = d3.select("#ufo-table > tbody");
// Get date selection


renderHTML(TableData);

d3.select("#filter-btn").on("click",FilterTable);

getCountries();
getStates();
getCities();
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
    // Update number of results
    d3.select("#noResults").text(dataUFO.length)
}

// Filter and render the HTML table
function FilterTable(){
    var DateTime = d3.select("#date").property("value");
    var state = d3.select("#state_form").property("value");
    var city = d3.select("#city").property("value");
    var shape = d3.select("#shape").property("value");
    var duration = d3.select("#duration").property("value");
    var c = [];
    var countries = d3.selectAll('input.country_class');
    countries.each(function(n){ 
        if(d3.select(this).attr("type") == "checkbox") {
            d3.select(this).node().checked = true;
            c.push(d3.select(this).property("id"))
        }
      });
    
    var filterData = [];

    console.log("Values:");
    console.log(DateTime);
    console.log(state);
    console.log(city);
    console.log(shape);
    console.log(duration);
    
    // At least one parameter in the search filter
    if(DateTime.length > 0 || 
       state.length > 0 || 
       city.length > 0 || 
       shape.length > 0 || 
       duration.length > 0) {
           
        filterData = TableData.filter(function (ufo){ 
            return  (ufo.datetime == DateTime
                    || ufo.state == state
                    || ufo.city == city
                    || ufo.shape == shape
                    || ufo.durationMinutes == duration); 
       });
        renderHTML(filterData);
    }
    else
    {
        filterData = TableData;
        renderHTML(filterData)
    }
    
}


function getCities(){
    var uniqueCities = []
    var cities = TableData.map(ufo => ufo.city)
    uniqueCities = cities.filter((value, index) => cities.indexOf(value)=== index);
}

function getStates(){
    var uniqueStates = []
    var states = TableData.map(ufo => ufo.state)
    uniqueStates = states.filter((value, index) => states.indexOf(value)=== index);
    var countrySelector = d3.select("#filters");
    countrySelector.append("input").
                    attr("class","form-control").
                    property("type","text").
                    property("id","state");
                    
}

function getCountries(){
    var uniqueCountries = []
    var countries = TableData.map(ufo => ufo.country)
    uniqueCountries = countries.filter((value, index) => countries.indexOf(value)=== index);

    var countrySelector = d3.select("#country");

    uniqueCountries.forEach(function(country)
    {
        var item = countrySelector.append("li").attr("class","filter list-group-item");        
        item.append("input").
            attr("class","country_class").
            property("type","checkbox").
            property("id",country).
            property("name","countries");
            //property("checked",true);
        item.append("label").
            attr("for",country).
            text(country);
    })
}

function getShapes(){
    var uniqueShapes = []
    var shapes = TableData.map(ufo => ufo.shape)
    uniqueShapes = shapes.filter((value, index) => shapes.indexOf(value)=== index);
}

function getDuration(){
    var uniqueDuration = []
    var durations = TableData.map(ufo => ufo.durationMinutes)
    uniqueDuration = durations.filter((value, index) => durations.indexOf(value)=== index);
}