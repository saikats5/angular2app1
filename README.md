# angular2app1

Angular is a javascript framework which allows you to create reactive Single-page-applications(SPAs)

AngularJS -> Angular1
Angular -> Angular2,4,5,6

npm install -g @angular/cli@latest
ng new my-first-app
ng serve

npm install --save bootstrap

change the css config on angular.json and then styles for bootstrap

platformBrowserDynamic().bootstrapModule(AppModule); bootstrap angular application //main.ts
bootstrap: [AppComponent] in app.module.ts //list all the components

Angular changes DOM in runtime

@element //decorator

@angular/core provides basic angular features
@NgModule declarations to add all component so that it can be bundled properly using webpack and transpiled by typescripr else it will unable to transpile it from typescript and ceate a module of all components

ng generate component servers
ng g c servers