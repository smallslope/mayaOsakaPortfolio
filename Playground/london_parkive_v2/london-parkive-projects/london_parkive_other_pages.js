
//Dropdown Menu Function//

function dropdownMenu(x) {
    let dropdownBackground = document.getElementById("dropdown_background");
    if (dropdownBackground.style.display === "flex"){
        dropdownBackground.style.display = "none";
    }
    else{
        dropdownBackground.style.display = "flex";
    };
    let navOptions = document.getElementById("nav_container");
    if(navOptions.style.display === "flex"){
        navOptions.style.display = "none";
    }
    else{
        navOptions.style.display = "flex";
    }
    x.classList.toggle("changeDropdown");
};
if(document.title ==="London Parkive List"){
    var parksShapes;

    //Color Variables//
    var unknown_color = "#C0C0C0";

    var status_open_color = "#50b848";
    var status_defunct_color = "#ff4c3f";
    var status_under_threat_color = "#fee400";
  
    var yo_before1850_color = "#FA2DFF";
    var yo_1850to1874_color = "#FD70FF";
    var yo_1875to1899_color = "#FEC7FF";
    var yo_1900to1924_color = "#00A3FF";
    var yo_1925to1949_color = "#45BBFD";
    var yo_1950to1974_color = "#A2DEFF";
    var yo_1975to1999_color = "#D1EEFF";
    var yo_2000to2024_color = "#AAA30D";

    var alterations_expanded_color = "#62d0fb";
    
     
    
    fetch('./data_files/park_shapes_source.json')
    .then((response) => response.json())
    .then(response => {
        parksShapes = response;
        console.log(parksShapes);
        const tableProperties = ["name", "borough", "size", "status", "period_opened", "alteration"];
        generateTable(parksShapes, tableProperties);
    });
    var headerMapping = {
        "name" : "Name",
        "borough" : "Borough",
        "size" : "Size (Acres)",
        "status" : "Status",
        "year_opened" : "Period Opened",
        "alteration" : "Alterations"
    };
    function generateTable(data, propertiesToShow){
        const headerRow = document.getElementById('list_view_table_header');
        for (var key in headerMapping){
            var th = document.createElement("th");
            th.textContent = headerMapping[key];
            headerRow.appendChild(th);
        }
        const tableBody = document.getElementById('list_view_table_body');
        data.features.forEach(feature =>{
            const row = document.createElement('tr');
            propertiesToShow.forEach(key => {

                if(key === "status"){
                    const statusCell = document.createElement('td');
                    row.appendChild(statusCell);
                    var statusDivContainer = document.createElement("div");
                    statusDivContainer.classList.add("list_view_box_container")
                    statusCell.appendChild(statusDivContainer);
                    var statusDiv = document.createElement("div");
                    statusDiv.innerHTML = feature.properties[key];
                    statusDiv.classList.add("list_view_box");
                    switch(feature.properties[key]){
                        case "Open": statusDiv.style.backgroundColor = status_open_color;
                        break;
                        case "Defunct": statusDiv.style.backgroundColor = status_defunct_color;
                        break;
                        case "Under Threat": statusDiv.style.backgroundColor = status_under_threat_color;
                        break;
                        case "Unknown": statusDiv.style.backgroundColor = unknown_color;
                        default: 
                        break;
                    }
                    statusDivContainer.appendChild(statusDiv);
                }
                else if(key === "period_opened"){
                    const periodOpenedCell = document.createElement('td');
                    row.appendChild(periodOpenedCell);
                    var periodOpenedDivContainer = document.createElement("div");
                    periodOpenedDivContainer.classList.add("list_view_box_container");
                    periodOpenedCell.appendChild(periodOpenedDivContainer);
                    var periodOpenedDiv = document.createElement("div");
                    periodOpenedDiv.innerHTML = feature.properties[key];
                    periodOpenedDiv.classList.add("list_view_box");
                    switch(feature.properties[key]){
                        case "Before 1850": periodOpenedDiv.style.backgroundColor = yo_before1850_color;
                        break;
                        case "1850-1874": periodOpenedDiv.style.backgroundColor = yo_1850to1874_color;
                        break;
                        case "1875-1899": periodOpenedDiv.style.backgroundColor = yo_1850to1874_color;
                        break;
                        case "1900-1924": periodOpenedDiv.style.backgroundColor = yo_1900to1924_color;
                        break;
                        case "1925-1949": periodOpenedDiv.style.backgroundColor = yo_1925to1949_color;
                        break;
                        case "1950-1974": periodOpenedDiv.style.backgroundColor = yo_1950to1974_color;
                        break;
                        case "1975-1999": periodOpenedDiv.style.backgroundColor = yo_1975to1999_color;
                        break;
                        case "2000-2024": periodOpenedDiv.style.backgroundColor = yo_2000to2024_color;
                        break;
                        case "Unknown": periodOpenedDiv.style.backgroundColor = unknown_color;
                        break;
                        default: periodOpenedDiv.style.backgroundColor = "cyan";
                        break;
                    }
                    periodOpenedDivContainer.appendChild(periodOpenedDiv);
                }
                else if(key === "alteration"){
                    const alterationsCell = document.createElement("td");
                    row.appendChild(alterationsCell);
                    var alterationsDivContainer = document.createElement("div");
                    alterationsDivContainer.classList.add("list_view_box_container");
                    alterationsCell.appendChild(alterationsDivContainer);
                    var alterationsDiv = document.createElement("div");
                    alterationsDiv.innerHTML = feature.properties[key];
                    alterationsDiv.classList.add("list_view_box");
                    switch(feature.properties[key]){
                        case "Unchanged": alterationsDiv.style.backgroundColor = status_open_color;
                        break;
                        case "Expanded": alterationsDiv.style.backgroundColor = alterations_expanded_color;
                        break;
                        case "Shrank": alterationsDiv.style.backgroundColor = status_defunct_color;
                        break;
                        case "Unknown": alterationsDiv.style.backgroundColor = unknown_color;
                    }
                    alterationsDivContainer.appendChild(alterationsDiv);
                }
                else{
                    const cell = document.createElement('td');
                    row.appendChild(cell);
                    cell.innerHTML = feature.properties[key];
                }




                // const cell = document.createElement('td');
                // row.appendChild(cell);
                // var statusDiv = document.createElement("div");
                // statusDiv.classList.add("list_view_box");
                //     switch(feature.properties.status){
                //         case "Open":statusDiv.classList.add("list_view_status_open");        
                //         break;
                //         case "Defunct": statusDiv.classList.add("list_view_status_defunct");
                //         break;
                //         case "Under Threat": statusDiv.classList.add("list_view_status_under_threat");
                //         break;
                //         case "Unknown": statusDiv.classList.add("list_view_status_unknown");
                //         break;
                //         default: statusDiv.classList.add("list_view_box");
                //         break;
                //     };
              
                // statusDiv.innerHTML = feature.properties[key];
                // cell.appendChild(statusDiv);
            });
            tableBody.appendChild(row);
        });
        // data.features.forEach(feature => {
        //     const row = document.createElement('tr');
        //     propertiesToShow.forEach(key =>{
        //         const cell = document.createElement('td');
        //         if(feature.properties[key]=== "status"){
        //            const statusDiv = cell.createElement('div');
        //            statusDiv.classList.add("list_view_status_box");
        //            statusDiv.innerHtml = feature.properties[key];
        //            row.appendChild(cell);
        //            cell.appendChild(statusDiv);

        //         }
        //         else{
        //             cell.textContent = feature.properties[key];
        //             row.appendChild(cell);

        //         }
        //     });

           
        // });
       
    };
}
else if(document.title === "London Parkive About"){

}






