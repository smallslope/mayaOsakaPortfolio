LONDON PARKIVE README FILE

Overall Goal: 
To create a map of London that shows information on parks and open spaces on the following topics:

1. Parks that are still open vs parks that no longer exist anymore
2. What decade the parks in London were opened. 
3. Whether parks have been expanded or shrunk over time. 
4. Which parks are currently underthreat from development. 

Data: 
- Collecting data on parks:
    - Find out what parks no longert exist anymore -> This can be achieved by finding old lists of parks and cross referencing them with a Google search. The park can then be located using digitised old maps. (This might not always work)   
    - Find out whether a park's shape has been altered. -> This can be achieved by making comparisons between current maps and old maps. 
    -  When a park was opened. -> There are several websites that have information on the history of parks. Most of the time these websites will mention when a park was opened. 
    - Which parks are currently underthreat from development. -> The London Garden Trust and CPRE London are probably good places to start. 
- Need to get borough boundaries to display on map (I think I can get this from the Ordnance Survey website). 

Design:
- Each park shape could be coloured in to reprasent different things :
    - Whether a park is still open or not and possibly if it is underthreat. 2-3 colours.
    - Whether a park's shape has altered (expanded/shrunk/ unaltered) 3 colours.
    - When a park was opened in 25 year incraments.(Timeframe = between 1850 and 2025s) 8 colours.
Tech:
- We will use Stamens 'Toner Light' basemap for the first prototype. Once a few features have been added I will try using other basemaps to see which ones work best. 
- Map Libre will be  the main GIS JavaScript Library. Having used both Map Libre and Leaflet I think Map Libre will be better for handling large quantities of  data. 

Styling:
Open Parks = #50b848
Closed Parks = #ff4c3f