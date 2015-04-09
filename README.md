# yoso-styles

[![wercker status](https://app.wercker.com/status/32c4f483810a29acbf08c1684adec8b7/m "wercker status")](https://app.wercker.com/project/bykey/32c4f483810a29acbf08c1684adec8b7)

A SASS/CSS module providing basic layout and design for modern Apps build with angular or ember generated with [yoso-gulp](https://github.com/doroppu/yoso-gulp) or webpack or browserify. 

Integrates best with [yoso-gulp](https://github.com/doroppu/yoso-gulp)

### Install
```bash
$ npm install yoso-styles --save-dev
```

### Usage
There are options to implement yoso-styles. First one is to inject is as it is, without customisation. In this case require the package in your application.
```javascript
    require('yoso-styles');
 ```
 
 The second option is to add it to your SASS style definitions. Here you can customize the yoso-style settings, overriding the variables.    
 style.scss
 ```scss
     @import('yoso-styles/source/config');
     // override the variables here
     @import('yoso-styles/source/styles');
  ```
 