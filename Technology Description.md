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

We will use Visual Paradigm for designing the architecture of the system. Using Visual Paradigm, we will create the user flows and domain class diagrams. 

### Figma

From the domain class diagrams, we will begin designing the user interface. Figma is another useful tool that we can use. Figma is a website that allows us to design a demo application, demo all the potential user’s stories. To deliver a good user experience, we will take into account many factors such as color scheme, easy navigation, and persistent components. Using our Figma demo application as a reference, we can work on coding the front-end application more efficiently.  This allows each of the members to work on a single UI page as well as know what the expected outcome should be.

Demo of Figma: https://www.figma.com/proto/5iCHGJgxlQih7jrh9wq7P0/Prototyping-in-Figma?node-id=0%3A78&scaling=scale-down&page-id=0%3A1

## Coding Language

### React Native

React Native allows developers to have one code base that supports both Android and IOS platforms. Since we have already learned how to use React for our web programming course last semester, we should have a better understanding of how to implement certain features. 

### Backend Services

#### Firebase

Firebase is a backend as a service mobile platform developed by Google.  It will allow us to quickly set up and securely access the database. In addition to this, we will be using firebase for authentication and authorization.  

#### APIs

We will be using the following APIs in order to populate points of interest in our application:  
1. Google Maps
2. Google Places
3. OpenStreetMap 
4. HERE Places (Search) API
5. TomTom Search API and Extended Search API
6. Google LocalContextMapView

Currently Google Maps and Google Places are the most promising APIs, as they are able to provide points of interest as well as their location. The main issue with the Google APIs is that they are very expensive per API call. Currently, the OpenStreetMap does not seem to provide the same level of detail that the Google Apis provide, so we will need to look into OpenStreetMap API more closely to see if it is a suitable replacement. 
