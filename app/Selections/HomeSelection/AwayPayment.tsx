
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
import SelectionsViewModel from "~/ViewModels/SelectionsViewModel";


@observer
export default class AwayPayment extends React.Component<{description: string, fontSize: number}>{
    
    personnummerTextFieldRef = React.createRef<TextField>();
    anvisningTextFieldRef = React.createRef<TextField>();

    componentDidMount() {
        const formViewModel = FormViewModel.get()
        const model = formViewModel.formModel;
        const personnummerTextField = this.personnummerTextFieldRef.current;
        const anvisningTextField = this.anvisningTextFieldRef.current;
        autorun(() => {
            const selectionsViewModel = SelectionsViewModel.get();
            const show = selectionsViewModel.shouldDisplayTextFieldsStatus // <-- just to trigger change. Might separate into difference variables
            formViewModel.setStyle(personnummerTextField, model.personnummer, show);
            formViewModel.setStyle(anvisningTextField, model.anvisning, show);
        })
        // on loaded not firing for some reason - native component is already ready
        // textField.setAutofillHintContentType(AutofillHintContentType.personnummer);
        personnummerTextField.applyStyle(FormViewModel.get().formModel.personnummer);
        anvisningTextField.applyStyle(FormViewModel.get().formModel.anvisning);
    }
    render() {
        return (
            <$StackLayout className={"form"}>
                <$Label horizontalAlignment={"center"} text={this.props.description} fontSize={cardStyle.descriptionSize} />
                <$Label horizontalAlignment={"center"} marginTop={2} text={"var vänlig ange personnummer"} fontSize={12} />
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
                <$Label horizontalAlignment={"center"} marginTop={2} text={"och en anvisning till var avfallet kommer att finnas"} fontSize={12} />
                <$TextField 
                    ref={this.anvisningTextFieldRef}
                    borderColor={commonStyle.borderColor}
                    hint={"Anvisning"}
                    text={FormViewModel.get().formModel.anvisning}
                    onTextChange={(event) => {
                        const textField = event.object as TextField;
                        FormViewModel.get().formModel.anvisning = textField.text;
                    }}
                />
            </$StackLayout>
            
        )
    }
}