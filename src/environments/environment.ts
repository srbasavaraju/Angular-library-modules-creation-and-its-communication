// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  settings: {
    debugging: true,
    spvService: 'https://singlepatientviewapi-acsdev.us-east.philips-healthsuite.com',
    configService: 'https://configuration-acsdev.us-east.philips-healthsuite.com',
    spvEndpoints: {
      patientInfo: '/api/PatientInfo/getPatientInfo',
      panelsInfo: '/api/PanelInfo/getPanelInfo',
      spvInfo: '/api/Spv/getSpvInfo',
      accessToken: '/api/Configuration/getToken'
    },
    configEndpoints: {
      panelsConfig: '/api/Configuration/system',
    },
    defaultLanguage: 'en',
    defaultDateFormat: 'MM-DD-YYYY',
    defaultDateTimeFormat: 'hh:mm A MM-DD-YYYY',
    serverDateFormat: 'YYYY-MM-DD',
    serverDateTimeFormat: 'YYYY-MM-DD hh:mm a'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 //import 'zone.js/dist/zone-error';  // Included with Angular CLI.
