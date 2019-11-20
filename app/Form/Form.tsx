import * as React from "react";
import { $StackLayout, $Button, $TextField } from "react-nativescript";

import { AutofillHintContentType } from "../Extensions";
import { CardView } from "@nstudio/nativescript-cardview";
import "../Styles";
import "./FormStyles";

import FormViewModel from "../ViewModels/FormViewModel";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import { commonStyle, iosStyle } from "./FormStyles";
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";
import { TextField } from "@nativescript/core/ui/text-field/";
import { device } from "@nativescript/core/platform/platform";
import { Color } from "@nativescript/core/color/color";

@observer
export default class Form extends React.Component<{},{}>{
    cardViewRef = React.createRef<CardView>();

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
            /* formViewModel.setStyle(this.emailTextFieldRef.current, model.epostaddress, show); */
            formViewModel.setStyle(this.addressTextFieldRef.current, model.gatuaddress, show);
            formViewModel.setStyle(this.postalCodeTextFieldRef.current, model.postnummer, show);
            formViewModel.setStyle(this.placeTextFieldRef.current, model.ort, show);
        })


        // ios.
        // ios.delegate.textFieldShouldChangeCharactersInRangeReplacementString(ios, NSRange(interop.Pointer), "");
        const container = this.stackLayoutRef.current;
        
    }

    /*
     build(parent: StackLayout): CardView {
        // https://www.nativescript.org/blog/adding-a-material-design-cardview-to-a-nativescript-app
        const form = this.stackLayoutRef.current;

        parent.removeChild(form);
        const cardView = new CardView();
        cardView.content = form;

        cardView.applyStyle();
        cardView.shadowOffsetHeight = 2;
        cardView.shadowOffsetWidth = 1;
        parent.addChild(cardView);
        return cardView;
    }
*/
    build(cardView: CardView) {
        
    }
    _getBorderWidth = (): number => {
        return device.os === "Android" ? commonStyle.androidBorderWidth : null;
    }
    _getStyle = (): string => {
        return device.os === "iOS" ? iosStyle.className : null
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
                    {/* <$Button text={"Auto"} horizontalAlignment={"right"}/>/*/}
                </$StackLayout>
                
                <$TextField
                    ref={this.nameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.name);
                    }}
                    hint={"Namn"}
                    text={FormViewModel.get().formModel.namn}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.namn = textField.text;
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    // needed after auto button removal
                    marginTop={commonStyle.marginLeft}
                    className={this._getStyle()}
                />
                <$TextField
                    ref={this.surnnameTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.surname);
                    }}
                    hint={"Efternamn"}
                    text={FormViewModel.get().formModel.efternamn}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.efternamn = textField.text;
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    className={this._getStyle()}
                />
                <$TextField 
                    ref={this.mobileNumberTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.mobileNumber);
                    }}
                    hint={"Mobilnummer"}
                    text={FormViewModel.get().formModel.mobilnummer}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        // const number = Number(textField.text); // when undefined creates appropirat effect / is handled
                        FormViewModel.get().formModel.mobilnummer = textField.text;
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    className={this._getStyle()}
                />
                {/* 
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
                */}
                
                <$TextField 
                    ref={this.addressTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.address);
                    }}
                    hint={"Gatuadress"}
                    text={FormViewModel.get().formModel.gatuaddress}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.gatuaddress = textField.text;
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    className={this._getStyle()}
                />
                <$TextField 
                    ref={this.postalCodeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.postalCode);
                    }}
                    hint={"Post nr"}
                    text={FormViewModel.get().formModel.postnummer}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        // const number = Number(textField.text); // when undefined creates appropirat effect / is handled

                        FormViewModel.get().formModel.postnummer = textField.text;
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    className={this._getStyle()}
                />
                <$TextField 
                    ref={this.placeTextFieldRef}
                    onLoaded={(ev) => {
                        const textField = ev.object as TextField;
                        textField.setAutofillHintContentType(AutofillHintContentType.place);
                    }}
                    hint={"Ort"}
                    text={FormViewModel.get().formModel.ort}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        console.log("textField ort text: " + textField.text);
                        FormViewModel.get().formModel.ort = textField.text;
                        
                    }}
                    backgroundColor={commonStyle.backgroundColor}
                    borderWidth={this._getBorderWidth()}
                    margin={commonStyle.margin}
                    marginLeft={commonStyle.marginLeft}
                    marginRight={commonStyle.marginRight}
                    className={this._getStyle()}
                />
                <$StackLayout>
                    <$Button
                        text={"Ok"}
                        horizontalAlignment={"right"}
                        onTap={() => {
                            if(FormViewModel.get().formIsValid()) {
                                FormViewModel.get().isHidden = true;
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

/* text is not triggered the when form is open the second time */

// might use https://github.com/nabil-mansouri/nativescript-nbmaterial/

