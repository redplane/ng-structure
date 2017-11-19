## ng-structure

Description:

 * This is a simple structure of an AngularJS application. This project is integrated with Webpack for files bundling & live reload.
 * Language supported : ES2015.

Online demo can be found [here](http://localhost:8000/#!/):

#### Project structure.
```
.
+-- src
+-- app
|   +-- assets
|   +-- constants
|   +-- directives
|   +-- modules
|   +-- app.css
|   +-- app.js
+-- index.html (Index file)
```

#### Structure description.
- ```assets``` : Static files (such as: *.css, *.json, ...) should be stored in this folder.
- ```constants```: Appliation constant files should be stored in this folder (such as: app-settings.constant.js, urlStates.constant.js, ...). Naming convention: *.constants.js.
- ```directives```: Application directives should be stored in this folder (such as: people-picker.directive.js, document-picker.directive.js, ...). Naming convention: *.directive.js.
- ```modules```: Application main modules should be stored in this folder (such as: account-management.module.js, category-management.module, ...). Naming convention: *.module.js.
- ```app.css```: Application global style.
- ```app.js```: Application entry script file.
- ```index.html```: Application entry html file.

### Project commnands.
- `npm run build`: Bundle and publish project files. Files which are generated will be placed inside `dist` folder.
- `npm run start`: Bundle and start watching project. This is for development stage. Browser will be reloaded automatically when changes are detected.
- 
### Bugs report.
- While using this plugin, if you find any errors, please create issues at [project page](https://github.com/redplane/ng-structure)


