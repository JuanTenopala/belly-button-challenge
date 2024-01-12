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
    let name_a = data.sample.find(name_o => parseInt(name_o.id) == name_value);
    let hover = name_a[0].otu_labels;

    let bar_y = name_a[0].otu_ids.map(d => "OTU" + d.toString());
    let bar_x = name_a[0].sample_values;
    let bar_a = [{
        type: "bar",
        x: bar_x.slice(0, 10).reverse(),
        y: bar_y.slice(0, 10).reverse(),
        text: hover.slice(0, 10).reverse(),
        orientation: "h",
    }];

    let bubble_x = name_a[0].otu_ids;
    let bubble_y = name_a[0].sample_values;
    let bubble_a = [{
        x: bubble_x,
        y: bubble_y,
        text: hover,
        mode: "markers",
        marker: {
            size: bubble_y,
            color: bubble_x
        }
    }]

    Plotly.newPlot("bar", bar_a);
    Plotly.newPlot("bubble", bubble_a);
}

plots(data.names[0]);

dropdownMenu.on("change", function(){
    let selectedID = dropdownMenu.property("value");
    plots(selectedID);
});
});