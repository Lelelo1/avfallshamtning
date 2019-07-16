import * as React from "react";
import { $StackLayout, $Label, $TextField, $Button } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { StackLayout, Button } from "react-nativescript/dist/client/ElementRegistry";

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
        return (
            <$StackLayout>
                <$Button text="test" backgroundColor={new Color('purple')} 
                onLoaded={(ev) => {
                    console.log("ev iz: " + ev.object);
                    const b = ev.object as Button;
                    console.log('ios bu: ' + b.ios);
                }}        
                />
                
            </$StackLayout>
        )
    }

    /* ref={(ref) => {
                    // Intending on assigning ref to instance variable to use inside componentDidMount
                    console.log("buttonRef: " + ref); // <-- does print: 'stackRef: StackLayout(2)'
                    // crash
                }}
                />
                */

    // react-nativescript ref: (JSX attribute) React.ClassAttributes<Page>.ref?: React.LegacyRef<Page>)
    // react-native typescript ref: (JSX attribute) React.ClassAttributes<View>.ref?: string | ((instance: View | null) => void) | React.RefObject<View> | null | undefined
}