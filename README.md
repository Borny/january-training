# january-training

[Click here to check the app!](https://january-training.firebaseapp.com "Januaray training App")

- About
- Web
- Install
- PWA
- Lazy Loading
- SSR
- Animations

## About
This project is a small Angular WebApp to keep track of training activities over the month of january.  
### Front 
Angular version 8.2.13.

### Back
Firebase is used to store the data

### Hosting
Firebase is also used for hosting

## Web
(https://january-training.firebaseapp.com)

## Install 
git clone https://github.com/Borny/january-training.git

## PWA
The app can be installed on a desktop or mobile device when visiting the url using the Chrome navigator.  
It can be then used offline to check the main page. The detail page will not work as it requires an internet connection to load the desired card.

## Lazy loading
Lazy loading is used to load the required modules on demand, it will not load the entire app when first visiting the url

## SSR
The app is using Server Side Rendering to make it load faster on mobile and helps with SEO

## Animations
Angular animations are used to have a nice transition between views(Home and Card Detail).
It is also used to display the cards one by one with a stagger effect.