
import * as React from "react";
import { $TextField, $StackLayout, $Label, $FlexboxLayout } from "react-nativescript";
import { TextField, Color } from "react-nativescript/dist/client/ElementRegistry";
import { commonStyle } from "../../Form/FormStyles";
import { AutofillHintContentType } from "../../Extensions";
import FormViewModel from "../../ViewModels/FormViewModel";
import { autorun } from "mobx";
import { observer } from "mobx-react";

import { cardStyle } from "../cardStyles";
import { numberToString } from "~/Form/Form";


@observer
export default class AwayPayment extends React.Component<{paymentSpacing: number, description: string}>{
    
    personnummerTextFieldRef = React.createRef<TextField>();

    componentDidMount() {
        const formViewModel = FormViewModel.get()
        const model = formViewModel.formModel;
        const textField = this.personnummerTextFieldRef.current;
        autorun(() => {
            const formViewModel = FormViewModel.get();
            const show = formViewModel.shouldDisplayTextFieldsStatus // <-- just to trigger change
            formViewModel.setStyle(textField, model.personnummer, show);
        })
        // on loaded not firing for some reason - native component is already ready
        // textField.setAutofillHintContentType(AutofillHintContentType.personnummer);
        textField.applyStyle(FormViewModel.get().formModel.personnummer);
    }
    render() {
        return (
            <$StackLayout marginTop={this.props.paymentSpacing} className={"form"}>
                <$Label horizontalAlignment={"center"} text={this.props.description} fontSize={cardStyle.descriptionSize} />
                <$Label horizontalAlignment={"center"} marginTop={2} text={"var vänlig ange personnummer"} fontSize={11} />
                <$TextField 
                    ref={this.personnummerTextFieldRef}
                    borderColor={commonStyle.borderColor}
                    hint={"Personnummer"}
                    text={numberToString(FormViewModel.get().formModel.personnummer)}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        const number = Number(textField.text); // when undefined creates appropirat effect / is handled

                        FormViewModel.get().formModel.personnummer = number
                    }}
                />
            </$StackLayout>
            
        )
    }
}