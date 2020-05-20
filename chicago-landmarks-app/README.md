# Chicago Landmarks App

==================================

## Description
The Chicago Landmarks App allows you to search the Chicago Open Data Portal for historical landmarks by year they were built. In addition to showing a list of names, you will have the option to see other relevant info on each landmark (i.e. architect, designation date, address) by clicking on the landmark name itself. There are a few easter eggs thrown in, so have fun!

## Link to App
[Chicago Landmarks App](https://btaz21.github.io/chicago-landmarks-app/)

## Installation
No installation necessary as this app runs straight from the browser.
Tested on: Chrome for macOS: 81.0.4044.138, Brave for macOS

## Roadmap
Some limitations of this project include a dataset that is not particularly robust. With more data comes more functionality. Things I'd like to have:  
*links for the architects that could open wikipedia iframe*  
*images added to the dataset so that they can populate on pages*  
*random facts about the historical landmark (also needed in dataset)*  
*would like that after the b/w image is clicked on, more info is displayed about the building. Not difficult to implement, but would like to condense some of these actions into functions that could be easily slipped in*  
*You can type in a letter and the app will begin to populate, but with no data. Should make it so that the input field only accepts numbers*  

## API
[Link to the Chicago Data Portal](https://data.cityofchicago.org/)  
[Link to specific JSON dataset](https://data.cityofchicago.org/resource/tdab-kixi.json)

## Technologies Used
Javascript, HTML, CSS, Ajax, Jquery

## Easter Eggs
1. Typing in a date after the current year will redirect to an image carousel proposing what the future may look like. The current year is set to a global variable that will change automatically as each year passes. This should help to preserve the functionality of the app in the future.
2. Typing in a date before 1833 (date of earliest known Chicago building) will redirect to a modal that gives you a basic history lesson.
3. Clicking on the b/w image will show you the name of the building in the image with the gold tower.   

## Issues

1. **Getting iframes to connect within page**  
-Some websites do not allow you to embed iframes in your own site. I would have liked to open up the flickr commons or some other image heavy site.

2. **Passing in search queries to the iframes so that it opens directly to the page and not a search results list**  
In settings > search engine > manage search engines in google chrome, they provide a list of links and their query URLs. I was able to pop in the url and just remove the "%s", then pass in the name of the landmark.

3. **Getting pages to scroll down**  
This just required a little digging, but looks like I was able to use two jquery functions called offset() and scrollTo().

4. **Making sure that event listeners are turned off on new clicks**  
On all event listeners, I made sure to empty out the necessary HTML elements using jquery

5. **Getting @media query to work**  
Looks like some phones will zoom in when an input field is clicked and change the width field. To prevent that, I discovered a few different solutions [here](https://www.warrenchandler.com/2019/04/02/stop-iphones-from-zooming-in-on-form-fields/), opting to change the meta tag in the HTML. This appeared to fix the issue of responsiveness on mobile as well. Before changing the meta tag, the mobile css was not responsive on my phone (although on my laptop at the appropriate pixel size, yes)

6. **Page not refreshing to top**  
Unresolved issue, seems to be an issue with my browser specifically?

7. **Data is a little messy and needs some cleaning**  
The landmark designation dates were in ISO format, so I had to manipulate that data a bit so that it would just give me the year. The one issue I'm still having trouble with is landmarks with multiple build years (i.e. 1938-39). I was able to get something started and it will populate, but it only works when there aren't other dates in the data with that start date. There are some other cases of messy data. For example, the architect listed for the Noble-Seymour-Crippen House (1833) is "addit 1863, Architects Unknown". There are a number of one-off things like this that might be tricky to clean through js and better just to edit through the dataset itself.


## References

All images from the site are either my own or come from the Flickr commons.

[Info an architectural styles by era](http://www.phmc.state.pa.us/portal/communities/architecture/styles/mid-19th-century.html)  
[How to add iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)  
[Using the substr method in javascript](https://www.w3schools.com/jsref/jsref_substr.asp)  
[Getting the current date/year in Javascript](https://www.w3schools.com/jsref/jsref_getfullyear.asp?fbclid=IwAR0v4yMWMQdQ1tdPREJu5CuJwlLbKPcXRccymrBMOzEZ12Kx1hQ9BrbxZ5I)  
[How to create color gradients on text](https://w3bits.com/rainbow-text/)   
[How to create sticky nav bars](https://www.youtube.com/watch?v=N6bqSR1oLlc)  
[How to refresh a page using javascript](https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click)  
[Resolving media query issues and the zoom function on input forms with iphones](https://stackoverflow.com/questions/17344339/media-query-not-working-in-mobile-works-fine-in-chrome)    
[Creating pop-up modal boxes](https://sabe.io/tutorials/how-to-create-modal-popup-box)  
