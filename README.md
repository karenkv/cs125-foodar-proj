# foodar

>your local food radar for meeting fitness goals as an iOS/Android application

## Motivation

Thinking of what to eat or what to cook can be difficult sometimes. Yelp can be helpful when you know where you want to eat, but it doesn’t consider if people want to cook. Additionally, with the state of the pandemic, eating out at restaurants is dangerous, so we only want to consider restaurants that allow takeout/delivery. Yelp only integrates currently with GrubHub so we want to make sure we also include a wider range of delivery services, such as DoorDash, Postmates, and UberEats.

## Current Solution

The market is full of many apps that track eating and physical activity to help promote a healthy lifestyle. Many of these nutrition and fitness apps recommend exercises and recipes to cook based on user habits, but there has yet to be an app that recommends restaurants that serve healthy user-relevant foods and the relevant delivery services that can deliver food from those restaurants to the user. During COVID-19, one of the biggest ways to support small business is ordering delivery or pickup; not only is this safer than going to get groceries through limiting contact time with other people, it helps parents and students who do not have the time to cook. Therefore, we decided to build a web application that recommends places to eat based on the user’s calorie intake, weight goals, activity levels for the day, location, calories burned. We will collect the user’s calorie intake and weight goals through user input and activity levels for the day and calories burned through their smartphone.

## Technologies

- [React Native](https://reactnative.dev/)
- **REST APIs**:
  * [Google Fit API and SDK](https://developers.google.com/fit)
  * [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
  * [Yelp Fusion API](https://www.yelp.com/developers)
- **Assets**: Fontawesome, [Iconixar](https://www.flaticon.com/authors/iconixar) icons

## Requirements

### Design
* Use Figma, an online collaboration design tool, to create prototypes
    - Figma Mockups: https://www.figma.com/file/ytnFPH4uZjSLHa5pJDoPtR/foodar?node-id=0%3A1
* Use illustrations from websites like [Undraw.co](https://undraw.co/) and [Icons8](https://icons8.com/) to instill a sleek UI

Although we used Figma to create mockups, they served more as inspiration and our final product has some changes!

### Views

#### Login/Sign Up Views
- [X] Login View
- [X] Sign up View
- [X] Save users to Firebase 
- [X] Authenticate users through Firebase 

#### Home View
* [X] iOS Health Kit API integration to show user information and health
* [X] Add meal modal

#### Recommendation/Search View
* [X] Recommend food based on current user location
* [X] Recommend food based on current user diet
* [X] Google Maps API/Geolocation Integration

#### User Profile View
* [X] User view
* [X] User preferences

### Data Collection
* [X] Gather from wearble devices
* [X] Gather from user input
* [X] Gather from food nutrition websites
* [X] Data manipulation

## Authors
Created by [@karenkv](https://github.com/karenkv), [@rebeckur](https://github.com/rebeckur), and [@areeta](https://github.com/areeta) for CS 125 (W21)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
**foodar** is licensed under the Apache 2.0 License.

## Disclaimer
This is not an officially supported UCI product.
