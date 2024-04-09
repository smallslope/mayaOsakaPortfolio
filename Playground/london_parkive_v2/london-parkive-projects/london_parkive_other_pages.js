
//Dropdown Menu Function//
// function myCoolEventHandler(event){
//     console.log('Event data:', event.detail);
//     console.log('kane is cooler than maya');
// }

// document.addEventListener("kaneiscool", myCoolEventHandler);

// // let any_data = {
// //     name: 'dataname'
// // }

// // let myCoolCustomEvent = new CustomEvent("kaneiscool", {
// //     detail: park_data
// // });

// // document.dispatchEvent(myCoolCustomEvent);

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
    var list_view_deduplicated_park_data;
    var lvt_filter_borough_keys;
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

    let borough_keys_data;
    let status_keys_data;
    let period_opened_keys_data;
    let alterations_keys_data;
    let parksShapes;

    let borough_filter_dropdown_content = document.getElementById("borough_Filter_Content");
    let status_filter_dropdown_content = document.getElementById("status_Filter_Content");
    let period_opened_filter_dropdown_content = document.getElementById("period_opened_Filter_Content");
    let alterations_filter_dropdown_content = document.getElementById("alterations_Filter_Content");

    fetch('./data_files/park_shapes_source.json')
    .then((response) => response.json())
    .then(response => {
        parksShapes = response;
        console.log(parksShapes);
        list_view_deduplicated_park_data = parksShapes.features.reduce((accumulator, current) =>{
            if(!accumulator.find((item) => item.properties.name === current.properties.name)){
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        console.log(list_view_deduplicated_park_data);
        const tableProperties = ["name", "borough", "size", "status", "period_opened", "alteration"];
        generateTable(list_view_deduplicated_park_data, tableProperties);


        // let borough_filter_search_bar = createFilterwithSortFilterAndSearch(borough_filter_dropdown_content);
        let borough = "borough";
        borough_keys_data = createFilterKeysData(parksShapes,borough);
        let borough_filter_keys_section = createFilterKeysSection(borough_keys_data, borough, borough_filter_dropdown_content);

        let status = "status";
        status_keys_data = createFilterKeysData(parksShapes,status);
        let status_filter_keys_section = createFilterKeysSection(status_keys_data, status, status_filter_dropdown_content);
        let period_opened = "period_opened";
        period_opened_keys_data = createFilterKeysData(parksShapes,period_opened);
        let period_opened_filter_keys_section = createFilterKeysSection(period_opened_keys_data, period_opened, period_opened_filter_dropdown_content);
        let alterations = "alteration";
        alterations_keys_data = createFilterKeysData(parksShapes,alterations);
        let alterations_filter_keys_section = createFilterKeysSection(alterations_keys_data, alterations, alterations_filter_dropdown_content);
       
       
    });
   

    // var headerMapping = {
    //     "name" : "Name",
    //     "borough" : "Borough",
    //     "size" : "Size (Acres)",
    //     "status" : "Status",
    //     "year_opened" : "Period Opened",
    //     "alteration" : "Alterations"
    // };
    // let thContainerContainer;
    // let thContainer;
    // let lvt_filter_dropdown_container;
    // let filterOptionsContainer;

   

    // function headerFilterIconGenerator(){
    //     var filterIcon = document.createElement("div");
    //     filterIcon.classList.add("filterIcon");
    //     var filterIconLine1 = document.createElement("div");
    //     filterIconLine1.classList.add("filterIconLine1");
    //     filterIcon.appendChild(filterIconLine1);
    //     var filterIconLine2 = document.createElement("div");
    //     filterIconLine2.classList.add("filterIconLine2");
    //     filterIcon.appendChild(filterIconLine2);
    //     var filterIconLine3 = document.createElement("div");
    //     filterIconLine3.classList.add("filterIconLine3");
    //     filterIcon.appendChild(filterIconLine3);
    //     return filterIcon;
    // }

    
    //     const headerRow = document.getElementById('list_view_table_header');
      
    //     for (var key in headerMapping){
    //         var th = document.createElement("th");
    //         headerRow.appendChild(th);
    //         thContainerContainer = document.createElement("div");
    //         thContainerContainer.classList.add("list_view_table_thContainerContainer");
    //         th.appendChild(thContainerContainer);
    //         thContainer = document.createElement("div");
    //         thContainer.classList.add("list_view_table_thContainer");
    //         thContainerContainer.appendChild(thContainer);
    //         thText = document.createElement("div");
    //         thText.textContent = headerMapping[key];
    //         thText.classList.add("list_view_table_header_cell_text");
    //         thContainer.appendChild(thText);
    //         lvt_filter_dropdown_container = document.createElement("div");
    //         lvt_filter_dropdown_container.classList.add("lvt_filter_dropdown_container");
    //         thContainer.appendChild(lvt_filter_dropdown_container);
    //         headerFilterIcon = headerFilterIconGenerator();

    //         filterOptionsContainer = document.createElement("div");
    //         filterOptionsContainer.classList.add("list_view_table_filter_options_container");
    //         switch(thText.textContent){
    //             case "Name":    
    //                 filterOptionsContainer.classList.add("filter_type_sort");
    //                 filterOptionsContainer.id = "name_Filter_Container";
    //                 lvt_filter_dropdown_container.classList.add("id_name");
    //                 headerFilterIcon.classList.add("id_name");
    //             break;
    //             case "Borough":     
    //                 filterOptionsContainer.classList.add("filter_type_sort_filter_with_search");                    
    //                 filterOptionsContainer.id = "borough_Filter_Container";
    //                 filterOptionsContainer.classList.add("id_borough");
    //                 headerFilterIcon.classList.add("id_borough");
    //             break;
    //             case "Size (Acres)" :   
    //                 filterOptionsContainer.classList.add("filter_type_sort_filter");
    //                 filterOptionsContainer.id = "size_Filter_Container";
    //                 filterOptionsContainer.classList.add("id_size");
    //                 headerFilterIcon.classList.add("id_size");
    //             break;
    //             case "Status":  
    //                     filterOptionsContainer.classList.add("filter_type_filter");
    //                     filterOptionsContainer.id = "status_Filter_Container";
    //                     filterOptionsContainer.classList.add("id_status");
    //                     headerFilterIcon.classList.add("id_status");    
    //             break;
    //             case "Period Opened" :    
    //                 filterOptionsContainer.classList.add("filter_type_filter");
    //                 filterOptionsContainer.id = "period_opened_Filter_Container";
    //                 filterOptionsContainer.classList.add("id_period_opened");
    //                 headerFilterIcon.classList.add("id_period_opened");
                                        
    //             break;
    //             case "Alterations" :    
    //                 filterOptionsContainer.classList.add("filter_type_filter");
    //                 filterOptionsContainer.id = "alterations_Filter_Container";
    //                 filterOptionsContainer.classList.add("id_alteration");
    //                 headerFilterIcon.classList.add("id_alteration");
    //             break;
    //             default:
    //             break;
    //         }

            // lvt_filter_dropdown_container.appendChild(headerFilterIcon);
         
            // function filterIconGenerator(){
            //     let icon = document.createElement("img");
            //     icon.classList.add("lvt_filter_icon");
            //     icon.src = "Assets/Icons/filter_icon.svg";
            //     icon.alt = "Filter Icon";
            //     return icon;
            // }
            // function ascendingArrowGenerator(){
            //     let ascendingArrow = document.createElement("div");
            //     ascendingArrow.classList.add("lvt_filter_ascending_arrow");
            //     return ascendingArrow;
            // }
            // function descendingArrowGenerator(){
            //     let descendingArrow = document.createElement("div");
            //     descendingArrow.classList.add("lvt_filter_descending_arrow");
            //     return descendingArrow;
            // }
            // function sortAscendingGenerator(){
            //     let sortAscending = document.createElement("div");
            //     sortAscending.classList.add("lvt_filter_key");
            //     sortAscending.innerHTML = "Sort Ascending";
            //     return sortAscending;
            // }
            // function sortDescendingGenerator(){
            //     let sortDescending = document.createElement("div");
            //     sortDescending.classList.add("lvt_filter_key");
            //     sortDescending.innerHTML = "Sort Dscending";
            //     return sortDescending;
            // }
            // function filterHeaderGenerator(){
            //     let filterHeader = document.createElement("div");
            //     filterHeader .classList.add("lvt_filter_header");
            //     filterHeader .innerHTML = "Filter";
            //     return filterHeader;
            // }
            // function clearFilterGenerator(){
            //     let clearFilter = document.createElement("div");
            //     clearFilter.classList.add("lvt_filter_clear_filter");
            //     clearFilter.innerHTML = "Clear Filter";
            //     return clearFilter;
            // }
            // function filterSearchBarGenerator(){
            //     let searchBar= document.createElement("input");
            //     searchBar.classList.add("lvt_filter_search_bar");
            //     searchBar.type = "search";
            //     searchBar.placeholder = "Search borough...";
            //     return searchBar;
            // }
         
         
            // function sortSectionGenerator(){
            //     let sortSection = document.createElement("div");
            //     sortSection.classList.add("lvt_filter_sort_section");
            //     return sortSection;
            // }
            // function filterWithSearchSectionGenerator(){
            //     let filterWithSearchSection = document.createElement("div");
            //     filterWithSearchSection.classList.add("lvt_filter_filter_with_search_section");
            //     return filterWithSearchSection;
            // }
            // function filterFilterSectionGenerator(){
            //     let filterSection = document.createElement("div");
            //     filterSection.classList.add("lvt_filter_filter_section");
            //     return filterSection;
            // }
    
            // lvt_filter_dropdown_container.appendChild(filterOptionsContainer);
            // let lvt_filter_dropdown_content = filterDropdownContentSectionGenerator();
            // lvt_filter_dropdown_container.appendChild(filterOptionsContainer);
        
        
            // let lvt_filter_icon = filterIconGenerator();
            // let lvt_filter_header = filterHeaderGenerator();
            // let lvt_filter_clear_filter = clearFilterGenerator();
            // let lvt_filter_search_bar = filterSearchBarGenerator();
            // let  lvt_filter_key_name;
    
            // let lvt_filter_ascending_arrow = ascendingArrowGenerator();
            // let lvt_filter_descending_arrow = descendingArrowGenerator();
            // let lvt_filter_sort_ascending = sortAscendingGenerator();
            // let lvt_filter_sort_descending = sortDescendingGenerator();
    
            // let lvt_filter_sort_section = sortSectionGenerator()
            // let lvt_filter_filter_section = filterFilterSectionGenerator();
            // let lvt_filter_filter_with_search_section = filterWithSearchSectionGenerator();

            //STILL USING THE CODE BELOW!!!//
            function filterRowGenerator(){
                let row = document.createElement("div");
                row.classList.add("lvt_filter_content_row");
                return row;
            }
            function checkBoxGenerator(){
                let checkbox = document.createElement("div");
                checkbox.classList.add("lvt_filter_checkbox");
                return checkbox;
            }
            function filterKeyNameGenerator(key){
                let keyName = document.createElement("div");
                keyName.classList.add("lvt_filter_key");
                return keyName;
            }

            let lvt_filter_content_row = filterRowGenerator();
            let lvt_filter_checkbox = checkBoxGenerator();

            function createFilterKeysData(dataSet,key){
                let lvt_filter_keys;
                lvt_filter_keys = dataSet.features.reduce((accumulator, current) =>{
                    if(!accumulator.find((item) => item.properties[key] === current.properties[key])){
                        accumulator.push(current);
                    }
                    return accumulator;
                }, []);
                console.log(lvt_filter_keys);
                return lvt_filter_keys;
            }
            function createFilterKeysSection(keyData, key,container){
                keyData.forEach(feature =>{
                    lvt_filter_content_row = filterRowGenerator();
                    lvt_filter_checkbox = checkBoxGenerator();
                    lvt_filter_content_row.appendChild(lvt_filter_checkbox);
                    lvt_filter_key_name = filterKeyNameGenerator(key);
                    lvt_filter_key_name.innerHTML = feature.properties[key];
                    lvt_filter_content_row.appendChild(lvt_filter_key_name);
                    container.appendChild(lvt_filter_content_row);
                })
            }

            let borough_filter_container = document.getElementById("borough_Filter_Container");
            let name_filter_container = document.getElementById("name_Filter_Container");
            let size_filter_container = document.getElementById("size_Filter_Container");
            let status_filter_container = document.getElementById("status_Filter_Container");
            let period_opened_filter_container = document.getElementById("period_opened_Filter_Container");
            let alterations_filter_container = document.getElementById("alterations_Filter_Container");
           function nameFilterDropdown(){
               if(name_filter_container.style.display === "none"){
                    name_filter_container.style.display = "block";
               }
               else{
                    name_filter_container.style.display = "none";
               }
            }
            function boroughFilterDropdown(){
                if(borough_filter_container.style.display === "none"){
                    borough_filter_container.style.display = "block";
                }
                else{
                    borough_filter_container.style.display = "none";
                }
            }
            function sizeFilterDropdown(){
                if(size_filter_container.style.display === "none"){
                    size_filter_container.style.display = "block";
                }
                else{
                    size_filter_container.style.display = "none";
                }
            }
            function statusFilterDropdown(){
                if(status_filter_container.style.display === "none"){
                    status_filter_container.style.display = "block";
                }
                else{
                    status_filter_container.style.display = "none";
                }
            }
            function periodOpenedFilterDropdown(){
                if(period_opened_filter_container.style.display === "none"){
                    period_opened_filter_container.style.display = "block";
                }
                else{
                    period_opened_filter_container.style.display = "none";
                }
            }
            function alterationsFilterDropdown(){
                if(alterations_filter_container.style.display === "none"){
                    alterations_filter_container.style.display = "block";
                }
                else{
                    alterations_filter_container.style.display = "none";
                }
            }
          
        
        
            // function createFilterwithSortFilterAndSearch(filter_dropdown_content){
            //     lvt_filter_filter_with_search_section = filterWithSearchSectionGenerator();
            //     lvt_filter_content_row = filterRowGenerator();
            //     lvt_filter_icon =  filterIconGenerator();
            //     lvt_filter_header = filterHeaderGenerator();
            //     lvt_filter_clear_filter = clearFilterGenerator();
            //     lvt_filter_content_row.appendChild(lvt_filter_icon);
            //     lvt_filter_content_row.appendChild(lvt_filter_header);
            //     lvt_filter_content_row.appendChild(lvt_filter_clear_filter);
            //     lvt_filter_filter_with_search_section.appendChild(lvt_filter_content_row);
            //     lvt_filter_content_row = filterRowGenerator();
            //     lvt_filter_search_bar = filterSearchBarGenerator();
            //     lvt_filter_content_row.appendChild(lvt_filter_search_bar);
            //     lvt_filter_filter_with_search_section.appendChild(lvt_filter_content_row);
            //     lvt_filter_filter_section = filterFilterSectionGenerator();
            //     lvt_filter_filter_with_search_section.appendChild(lvt_filter_filter_section);
            //     filter_dropdown_content.appendChild(lvt_filter_filter_with_search_section);
            // };
         
            // let keySection;
            // let statusKeys;
            // function sortFilterGenerator(filter_dropdown_content){
            //     lvt_filter_sort_section = sortSectionGenerator();
            //     lvt_filter_content_row.appendChild(lvt_filter_checkbox);
            //     lvt_filter_content_row.appendChild(lvt_filter_ascending_arrow);
            //     lvt_filter_content_row.appendChild(lvt_filter_sort_ascending);
            //     lvt_filter_sort_section.appendChild(lvt_filter_content_row);
            //     lvt_filter_content_row = filterRowGenerator();
            //     lvt_filter_checkbox = checkBoxGenerator();
            //     lvt_filter_content_row.appendChild(lvt_filter_checkbox);
            //     lvt_filter_content_row.appendChild(lvt_filter_descending_arrow);
            //     lvt_filter_content_row.appendChild(lvt_filter_sort_descending);
            //     lvt_filter_sort_section.appendChild(lvt_filter_content_row);
            //     filter_dropdown_content.appendChild(lvt_filter_sort_section);
            // }
            // function filterFilterGenerator(key){
            //     lvt_filter_dropdown_content = filterDropdownContentSectionGenerator();
            //     lvt_filter_filter_section = filterFilterSectionGenerator();
            //     lvt_filter_content_row = filterRowGenerator();
            //     lvt_filter_icon = filterIconGenerator();
            //     lvt_filter_header = filterHeaderGenerator();
            //     lvt_filter_clear_filter = clearFilterGenerator();
            //     lvt_filter_content_row.appendChild(lvt_filter_icon);
            //     lvt_filter_content_row.appendChild(lvt_filter_header);
            //     lvt_filter_content_row.appendChild(lvt_filter_clear_filter);
            //     lvt_filter_filter_section.appendChild(lvt_filter_content_row);
            //     statusKeys = createFilterKeysData(key);
            //     keySection = createFilterKeysSection(statusKeys, key);
            //     lvt_filter_dropdown_content.appendChild(lvt_filter_filter_section);
            // }
          

            // switch(filterOptionsContainer.id){
            //     case "name_Filter_Container":
            //        let nameDropdownContent = sortFilterGenerator();
            //     break;
            //     case "borough_Filter_Container": 
            //         let filterWithSearchSection = createFilterwithSortFilterAndSearch();
            //         let boroughData = createFilterKeysData(borough);
            //         let boroughKeySection = createFilterKeysSection(boroughData, borough);
            //         console.log(boroughData);
            //     break;
            //     case "size_Filter_Container":
            //     break;
            //     case "status_Filter_Container":
            //       let statusDropdownContent = filterFilterGenerator(status);
            //     break;
            //     case "period_opened_Filter_Container":
            //         let periodOpenedDropdownContent = filterFilterGenerator(period_opened);
            //     break;
            //     case "alterations_Filter_Container":
            //         let alterationDropdownContent = filterFilterGenerator(alteration);
            //     break;
            //     default:
            //     break;
            // }
            // lvt_filter_dropdown_container.addEventListener("click", function(e){
            //     console.log(e);
            //     console.log(e.target.classList);

            //     if (e.target.classList.contains("id_name")){
            //         console.log("Name Filter Clicked");
            //         let nameContainer = document.getElementById("name_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("name_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("name_Filter_Container").style.display = "none"; 
            //         }
            //     }
            //     else if(e.target.classList.contains("id_borough")){
            //         console.log("Clicked");
            //         let nameContainer = document.getElementById("borough_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("borough_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("borough_Filter_Container").style.display = "none"; 
            //         }
            //     }
            //     else if(e.target.classList.contains("id_size")){
            //         console.log("Clicked");
            //         let nameContainer = document.getElementById("size_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("size_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("size_Filter_Container").style.display = "none"; 
            //         }
            //     }
            //     else if(e.target.classList.contains("id_status")){
            //         console.log("Clicked");
            //         let nameContainer = document.getElementById("status_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("status_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("status_Filter_Container").style.display = "none"; 
            //         }
            //     }
            //     else if(e.target.classList.contains("id_period_opened")){
            //         console.log("Clicked");
            //         let nameContainer = document.getElementById("period_opened_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("period_opened_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("period_opened_Filter_Container").style.display = "none"; 
            //         }
            //     }
            //     else if(e.target.classList.contains("id_alteration")){
            //         console.log("Clicked");
            //         let nameContainer = document.getElementById("alterations_Filter_Container");
            //         if(nameContainer.style.display == "none"){
            //             document.getElementById("alterations_Filter_Container").style.display = "block";
            //         }
            //         else{
            //             document.getElementById("alterations_Filter_Container").style.display = "none"; 
            //         }
            //     }
            // });
    function generateTable(data, propertiesToShow){
        const tableBody = document.getElementById('list_view_table_body');
        data.forEach(feature =>{
            const row = document.createElement('tr');
            propertiesToShow.forEach(key => {

                if(key === "status"){
                    const statusCell = document.createElement('td');
                    row.appendChild(statusCell);
                    var statusDivContainer = document.createElement("div");
                    statusDivContainer.classList.add("list_view_box_container")
                    statusCell.appendChild(statusDivContainer);
                    var statusDiv  = document.createElement("div");
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
                else if(key === "name"){
                    const parkNameCell = document.createElement('td');
                    row.appendChild(parkNameCell);
                    parkNameCell.innerHTML = feature.properties[key];
                    parkNameCell.addEventListener("click", function navigateToMapPageWrapper(){ navigateToMapPage(feature) });

                }
                else{
                    const cell = document.createElement('td');
                    row.appendChild(cell);
                    cell.innerHTML = feature.properties[key];
                }
            });
            tableBody.appendChild(row);
        });

       
    
      
        
          
       
        // mobileListParkName.addEventListener("click", function navigateToMapPageWrapper(){ navigateToMapPage(feature) });
        function generateMobileListView(data){
            var mobileListContainer = document.getElementById("mobile_table_container");
            data.forEach(feature =>{

                var mobileListParkSection = document.createElement("div");
                mobileListParkSection.classList.add("mobile_list_view_park_container");
                mobileListContainer.appendChild(mobileListParkSection);

                var mobileListParkName = document.createElement("div");
                mobileListParkName.classList.add("mobile_list_view_park_name");
                mobileListParkName.innerHTML = feature.properties.name;
                mobileListParkSection.appendChild(mobileListParkName);
                mobileListParkName.addEventListener("click", function navigateToMapPageWrapper(){ navigateToMapPage(feature) });

                var mobileListParkInfoSection = document.createElement("div");
                mobileListParkInfoSection.classList.add("mobile_list_view_park_info_container");
                mobileListParkSection.appendChild(mobileListParkInfoSection);

                var mobileListRow = document.createElement("div");
                mobileListRow.classList.add("mobile_list_view_row");
                mobileListParkInfoSection.appendChild(mobileListRow);

                var mobileListKey = document.createElement("p");
                mobileListKey.classList.add("mobile_list_view_key");
                mobileListKey.innerHTML = "Borough(s):";
                mobileListRow.appendChild(mobileListKey);

                var mobileListBox = document.createElement("div");
                mobileListBox.classList.add("mobile_list_view_info_box");
                mobileListRow.appendChild(mobileListBox);

                var mobileListValue = document.createElement("p");
                mobileListBox.classList.add("mobile_list_view_value");
                mobileListValue.innerHTML = feature.properties.borough;
                mobileListBox.appendChild(mobileListValue);
                
                mobileListRow = document.createElement("div");
                mobileListRow.classList.add("mobile_list_view_row");
                mobileListParkInfoSection.appendChild(mobileListRow);

                mobileListKey = document.createElement("p");
                mobileListKey.classList.add("mobile_list_view_key");
                mobileListKey.innerHTML = "Size (Acres:";
                mobileListRow.appendChild(mobileListKey);

                mobileListBox = document.createElement("div");
                mobileListBox.classList.add("mobile_list_view_info_box");
                mobileListRow.appendChild(mobileListBox);

                mobileListValue = document.createElement("p");
                mobileListBox.classList.add("mobile_list_view_value");
                mobileListValue.innerHTML = feature.properties.size;
                mobileListBox.appendChild(mobileListValue);

                mobileListRow = document.createElement("div");
                mobileListRow.classList.add("mobile_list_view_row");
                mobileListParkInfoSection.appendChild(mobileListRow);

                mobileListKey = document.createElement("p");
                mobileListKey.classList.add("mobile_list_view_key");
                mobileListKey.innerHTML = "Status:";
                mobileListRow.appendChild(mobileListKey);

                mobileListBox = document.createElement("div");
                mobileListBox.classList.add("mobile_list_view_info_box");
                switch(feature.properties.status){
                    case "Open": mobileListBox.style.backgroundColor = status_open_color;
                    break;
                    case "Defunct": mobileListBox.style.backgroundColor = status_defunct_color;
                    break;
                    case "Under Threat": mobileListBox.style.backgroundColor = status_under_threat_color;
                    break;
                    case "Unknown": mobileListBox.style.backgroundColor = unknown_color;
                    break;
                    default: mobileListBox.style.backgroundColor = "cyan";
                  
                }
                mobileListRow.appendChild(mobileListBox);

                mobileListValue = document.createElement("p");
                mobileListBox.classList.add("mobile_list_view_value");
                mobileListValue.innerHTML = feature.properties.status;
                mobileListBox.appendChild(mobileListValue);

                mobileListRow = document.createElement("div");
                mobileListRow.classList.add("mobile_list_view_row");
                mobileListParkInfoSection.appendChild(mobileListRow);

                mobileListKey = document.createElement("p");
                mobileListKey.classList.add("mobile_list_view_key");
                mobileListKey.innerHTML = "Year Opened:";
                mobileListRow.appendChild(mobileListKey);

                mobileListBox = document.createElement("div");
                mobileListBox.classList.add("mobile_list_view_info_box");
                switch(feature.properties.period_opened){
                    case "Before 1850": mobileListBox.style.backgroundColor = yo_before1850_color;
                    break;
                    case "1850-1874": mobileListBox.style.backgroundColor = yo_1850to1874_color;
                    break;
                    case "1875-1899": mobileListBox.style.backgroundColor = yo_1850to1874_color;
                    break;
                    case "1900-1924": mobileListBox.style.backgroundColor = yo_1900to1924_color;
                    break;
                    case "1925-1949": mobileListBox.style.backgroundColor = yo_1925to1949_color;
                    break;
                    case "1950-1974": mobileListBox.style.backgroundColor = yo_1950to1974_color;
                    break;
                    case "1975-1999": mobileListBox.style.backgroundColor = yo_1975to1999_color;
                    break;
                    case "2000-2024": mobileListBox.style.backgroundColor = yo_2000to2024_color;
                    break;
                    case "Unknown": mobileListBox.style.backgroundColor = unknown_color;
                    break;
                    default: mobileListBox.style.backgroundColor = "cyan";
                    break;
                }
                mobileListRow.appendChild(mobileListBox);

                mobileListValue = document.createElement("p");
                mobileListBox.classList.add("mobile_list_view_value");
                mobileListValue.innerHTML = feature.properties.period_opened;
                mobileListBox.appendChild(mobileListValue);

                mobileListRow = document.createElement("div");
                mobileListRow.classList.add("mobile_list_view_row");
                mobileListParkInfoSection.appendChild(mobileListRow);

                mobileListKey = document.createElement("p");
                mobileListKey.classList.add("mobile_list_view_key");
                mobileListKey.innerHTML = "Alterations:";
                mobileListRow.appendChild(mobileListKey);

                mobileListBox = document.createElement("div");
                mobileListBox.classList.add("mobile_list_view_info_box");
                switch(feature.properties.alteration){
                    case "Unchanged": mobileListBox.style.backgroundColor = status_open_color;
                    break;
                    case "Expanded": mobileListBox.style.backgroundColor = alterations_expanded_color;
                    break;
                    case "Shrank": mobileListBox.style.backgroundColor = status_defunct_color;
                    break;
                    case "Unknown": mobileListBox.style.backgroundColor = unknown_color;
                }
                mobileListRow.appendChild(mobileListBox);

                mobileListValue = document.createElement("p");
                mobileListBox.classList.add("mobile_list_view_value");
                mobileListValue.innerHTML = feature.properties.alteration;
                mobileListBox.appendChild(mobileListValue);
                
                var seperationLine = document.createElement("hr");
                seperationLine.classList.add("mobile_list_view_line");
                mobileListParkSection.appendChild(seperationLine);

            });
        };
        generateMobileListView(list_view_deduplicated_park_data);
    };
};
function navigateToMapPage(park_data){
    console.log(park_data);
    window.localStorage.setItem("list_view_clicked_park", JSON.stringify(park_data));
    window.localStorage.setItem("map_access_mode", "from_list_view");
    var baseurl = window.location.pathname;
    var spliturl = baseurl.split("lp_list_page.html");
    var targeturl = spliturl[0] + "london_parkive.html";
    console.log(targeturl);
    var targetHref = window.location.origin + targeturl;
    console.log(targetHref);
    window.open(targetHref, "_self");
}
function searchBarFilter(){
    var input, filter, table, tr, td, i, txtValue;
    if(screen.width < 900){
        input = document.getElementById("list_view_search_bar");
        filter = input.value.toUpperCase();
        table = document.getElementById("mobile_table_container");
        tr = document.getElementsByClassName("mobile_list_view_park_container");
        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByClassName("mobile_list_view_park_name")[0];
            if (td){
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    else{
        input = document.getElementById("list_view_search_bar");
        filter = input.value.toUpperCase();
        table = document.getElementById("london_parkive_list_view");
        tr = table.getElementsByTagName("tr");
        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName("td")[0];
            if (td){
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
