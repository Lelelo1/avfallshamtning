import * as React from "react";
import { $StackLayout, $Label, $TextField, $Button } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";

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
        return (
            <$StackLayout>
                <$Button text="test" backgroundColor={new Color('purple')} 
                onLoaded={(ev) => {
                    const b = ev.object as Button;

                }}        
                onTap={(ev) => {
                    android.w
                }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        /*
                        const iosTextField = textField.ios as UITextField;
                        iosTextField.placeholder = "yoo its ios";
                        console.log("textField ios: " + textField.ios);
                        */
                        const androidTextField = textField.android as android.widget.EditText;
                        androidTextField.setText("I am android");
                        // 
                        /*
                        textField.setAutofillHintContentType(null);
                        */
                    }}
                    onTap={(event) => {
                        
                        console.log("tapped: " + event);
                        const textField = event.object as TextField;

                        /*
                        textField.setAutofillHintContentType(AutofillHintContentType.email);
                        */
                       // android.widget.ed
                       // console.log("androidTextField: " textField.android as EditText)
                    }}
                />
            </$StackLayout>
        )
        
    }
    
}

enum AutofillHintContentType {
    name = 1,
    surname = 2,
    mobileNumber = 3,
    email = 4,
    address = 5,
    postalCode = 6,
    place = 7,
}

declare module "tns-core-modules/ui/text-field/text-field" {
    interface TextField {
        setAutofillHintContentType(contentType: AutofillHintContentType);
    }
    // what name should i use?!
    
    // can't use enum when places here from ComponentExample class
}
TextField.prototype.setAutofillHintContentType = function(this: TextField, contentType: AutofillHintContentType) {
    console.log("contentType: " + contentType);
    console.log("this: " + this);
    switch(contentType) {
        case AutofillHintContentType.name: {
            console.log("name");
            // if android or if ios
            /*
            const iosTextField = this.ios as UITextField;
            iosTextField.placeholder= "IOSSSS";
            */
            //const androidTextField = this.
            // const androidTextField this.android = 
            /*
            if(iosTextField) {

            } else if(this is )
            */
            break;
        }
        case AutofillHintContentType.surname: {
            console.log("surname");
            break;
        }
        case AutofillHintContentType.mobileNumber: {
            break;
        }
        case AutofillHintContentType.email: {
            break;
        }
        case AutofillHintContentType.address: {
            
            break;
        }
        case AutofillHintContentType.postalCode: {
            console.log("postalCode");
            break;
        }
        case AutofillHintContentType.place: {
            break;
        }
    }
    
}

// textContentTypes
/* https://developer.apple.com/documentation/uikit/uitextcontenttype?language=objc */
// autofiltlHints
// https://developer.android.com/reference/android/view/View.html#setAutofillHints(java.lang.String...) 



/* ref={(ref) => {
                    // Intending on assigning ref to instance variable to use inside componentDidMount
                    console.log("buttonRef: " + ref); // <-- does print: 'stackRef: StackLayout(2)'
                    // crash
                }}
                />
                */

    // react-nativescript ref: (JSX attribute) React.ClassAttributes<Page>.ref?: React.LegacyRef<Page>)
    // react-native typescript ref: (JSX attribute) React.ClassAttributes<View>.ref?: string | ((instance: View | null) => void) | React.RefObject<View> | null | undefined