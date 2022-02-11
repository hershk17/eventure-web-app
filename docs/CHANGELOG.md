# Change log

All notable changes to this project will be documented in this file.

## [1.2.1] - 2/4/2022

### Added

- Reworked form to add location picking
- Added human readable address and two interfaces: TomtomAddress and TomtomLocation
- Added delete event functionality
- Edit and Delete buttons now only show to organizers
- Improving event-create
- Added first and last name to events details
- Added some functionality to edit button. Edit button brings up the create-events window

### Fixed

- Fixed formatting of time on cards on home view
- Fixed event location when creating the event
- Fixing register page not showing properly
- Fixed to event freeformAddress instead of postal code

## [1.2.0] - 2/4/2022

### Added

- Create event form
- Upload event/images functions
- Added join events functionality
- Added initial draft for edit event functionality
- Added initial draft for delete event functionality

## [1.1.1] - 8/12/2021

### Added

- Deployment logic for firebase + appetize
- Exporting app into apk
- Saving user's info to Firestore database
- Reset password

### Changed

- Landing page

## [0.1.1] - 8/12/2021

### Added:

- Migrated to Angular Ionic.
- Services for login + register.
- Login + register forms.
- Route guard to prevent users from navigating to unauthorized routes.
- Services for getting events data.
- Landing page.
- POI search.
- All events page.
- Event details page.
- Basic profile page.

### Removed:

- React Native codebase using Expo CLI
