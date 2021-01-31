// from data.js
var tableData = data;

//Identify table
var tbody = d3.select('#ufo-tbody');

//Function to generate a table and append records.

//Call the function
function buildTable(data){
  data.forEach((rowData) => {
    var row = tbody.append("tr");
    Object.entries(rowData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
      });
    });    
}

//View the table contents
buildTable(tableData)
console.log(tableData);

function filterTable(){
  // Create a copy of tableData specifically for filtering
  var filteredData = tableData;

  // capture value for all search fields */
  var datetime = d3.select('#datetime').property('value');
  var city = d3.select('#city').property('value');
  var state = d3.select('#state').property('value');
  var country = d3.select('#country').property('value');
  var shape = d3.select('#shape').property('value');

  // Build an object of fields to run through 
  var filterFields = {
      'datetime': datetime,
      'city': city,
      'state': state, 
      'country': country,
      'shape': shape
  }

   // Remove empty keys from the list of filters to search
   Object.entries(filterFields).forEach(([key, val]) => {
        
    // Use !val to check for empty strings or nulls
    if(!val) { 
        delete filterFields[key];
    }
});

    // Loop through each of the filter keys and return records from filteredData that match 
    Object.entries(filterFields).forEach(([key, value]) => {
      // Continue to refine the filteredData array 
      filteredData = filteredData.filter(row => row[key] == value);
    });    

  // Clear out the tbody
  tbody.html('');

  // Rebuild the filtered table using the buildTable function 
  buildTable(filteredData);    
}

// Identify web elements on the page
btn = d3.select('#filter-btn');
datetimefield = d3.select('#datetime')

// Add event listeners to the web elements
btn.on('click', filterTable);
datetimefield.on('change', filterTable);

// Attach an event listener to the fields attached to the .filter class 
d3.selectAll('.filter').on('change', filterTable);

// Call the function to initially load the table
buildTable(tableData);





