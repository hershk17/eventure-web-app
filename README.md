# Group 1

|   Member Name  | GitHub ID |           Email               |
| ---------------| ---------------|-------------------------------|
| Justin Kim     | kimjust6	  |jkim452@myseneca.ca    	  |
| Tue Nguyen     | TueNguyen2911  |tnguyen187@myseneca.ca 	  |
| Thu Nga Vu	 | tnvu7	  |tnvu7@myseneca.ca   		  |
| Harsh Keswani  | hershk17	  |hkmkeswani@myseneca.ca 	  |



# Project Description

In this project, a safe social media platform to find companions for activities, events, and other points of interests, based on the users’ locations and interests is developed. A point of interest is a location that can hold events. An example of an attraction is a theatre or a restaurant.  
An event is a social gathering that occurs at a location and at a specific time. Events can be available to friends, the public, or by invite only. The language we use is React Native, which allows the mobile application to run natively on Android and iOS devices. Target users include travellers, people interested in group activities, and those that wish to meet new people. 

Some of the most important features are described as follows:

## Finding Events and Points of Interest

The user will be able to search for a location, for example: “Toronto”, to find attractions to visit as well as events nearby. Information such as location name, formatted address, open hours, pictures, and Google reviews will also be available to the user. The user can then find companions to travel with and attend events together. Users will be able to search by tags, event type, and description.

Location and attraction information does not require developer maintenance as information will likely be retrieved from APIs such as;
https://developer.here.com/documentation/places/dev_guide/topics/explore-nearby-places.html <br/>
https://developer.tomtom.com/search-api/search-api-documentation-search/nearby-search

Another potential way to search for events will be by using a map that contains different points of interests (parks, restaurants, landmarks, concerts are a few examples).  
https://developers.google.com/maps/documentation/javascript/local-context/samples/basic

## Creating and Managing Events 

A user can create an event by entering a form including (title, location, event description and a few more data fields) which self-checks for errors. They can also choose a location first and then fill out the form containing other data fields such as date and time, event description, etc. 

A user will be able to manage an event that he or she has created.  This includes updating and deleting the event.  If changes are made to an event, attending users will be notified of the changes that were made.

Events can either be created by users or pre-existing events can be retrieved using the Ticket Master API;
https://developer.ticketmaster.com/products-and-docs/apis/getting-started/

## User-Entity Interaction

This pertains to a user’s interaction with other users, events, and objects in the system.

Users can request to follow other users. If user A requests to follow user B and user A’s request is accepted, then all updates posted by user B would be displayed on user A’s news feed. This would include friends attending an event, reviewing a location, or uploading images. Moreover, user A would also be able to invite user B to any events they create/participate in. 

Once a user finds an event that they would like to join, invites can be sent to users they follow and direct messages can be exchanged with participants to finalize plans. Users can review locations, events, and also other users through a rating and textual feedback system which would be stored on the application’s database.

## Security and Authorization

These features require the app to have an authentication and authorization system in place (different roles such as application user or moderator; each with varying accessibility). 
