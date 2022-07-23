// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: ' http://localhost:3000',
  firebaseConfig : {
    apiKey: "AIzaSyARkEO2P014-Rxlbyicbx-MmR9QwL3VL-s",
    authDomain: "fooddelivery-98ead.firebaseapp.com",
    projectId: "fooddelivery-98ead",
    storageBucket: "fooddelivery-98ead.appspot.com",
    messagingSenderId: "384335581730",
    appId: "1:384335581730:web:cdafa7374a8011ac33f07b"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
