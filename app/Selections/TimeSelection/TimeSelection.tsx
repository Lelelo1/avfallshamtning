
/* making like it is on the website currently - entering with text in text field.
 Should use a datepicker whenever avfallsmatning  starts to digitalize their businiess */

 // should display 20% expensive prices when 


import * as React from "react";
import { $StackLayout, $FlexboxLayout, $Label, $TextField, $TextView} from "react-nativescript";

import { CardView } from "@nstudio/nativescript-cardview";
import { cardStyle } from "../cardStyles";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import SelectionsViewModel, { Hemma, Avfall } from "~/ViewModels/SelectionsViewModel";
import { StackLayout, TextField, Color } from "react-nativescript/dist/client/ElementRegistry";
import FormViewModel from "~/ViewModels/FormViewModel";
import { autorun, observable } from "mobx";
import { observer } from "mobx-react";

@observer
export default class TimeSelection extends React.Component {
    cardContainerRef = React.createRef<StackLayout>();
    timeTextField = React.createRef<TextField>();
    componentDidMount() {
        this._buildCardView();

        const formViewModel = FormViewModel.get()
        const model = formViewModel.formModel;
        autorun(() => {
            const formViewModel = FormViewModel.get();
            const show = formViewModel.shouldDisplayTextFieldsStatus // <-- just to trigger change. Might separate into difference variables
            formViewModel.setStyle(this.timeTextField.current, model.tid, show);
        })

    }
    _buildCardView() {
        const container = this.cardContainerRef.current;
        const content = container.getChildAt(0);
        container.removeChild(content);

        const cardView = new CardView();
        cardView.applyStyle();
        cardView.content = content;

        container.addChild(cardView);
    }
    render() {
        return (
            <$StackLayout ref={this.cardContainerRef} className={"form"} >
                <$FlexboxLayout flexDirection={"column"} margin={cardStyle.contentMargin}>
                    <$Label alignSelf={"center"} text={"Ange önskad hätmingsdag och ca tid"} fontSize={cardStyle.titleSize}/>
                    <$TextField
                        ref={this.timeTextField}
                        hint={"hämtningsdag och ca tid"}
                        onLoaded={(ev) => {
                            const textField = ev.object as TextField;
                            // textField.setAutofillHintContentType(AutofillHintContentType.time);
                            textField.applyStyle(FormViewModel.get().formModel.tid);
                        }}
                        margin={0}
                        text={FormViewModel.get().formModel.tid}
                        onTextChange={(event) => {
                            const textField = event.object as TextField;
                            FormViewModel.get().formModel.tid = textField.text;
                        }}
                        />
                    <$TextView textAlignment={"center"} editable={false} text={"så återkommer till dig inom 2 arbetsdagar med en bokningsbekräftelse"} fontSize={cardStyle.descriptionSize}/>
                </$FlexboxLayout>
            </$StackLayout>
        );
    }
}
