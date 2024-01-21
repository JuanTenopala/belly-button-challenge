// Load the dataset
d3.json("samples.json").then(function(data){
    console.log(data);

// Populate the dropdown menu with the subject ID's
let dropdownMenu = d3.select("#selDataset");
data.names.forEach(function(name){
    dropdownMenu.append("option").text(name).property("value", name);
});

// Function to create plots
function plots(name_value){
    let name_a = data.samples.find(name_o => parseInt(name_o.id) == name_value);
    let hover = name_a.otu_labels;

    let bar_y = name_a.otu_ids.map(d => "OTU" + d.toString());
    let bar_x = name_a.sample_values;
    let bar_a = [{
        type: "bar",
        x: bar_x.slice(0, 10).reverse(),
        y: bar_y.slice(0, 10).reverse(),
        text: hover.slice(0, 10).reverse(),
        orientation: "h",
    }];

    let bubble_x = name_a.otu_ids;
    let bubble_y = name_a.sample_values;
    let bubble_a = [{
        x: bubble_x,
        y: bubble_y,
        text: hover,
        mode: "markers",
        marker: {
            size: bubble_y,
            color: bubble_x
        }
    }];

    // Update dempgraphic information
    let metadata = data.metadata.find(meta => parseInt(meta.id) === parseInt(name_value));
    if (metadata){
        updateDemographicTable(metadata);
    }
    

    Plotly.newPlot("bar", bar_a);
    Plotly.newPlot("bubble", bubble_a);
}

// Function to format the demographic information into a table
function updateDemographicTable(metadata){
    let tableHtml = '<table class="table table-bordered">';
    for (let names in metadata) {
        tableHtml += `<tr><td>${names}</td><td>${metadata[names]}</td></tr>`
    }
    tableHtml += '</table>';
    document.getElementById("sample-metadata").innerHTML = "Demographic info: " + tableHtml;
}

plots(data.names[0]);

dropdownMenu.on("change", function(){
    let selectedID = dropdownMenu.property("value");
    plots(selectedID);
});
});