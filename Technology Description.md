# Group 1

|   Member Name  | GitHub ID |           Email               |
| ---------------| ---------------|-------------------------------|
| Justin Kim     | kimjust6	  |jkim452@myseneca.ca    	  |
| Tue Nguyen     | TueNguyen2911  |tnguyen187@myseneca.ca 	  |
| Thu Nga Vu	 | tnvu7	  |tnvu7@myseneca.ca   		  |
| Harsh Keswani  | hershk17	  |hkmkeswani@myseneca.ca 	  |



# Technology Description

## Software Architecture Layout

### Visual Paradigm

We will use [Visual Paradigm](https://www.visual-paradigm.com/) for designing the architecture of the system. Using Visual Paradigm, we will create the user flows and domain class diagrams. 

### Figma

From the domain class diagrams, we will begin designing the user interface. [Figma](https://www.figma.com/) is another useful tool that we can use. Figma is a website that allows us to design a demo application, demo all the potential user’s stories. To deliver a good user experience, we will take into account many factors such as color scheme, easy navigation, and persistent components. Using our Figma demo application as a reference, we can work on coding the front-end application more efficiently.  This allows each of the members to work on a single UI page as well as know what the expected outcome should be.

Demo of Figma: https://www.figma.com/proto/5iCHGJgxlQih7jrh9wq7P0/Prototyping-in-Figma?node-id=0%3A78&scaling=scale-down&page-id=0%3A1

## Coding Language

### React Native

[React Native](https://reactnative.dev/) allows developers to have one code base that supports both Android and IOS platforms. Since we have already learned how to use React for our web programming course last semester, we should have a better understanding of how to implement certain features. 

### Backend Services

#### Firebase

[Firebase](https://firebase.google.com/) is a backend as a service mobile platform developed by Google.  It will allow us to quickly set up and securely access the database. In addition to this, we will be using firebase for authentication and authorization.  

#### APIs

Some potential APIS we may use in order to populate points of interest in our application:  
1. [Google Maps API](https://developers.google.com/maps)
2. [Google Places API](https://cloud.google.com/maps-platform/places)
3. [Google LocalContextMapView](https://developers.google.com/maps/documentation/javascript/local-context/samples/basic)
4. [OpenStreetMap](https://www.openstreetmap.org)
5. [HERE Places (Search) API](https://developer.here.com/documentation/places/dev_guide/topics/what-is.html)
6. [TomTom Search API and Extended Search API](https://developer.tomtom.com/search-api)

Google Maps and Google Places are the most promising APIs, as they are able to provide points of interest as well as their location. The main issue with the Google APIs is that they are very expensive per API call. <br />

The Google LocalContextMapView shows the user an interactive map to drag & click allowing for manual location selection and to view detailed information. Example: <br />
<img src="https://user-images.githubusercontent.com/62819902/121831789-636a3e80-cc96-11eb-82c4-5a79b0345a34.png" alt="localContextMapViewImg" width="700"/>

Currently, the OpenStreetMap does not seem to provide the same level of detail that the Google APIs provide, so we will need to look into OpenStreetMap API more closely to see if it is a suitable replacement. <br />

The HERE Places API also allows viewing Points of Interest based on user location. An example request & response: <br />
<img src="https://user-images.githubusercontent.com/62819902/121831667-040c2e80-cc96-11eb-8a7a-433604d32eea.png" alt="requestImg" width="700"/>
<img src="https://user-images.githubusercontent.com/62819902/121831561-bd1e3900-cc95-11eb-8b3f-dfaea0cd6cfc.png" alt="responseImg" width="600"/>

The TomTom Search API and Extended Search API is another API similar to the HERE Places API and allows for nearby POI search, Fuzzy searches and Autocomplete. 

#### Various APIs are in consideration during the planning phase and more research and testing is required to determine what is best suited for our application use case. Factors such as speed of calling APIs, receiving responses, their accuracy, as well relevancy of details to the application will be accounted for.
