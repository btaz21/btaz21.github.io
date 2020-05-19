### Chicago Landmarks App
============================

The Chicago Landmarks App allows you to search the Chicago Open Data Portal for historical landmarks by year they were built. In addition to showing a list of names, you will have the option to see other relevant info on each landmark (i.e. architect, designation date, address) by clicking on the landmark name. There are a few easter eggs thrown in, so have fun!

Installation Instructions:


API
https://data.cityofchicago.org/

Link to site:
https://btaz21.github.io/chicago-landmarks-app/


##Issues
-------
#Getting iframes to connect within page.
-Some websites do not allow you to embed iframes in your own site.

-Finding a way to pass in a search query to these iframes so that it opens directly to the page you want and not just a search query. In settings > search engine > manage search engines in google chrome, they provide a list of links and their query URLs. I was able to pop in the url and just remove the "%s", then pass in the name of the landmark.

-Getting pages to scroll down

-Making sure that event listeners are turned off on new clicks.

-Getting @media query to work on my phone, despite pixel size being correct
Looks like some phones will zoom in when an input field is clicked and change the width field. To prevent that, I discovered a few different solutions here:
https://www.warrenchandler.com/2019/04/02/stop-iphones-from-zooming-in-on-form-fields/
<meta charset="utf-8" name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

-Page not refreshing to top
**unresolved issue, seems to be an issue with my browser specifically**

-Having to clean up the data
ex. landmark designation date


Things to think about adding in future

Things that were accounted for:
Making sure currentYear was a global variable that could change.


#References:

-All images from the site are either my own or come from the Flickr commons.

[Reference #1]: http://www.phmc.state.pa.us/portal/communities/architecture/styles/mid-19th-century.html
[Reference #2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
[Reference #3]: https://www.w3schools.com/jsref/jsref_substr.asp
[Reference #4]: https://www.w3schools.com/jsref/jsref_getfullyear.asp?fbclid=IwAR0v4yMWMQdQ1tdPREJu5CuJwlLbKPcXRccymrBMOzEZ12Kx1hQ9BrbxZ5I
[Reference #5]: https://stackoverflow.com/questions/21530274/format-for-a-url-that-goes-to-google-image-search
[Reference #6]: https://w3bits.com/rainbow-text/
[Reference #7]: https://www.youtube.com/watch?v=N6bqSR1oLlc
[Reference #8]: https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click
[Reference #9]: https://stackoverflow.com/questions/17344339/media-query-not-working-in-mobile-works-fine-in-chrome
[Reference #10]: https://sabe.io/tutorials/how-to-create-modal-popup-box
