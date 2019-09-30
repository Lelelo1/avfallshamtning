import * as React from "react";
import { $StackLayout, $Button, $TextField, $FlexboxLayout, $Label } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { Button } from "tns-core-modules/ui/button/button";
import { AutofillHintContentType } from "../Extensions";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { FlexboxLayout, TextField } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "@nstudio/nativescript-cardview";
import FromViewModel from "../ViewModels/FormViewModel";
import "../Styles";
import "./FormStyles";

import { PercentLength, EventData } from "tns-core-modules/ui/page/page";
import FormViewModel from "../ViewModels/FormViewModel";
import { observer } from "mobx-react";
import { when, reaction, autorun } from "mobx";

@observer
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
        const formViewModel = FormViewModel.get()
        const model = formViewModel.formModel;

        autorun(() => {
            const show = formViewModel.shouldDisplayTextFieldsStatus // <-- just to trigger change
            formViewModel.setStyle(this.nameTextFieldRef.current, model.namn, show);
            formViewModel.setStyle(this.surnnameTextFieldRef.current, model.efternamn, show);
            formViewModel.setStyle(this.mobileNumberTextFieldRef.current, model.mobilnummer, show);
            formViewModel.setStyle(this.emailTextFieldRef.current, model.epostaddress, show);
            formViewModel.setStyle(this.addressTextFieldRef.current, model.gatuaddress, show);
            formViewModel.setStyle(this.postalCodeTextFieldRef.current, model.postnummer, show);
            formViewModel.setStyle(this.placeTextFieldRef.current, model.ort, show);
        })


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

    render() {

        return (
            <$StackLayout
                ref={this.stackLayoutRef}
                className={"form"}
                backgroundColor={new Color("#fdfff0")}
            >
                
                <$StackLayout>
                    {/* to left/ in he middle display status. icke ifyll - * ickeifylld with a checkbox icon */}
                    {/*<$TextArea text={() => FormViewModel.get()}/>*/}
                    <$Button text={"Auto"} horizontalAlignment={"right"}/>
                </$StackLayout>
                
                <$TextField
                    ref={this.nameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.name);
                        textField.applyStyle(FormViewModel.get().formModel.namn);
                    }}
                    hint={"Namn"}
                    text={FormViewModel.get().formModel.namn}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.namn = textField.text;
                    }}
                />
                <$TextField
                    ref={this.surnnameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);
                        textField.applyStyle(FormViewModel.get().formModel.efternamn);
                    }}
                    hint={"Efternamn"}
                    text={FormViewModel.get().formModel.efternamn}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.efternamn = textField.text;
                    }}
                />
                <$TextField 
                    ref={this.mobileNumberTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);
                        textField.applyStyle(FormViewModel.get().formModel.mobilnummer);
                    }}
                    hint={"Mobilnummer"}
                    text={numberToString(FormViewModel.get().formModel.mobilnummer)}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        const number = Number(textField.text); // when undefined creates appropirat effect / is handled
                        FormViewModel.get().formModel.mobilnummer = number;
                    }}
                />
                <$TextField
                    ref={this.emailTextFieldRef} 
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.email);
                        textField.applyStyle(FormViewModel.get().formModel.epostaddress);
                    }}
                    hint={"E-postaddress"}
                    text={FormViewModel.get().formModel.epostaddress}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.epostaddress = textField.text;
                    }}
                />
                <$TextField 
                    ref={this.addressTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);
                        textField.applyStyle(FormViewModel.get().formModel.epostaddress);
                    }}
                    hint={"Gatuadress"}
                    text={FormViewModel.get().formModel.gatuaddress}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.gatuaddress = textField.text;
                    }}
                />
                <$TextField 
                    ref={this.postalCodeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);
                        textField.applyStyle(FormViewModel.get().formModel.postnummer);
                    }}
                    hint={"Post nr"}
                    text={numberToString(FormViewModel.get().formModel.postnummer)}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        const number = Number(textField.text); // when undefined creates appropirat effect / is handled

                        FormViewModel.get().formModel.postnummer = number
                    }}
                />
                <$TextField 
                    ref={this.placeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.place);
                        textField.applyStyle(FormViewModel.get().formModel.ort);
                    }}
                    hint={"Ort"}
                    text={FormViewModel.get().formModel.ort}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.ort = textField.text;
                        console.log("textField ort text: " + textField.text);
                    }}
                />
                <$StackLayout>
                    <$Button
                        text={"Ok"}
                        horizontalAlignment={"right"}
                        onTap={() => {
                            if(FormViewModel.get().formIsValid()) {
                                FormViewModel.get().hide();
                                FormViewModel.get().shouldDisplayTextFieldsStatus = false;
                            } else {
                                FormViewModel.get().shouldDisplayTextFieldsStatus = true;
                            }
                            
                        }}
                    />
                </$StackLayout>
            </$StackLayout>
        );
    }
}

export function numberToString(number: number) {
    if(!number) return "";
    return String(number);
}

// might use https://github.com/nabil-mansouri/nativescript-nbmaterial/

