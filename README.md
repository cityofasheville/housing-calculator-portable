# Homeownership Calculator (Portable version)

This project was initially developed for use with the City of Asheville website. The initial implementation was one dependent upon the website's WordPress context. This is a slightly adapted version meant to work in a more standalone way.

## Setup and configuration

To use this calculator in a standalone way, you can copy the public folder to any web accessible location and open index.html. If you need to modify the values used by the calculator, you can modify those values in the default config file.

## Prerequisites

Note that this application assumes the presence of certain third-party resources. You can examine what those resources are in the index at HTML file located in the public folder. Namely, this application expects bootstrap (v 4.6), popper, and jQuery, as well as React. A Font Awesome kit is also included to allow the use of icons (e.g. the info tooltip trigger).

## Modifying the application

If you need to modify this application (i.e. edit its source), you will need to first install the required dependencies and rebuild the output from your modified source.

### Install dependencies

You will first need to have Node.js installed. Within the project directory (at the same level as the package.json file), run the following command:

`npm install`

### Dev mode

To run the application locally and watch for changes to source files, run:

`npm start`

This runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### Build

When you're ready to rebuild the app for deployment, run the following command:

`npm run build`

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed.
