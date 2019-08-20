import * as React from "react";
import { $StackLayout, $Button, $TextField, $FlexboxLayout, $Label } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { AutofillHintContentType } from "../Extensions";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { FlexboxLayout } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "nativescript-cardview";

export default class Form extends React.Component<{},{}>{
    stackLayoutRef = React.createRef<StackLayout>();
    
    private nameTextFieldRef = React.createRef<TextField>();
    private surnnameTextFieldRef = React.createRef<TextField>();
    private mobileNumberTextFieldRef = React.createRef<TextField>();
    private emailTextFieldRef = React.createRef<TextField>();
    private addressTextFieldRef = React.createRef<TextField>();
    private postalCodeTextFieldRef = React.createRef<TextField>();
    private placeTextFieldRef = React.createRef<TextField>();

    defaultStyle = {}
    componentDidMount() {
        console.log("Form didMount: " + this.stackLayoutRef.current);
        
        // ios.
        // ios.delegate.textFieldShouldChangeCharactersInRangeReplacementString(ios, NSRange(interop.Pointer), "");
    }

     build(parent: StackLayout): CardView {
        // https://www.nativescript.org/blog/adding-a-material-design-cardview-to-a-nativescript-app
        const form = this.stackLayoutRef.current;

        parent.removeChild(form);
        const cardView = new CardView();
        cardView.content = form;

        // form.className = "cardContent";
        
        form.margin = 20;
        form.marginTop = 0;

        cardView.className = "cardStyle";
        cardView.margin = 10;
        cardView.marginTop = 0;
        cardView.borderWidth = 2;
        
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
            >
                <$TextField 
                    ref={this.nameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.name);
                    
                    }}
                    hint={"Namn"}
                    className={"input input-rounded m-t-10"}
                    width={200}
                    style={{ backgroundColor: new Color('#ededed'), borderColor: ('#787878') }}
                />

                <$TextField
                    ref={this.surnnameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);
    
                    }}
                    hint={"Efternamn"}
                    className={"input-border"}
                />
                <$TextField 
                    ref={this.mobileNumberTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);
    
                    }}
                    hint={"Mobilnummer"}
                    className={"input-rounded"}
                    style={{ placeholderColor: new Color('blue') }}
                />
                <$TextField
                    ref={this.emailTextFieldRef} 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.email);
    
                    }}
                    hint={"E-postaddress"}
                    className={"label"}
                />
                <$TextField 
                    ref={this.addressTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);
    
                    }}
                    hint={"Gatuadress"}
                />
                <$TextField 
                    ref={this.postalCodeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);
    
                    }}
                    hint={"Post nr"}
                    className={"input-sides"}
                />
                <$TextField 
                    ref={this.placeTextFieldRef}
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

