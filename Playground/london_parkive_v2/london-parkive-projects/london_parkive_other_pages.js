
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
    
    fetch('./data_files/park_shapes_source.json')
    .then((response) => response.json())
    .then(response => {
        parksShapes = response;
        console.log(parksShapes);
        const tableProperties = ["name", "borough", "size", "status", "year_opened", "alteration"];
        generateTable(parksShapes, tableProperties);
    });

    function generateTable(data, propertiesToShow){
        const headerRow = document.getElementById('list_view_table_header');
       propertiesToShow.forEach(key =>{
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        const tableBody = document.getElementById('list_view_table_body');
        data.features.forEach(feature => {
            const row = document.createElement('tr');
            propertiesToShow.forEach(key =>{
                const cell = document.createElement('td');
                cell.textContent = feature.properties[key];
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
       
    };
}
else if(document.title === "London Parkive About"){

}







