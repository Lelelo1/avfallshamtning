// <reference path="../node_modules/react-nativescript/dist/index.d.ts" />

/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
/*
declare var module: any;
if(module.hot){
    // self accept.
    module.hot.accept(
        function(error: any) {
            console.error(`Error in accepting self update for app.ts.`, error);
        }
    );
}
(global as any).__DEV__ = false;
*/

import * as React from "react";
import * as ReactNativeScript from "react-nativescript";

/* HMR no longer supprted
import HotApp, { rootRef } from "./AppContainer";
ReactNativeScript.start(React.createElement(HotApp, {}, null), rootRef);
*/

import AppContainer, { rootRef } from './AppContainer';
ReactNativeScript.start(React.createElement(AppContainer, {}, null), rootRef);

 // module.hot.addStatusHandler(status => {
    //     console.log(`Change in status for app.ts.`, status);
    // });

/* Controls react-nativescript log verbosity. true: all logs; false: only error logs. */

// import HotApp, { rootRef } from "./testComponents/hotApp"
// const rootRef = React.createRef<any>(); can't give to AppContainer via HotApp hot()


/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/

/* running tns run ios generates js files for each ts/tsx file.
 They can be removed. -> run with: 
 tns run ios --bundle --syncAllFiles --device 919ead2494a426d628884a9cc72e611613836d25
 */

// create android emulator https://docs.nativescript.org/tooling/android-virtual-devices