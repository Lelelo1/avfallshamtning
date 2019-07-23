import * as React from "react";
import { $StackLayout, $Label, $TextField, $Button } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { device } from "tns-core-modules/platform/platform";

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
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.name);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.email);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.place);

                    }}
                    style={{ backgroundColor: new Color('silver') }}
                />
            </$StackLayout>
        )
        
    }
    
}

enum AutofillHintContentType {
    name = "name",
    surname = "surname",
    mobileNumber = "mobileNumber",
    email = "email",
    address = "address",
    postalCode = "postalCode",
    place = "place"
}

declare module "tns-core-modules/ui/text-field/text-field" {
    interface TextField {
        setAutofillHintContentType(contentType: AutofillHintContentType);
    }
    // what name should i use?!
    
    // can't use enum when places here from ComponentExample class
}
TextField.prototype.setAutofillHintContentType = function(this: TextField, contentType: AutofillHintContentType) {

    const name = AutofillHintContentType.name;
    const surname = AutofillHintContentType.surname;
    const mobileNumber = AutofillHintContentType.mobileNumber;
    const email = AutofillHintContentType.email;
    const address = AutofillHintContentType.address;
    const postalCode = AutofillHintContentType.postalCode;
    const place = AutofillHintContentType.place;

    switch(contentType) {
        case name: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${name} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${name} textfield`);
            }
            break;
        }
        case surname: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${surname} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${surname} textfield`);
            }
            break;
        }
        case mobileNumber: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${mobileNumber} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${mobileNumber} textfield`);
            }
            break;
        }
        case email: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${email} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${email} textfield`);
            }
            break;
        }
        case address: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${address} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${address} textfield`);
            }
            break;
        }
        case postalCode: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${postalCode} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${postalCode} textfield`);
            }
            break;
        }
        case place: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${place} textfield`);          
            } else if (device.os == "Android") {
                console.log(`setting up android ${place} textfield`);
            }
            break;
        }
        
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