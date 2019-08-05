import * as React from "react";
import { $StackLayout, $Label, $TextField, $Button } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { device } from "tns-core-modules/platform/platform";

import InputArea from './InputArea';
// import { StackLayout, Button, TextField } from "react-nativescript/dist/client/ElementRegistry";

export default class ComponentExample extends React.Component {
    /*
    stackLayoutRef = React.createRef<StackLayout>();
    buttonRef = React.createRef<Button>();
    */
    buttonRef = React.createRef<Button>();
    componentDidMount() {
        /*
        console.log("did mount succesfully");
        // both native ios components are undefined...
        console.log("stackLayout " + this.stackLayoutRef.current.ios);
        console.log("and button: " + this.buttonRef.current.ios);
        */
        
    }

    render() {
        return <InputArea />
    }
    
}






// console.log(`hello ${y} yo`); <- works

// textContentTypes
/* https://developer.apple.com/documentation/uikit/uitextcontenttype?language=objc */
// autofiltlHints
// https://developer.android.com/reference/android/view/View.html#setAutofillHints(java.lang.String...) 

/* 
   the number in TextField(2) when printing components is the number (of any component)
  - unrelated to the type its seems
*/
/* ref={(ref) => {
                    // Intending on assigning ref to instance variable to use inside componentDidMount
                    console.log("buttonRef: " + ref); // <-- does print: 'stackRef: StackLayout(2)'
                    // crash
                }}
                />
                */

    // react-nativescript ref: (JSX attribute) React.ClassAttributes<Page>.ref?: React.LegacyRef<Page>)
    // react-native typescript ref: (JSX attribute) React.ClassAttributes<View>.ref?: string | ((instance: View | null) => void) | React.RefObject<View> | null | undefined