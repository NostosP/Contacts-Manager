# Contacts-Manager

Contact manager implemented with Typescript, Html and CSS with the Ionic 4 framework.

## Implementation

This app consists of 4 different views:
- Home: main view, contains the list of all the contacts saved. It allows the user to text-search for a particular contact, order the contact list by fields or filter the list by tags (Fig. 1).
- New Contact: allows the user to create and save a new contact (Fig. 2).
- Contact Page: allows the user to see the contact's info, delete the contact or modify it (Fig. 3).
- Modify Contact: allows the user to modify some (or all) contact's info and save the changes (Fig. 4).

Fig. 1            |  Fig. 2
:-------------------------:|:-------------------------:
![](https://github.com/NostosP/Contacts-Manager/blob/master/imgs/home.png "Fig. 1")  |  ![](https://github.com/NostosP/Contacts-Manager/blob/master/imgs/newContact.png "Fig. 2")

Fig. 3            |  Fig. 4
:-------------------------:|:-------------------------:
![](https://github.com/NostosP/Contacts-Manager/blob/master/imgs/contactPage.png "Fig. 3")  |  ![](https://github.com/NostosP/Contacts-Manager/blob/master/imgs/modifyContact.png "Fig. 4")

The Model View Controller (MVC) pattern is implemented natively in Ionic. In the src/app folder there are the 4 folders (home, contact, new-contact and modify-contact) containing the 4 views and their respective controllers (in each folder the views are NAME.page.html and NAME.page.scss, the controllers are NAME.page.ts).

The models folder contains the class contact.ts with which a contact is modelled; the services folder contains the service contact.service.ts which has the function of operating CRUD operations on the database and passing data to the controllers and viceversa.

I used the Ionic module Storage as it provides an easy way to store key/value pairs and JSON objects. Storage uses a variety of storage engines underneath, picking the best one available depending on the platform: when running in a native app context, Storage will prioritize using SQLite, when running in the web or as a Progressive Web App, Storage will attempt to use IndexedDB, WebSQL, and localstorage, in that order.

## Requirements

The latest versions of Node.js and npm are required to install Ionic 4. 
To install Ionic use the command **npm install -g ionic**.
See https://ionicframework.com/docs/installation/cli for more info.

## Run the project

To start the app:
- from terminal go to the directory in wich you have downloaded the project
- run the command **npm install**
- run the command **ionic serve --lab**


