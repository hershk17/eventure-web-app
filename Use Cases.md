# Group 1

|   Member Name  | GitHub ID |           Email               |
| ---------------| ---------------|-------------------------------|
| Justin Kim     | kimjust6	  |jkim452@myseneca.ca    	  |
| Tue Nguyen     | TueNguyen2911  |tnguyen187@myseneca.ca 	  |
| Thu Nga Vu	 | tnvu7	  |tnvu7@myseneca.ca   		  |
| Harsh Keswani  | hershk17	  |hkmkeswani@myseneca.ca 	  |



# Use Cases

## Use case 1: User Joins an Event

1. Author: Thu Nga Vu (Natalie)
2. Short Description of the System Use Case
This use case supports user to join an event
3. Actor(s) 
App user (traveler)
Credit card company
4. System Use Case Preconditions
User is logged into their account
5. System Use Case Successful Post Conditions
User successfully joins for an event and optionally pays for it
6. Applicable Business Rules
Users must be at least 18 years old.
Users must have a valid account with > 4.0 rating.

### Main Flow

|  | Actor(s): App user | System |
| -------------  | ------------- | ------------- |
| 1 | Enter a location (*1) | Use API to display a list of attractions and display available events at the given location. |
| 2 | Swipe down to browse the result list of events. | Display more |
| 3 | Click on an event  | Display the details of the event including: name, date and time, description, organizer, number of spaces left |
| 4 | Add Event to cart (*2) | Notify the user with the successful action (i.e. increase the number in the cart icon, move the event to cart) |
| 5 | User hits “View Cart” (*3)  |  Display a cart page with “Back” option or “Checkout” (*4) |
| 6 | User hits “Checkout” | Display a secured checkout page. (*5) |
| 7 | Enter credit card number, expiry date, CCV | Validate transaction. Display the event(s) details to the screen and suggest similar events or attractions. Send a confirmation email to the user. |

### Alternate Flows

|  | Alternative Flow | Description |
|-------------|-------------|-------------|
|A1| User chooses to enable current location and search events near me | System identify current location of user, use API to display the attractions and available events |
|A2| Go back to browse for other events | Display the results where it was last browsed |
|A3| User continues browsing | Display the results where it was last browsed |
|A4| Hit “Back” | Display the results where it was last browsed |
|A5| The event is free | Display the event(s) details to the screen |



## Use Case 2: User Creates an Event

1. Author: Harsh K

2. Short Description of the System Use Case

   This use case describes how App Users can create/organize events.

3. Actor(s) 

   App User

4. System Use Case Preconditions

   App User has logged in using their account.

5. System Use Case Successful Post Conditions

   App User successfully creates/organizes an event.

6. Applicable Business Rules

   1. App Users can set entry fees for an event.
   2. Entry fees are charged only once the event begins.
   3. App Users cannot cancel events 24 hours prior to their start time.
   4. App Users can only create events once every 6 hours.
   5. Event visibility can either be public or invite only.
   6. App Users can only invite users they follow when creating an event.
   7. App Users must be at least 18 years old to create an event.

### Main Flow

| Number | Actor(s): App User | System |
| -------------  | ------------- | ------------- |
| 1 | Requests to create an event | Event Creation Page is displayed with various event information fields and user is first asked to enter a location. |
| 2 | User enters a location for the event to take place | Location API is used to receive location information and requests verification of destination. |
| 3 | Verifies location | Updates event information and provides empty form for custom event description including event name, description, entry fee, visibility, user limit, rules, hashtags, photos, and other additional details. |
| 4 | Enters all required information                    | Verifies input requirements and displays a calendar to choose an available start date and time. |
| 5 | Selects date and time | Updates event information and allows the event creator to invite users they follow or proceed with event creation. |
| 6 | Requests to proceed with event creation | Displays complete information and requests for final verification. |
| 7 | Verifies event | Saves event information and creates a record in database, posts event to user's profile and follower's news feed and becomes available to join by other users depending on its visibility. |

### Alternate Flows

|  | Alternative Flow | Description |
|-------------|-------------|-------------|
|A1| Events were created and completed previously                 | Checks if events were previously created and asks whether the user would like to repost an earlier event with updated information. |
|A2| App User wants to invite other users to the event | Users that the event creator follows are displayed in a list to be selected for receiving invites to the event once created. |
|A3| User decides to cancel event creation | The user is asked to either draft or delete the information permanently. |
|A4| User enters an invalid location | No results are displayed and the user is asked to enter a valid location. |
|A5| User does not fill the required inputs or inputs contain invalid characters when creating the event | The missing fields are highlighted and the user is asked to recheck the entered information. |



## Use Case 3: User reviews events that he has checked in 

1. Author: Tue Nguyen

2. Short Description of the System Use Case
  A user can choose an event he has checked in to leave a review

3. Actor(s) 
  App User 

4. System Use Case Preconditions
  User has logged in 

5. System Use Case Successful Post Conditions
  A review is created

6. Applicable Business Rules

   

### Main Flow

| Number | Actor(s): App User | System |
| -------------  | ------------- | ------------- |
| 1 | Opens app | Directs user to home page |
| 2 | (A1) (A2) (A3)  User chooses an checked-in event| Sends back a page with event’s details |
| 3 | User requests to review chosen event | A box will appear on top of the event’s details page including a textbox and radio buttons for star rating and a submit button |
| 4 | User requests to submit review | Checks for errors in the form (A4) |
| 5 | 				| A review is created and referenced to the event, the review will also appear on followers’ news feed |

### Alternate Flows

|  | Alternative Flow | Description |
|-------------|-------------|-------------|
|A1| User uses the search bar to search for an event | Events with the key words will appear, checked-in events will be marked as checked-in |
|A2| User searches for a location and chooses an event happened at the location | Events that user had checked-in will be marked as checked-in |
|A3| User goes to his home page and clicks “Checked-in events” button | A list of checked-in events will appear |
|A4| There is error(s) in the form | Shows error messages at the incorrect field(s) and brings user back to step 4 |



## Use Case 4: User Sets Up their Traveler Profile

1. Author: Justin Kim

2. Short Description of the System Use Case
  User will complete their profile by adding their user information in order to 

3. Actor(s) 
  App User

4. System Use Case Preconditions
  App user has registered an account, but has not already set up their profile.

5. System Use Case Successful Post Conditions
  App user has successfully set up their traveler profile and can join events.

6. Applicable Business Rules

   

### Main Flow

| Number | Actor(s): App User | System |
| -------------  | ------------- | ------------- |
| 1 | User goes to their profile page | Shows that user’s profile is incomplete |
| 2 | User selects set up traveler profile | Request information such as town user lives in, travel preferences, and previous travelled locations |
| 3 | User inputs profile information | System checks that information is in a valid format and if the formatting is correct, the system will save the information (A1) |
| 4 | Requests user to input a profile picture | If picture is too large, the system will resize it and save it (A2) |

### Alternate Flows

|  | Alternative Flow | Description |
|-------------|-------------|-------------|
|A1| The information formatting is invalid | The information that is formatted incorrectly will be highlighted in red boxes so that the user can fix the information |
|A2| File is not an image | Request the user to use to select a different file that is an image |