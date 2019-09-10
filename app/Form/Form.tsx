import * as React from "react";
import { $StackLayout, $Button, $TextField, $FlexboxLayout, $Label } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { AutofillHintContentType } from "../Extensions";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { FlexboxLayout, TextField } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "@nstudio/nativescript-cardview";
import "../Styles";
import "./FormStyles";

import { PercentLength } from "tns-core-modules/ui/page/page";
export default class Form extends React.Component<{},{}>{
    stackLayoutRef = React.createRef<StackLayout>();
    
    private nameTextFieldRef = React.createRef<TextField>();
    private surnnameTextFieldRef = React.createRef<TextField>();
    private mobileNumberTextFieldRef = React.createRef<TextField>();
    private emailTextFieldRef = React.createRef<TextField>();
    private addressTextFieldRef = React.createRef<TextField>();
    private postalCodeTextFieldRef = React.createRef<TextField>();
    private placeTextFieldRef = React.createRef<TextField>();

    
    componentDidMount() {
        console.log("Form didMount: " + this.stackLayoutRef.current);
        
        // ios.
        // ios.delegate.textFieldShouldChangeCharactersInRangeReplacementString(ios, NSRange(interop.Pointer), "");
        const container = this.stackLayoutRef.current;
    }

     build(parent: StackLayout): CardView {
        // https://www.nativescript.org/blog/adding-a-material-design-cardview-to-a-nativescript-app
        const form = this.stackLayoutRef.current;

        parent.removeChild(form);
        const cardView = new CardView();
        cardView.content = form;

        cardView.applyStyle();
        cardView.shadowOffsetHeight = 2;
        cardView.shadowOffsetWidth = 1;
        /*
        cardView.margin = 10;
        cardView.borderBottomWidth = 4;
        */
        parent.addChild(cardView);
        /*
        cardView.margin = 10;
        cardView.borderWidth = 4;
        cardView.borderLeftWidth = 10;
        */
        //parent.addChild(cardView);
        
        return cardView;
    }
    getUserInfo() {
        
        const surname = this.surnnameTextFieldRef.current;
        console.log("focuz: " + surname.ios);
        surname.focus();
        const ios = surname.ios as UITextField;
        
    }
    render() {
        // console.log("this: " + this);
        // style={{ flexGrow: 1, flexDirection: 'column'}}
        console.log("reeender");
        return (
            <$StackLayout
                ref={this.stackLayoutRef}
                className={"form"}
                backgroundColor={new Color("#fdfff0")}
            >
                
                <$StackLayout>
                    <$Button text={"Auto"} horizontalAlignment={"right"}/>
                </$StackLayout>

                <$TextField
                    ref={this.surnnameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);
                        textField.applyStyle();
                    }}
                    hint={"Efternamn"}
                />
                <$TextField 
                    ref={this.mobileNumberTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);
                        textField.applyStyle();
                    }}
                    hint={"Mobilnummer"}
                />
                <$TextField
                    ref={this.emailTextFieldRef} 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.email);
                        textField.applyStyle();
                    }}
                    hint={"E-postaddress"}
                />
                <$TextField 
                    ref={this.addressTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);
                        textField.applyStyle();
                    }}
                    hint={"Gatuadress"}
                />
                <$TextField 
                    ref={this.postalCodeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);
                        textField.applyStyle();
                    }}
                    hint={"Post nr"}
                />
                <$TextField 
                    ref={this.placeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.place);
                        textField.applyStyle();
                    }}
                    hint={"Ort"}
                />
            </$StackLayout>
        );
    }
    
}
// might use https://github.com/nabil-mansouri/nativescript-nbmaterial/

