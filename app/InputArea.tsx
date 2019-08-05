import * as React from "react";
import { $StackLayout, $Button, $TextField, $FlexboxLayout, $Label } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { AutofillHintContentType } from "./Extensions";

export default class InputArea extends React.Component{
    TextFieldRef = React.createRef<TextField>();
    defaultStyle = {}
    componentDidMount() {
        console.log("InputArea didMount");
        /*
        this.TextFieldRef.current.className = "input";
        this.TextFieldRef.current.cssClasses.add('input-border');
        */
    }
    render() {
        // console.log("this: " + this);
        // style={{ flexGrow: 1, flexDirection: 'column'}}
        return (
            <$StackLayout>
                <$Button  backgroundColor={new Color('purple')} 
                onLoaded={(ev) => {
                    const b = ev.object as Button;
                    // this.number++;
                    // console.log("n: " + this.text); // *** Terminating app due to uncaught exception 'NativeScript encountered a fatal error: Error: Failed to create Page with entry.create() function.
                    
                }}
                />
                <$Label text={"yooo"}/>
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.name);
                    
                    }}
                    hint={"Namn"}
                    ref={this.TextFieldRef}
                    className={"input"}
                />

                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);
    
                    }}
                    hint={"Efternamn"}
                    className={"input-border"}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);
    
                    }}
                    hint={"Mobilnummer"}
                    className={"input-rounded"}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.email);
    
                    }}
                    hint={"E-postaddress"}
                    className={"label"}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);
    
                    }}
                    hint={"Gatuadress"}
                    className={"input-field"}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);
    
                    }}
                    hint={"Post nr"}
                    className={"input-sides"}
                />
                <$TextField 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.place);
    
                    }}
                    hint={"Ort"}
                />
            </$StackLayout>
        );
    }
    
}
// might use https://github.com/nabil-mansouri/nativescript-nbmaterial/

