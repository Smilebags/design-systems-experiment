# Design systems and Custom Elements
This repository is a look into a few design systems (Microsoft's Fluent Design and Google's Material Design) and uses a new JS feature, Custom Elements. It only works correctly in Chrome right  (behind the experimental features flag), since Chrome is the only browser to support both `backdrop-filter` and `custom elements`. 

[See live preview](https://smilebags.github.io/design-systems-experiment)

# Tech
The technology used in this template is as follows
- typescript
- scss
- pug
- gulp
- browsersync

# Development
## `npm start`
`npm start` will start a development server which monitors the tmp folder for changes and refreshes the browser windows using browsersync. The `gulp dev-watch` task handles this.
## `npm run build`
`npm run build` will build the project into the dist folder and start a server to show the project in a ready-to-deploy state. This utilises the `gulp build` task.
## `npm run deploy`
`npm run deploy` will push all changes to the remote locations by running the `gulp deploy` task.
# File Structure
<!-- ## dev
The `dev` folder contains development tools such as the browser sync and local server. This is not needed on the production server and only used during development. It is tracked in version control. -->
## dist
The `dist` folder contains the staged content ready for deploying. The contents of this folder is built using `npm run build`. It is **not** tracked in version control
## src
`src` contains all the source files of the project and the only place where development changes should be made.
## tmp
`tmp` contains the temporary build files for the local browsersync server to watch. It is **not** tracked in version control.