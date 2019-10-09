
/* making like it is on the website currently - entering with text in text field.
 Should use a datepicker whenever avfallsmatning  starts to digitalize their businiess */

 // should display 20% expensive prices when 


import * as React from "react";
import { $StackLayout, $FlexboxLayout, $Label, $TextField, $TextView} from "react-nativescript";

import { CardView } from "@nstudio/nativescript-cardview";
import { cardStyle } from "../cardStyles";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import SelectionsViewModel from "~/ViewModels/SelectionsViewModel";
import { StackLayout, TextField, Color, TextView } from "react-nativescript/dist/client/ElementRegistry";
import FormViewModel from "~/ViewModels/FormViewModel";
import { autorun, observable } from "mobx";
import { observer } from "mobx-react";
import { device } from "tns-core-modules/platform/platform";

@observer
export default class TimeSelection extends React.Component {
    cardContainerRef = React.createRef<StackLayout>();
    timeTextField = React.createRef<TextField>();
    componentDidMount() {
        this._buildCardView();

        const formViewModel = FormViewModel.get()
        const model = SelectionsViewModel.get().selectionsModel;
        autorun(() => {
            const selectionsViewModel = SelectionsViewModel.get();
            const show = selectionsViewModel.shouldDisplayTextFieldsStatus// <-- just to trigger change. Might separate into difference variables
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
                    <$Label
                        text={"Ange önskad hämtningsdag och ca tid"}
                        fontSize={cardStyle.titleSize}
                        margin={cardStyle.childrenSpacing}
                        textWrap={true}
                        textAlignment={"center"}
                    />
                    <$TextField
                        ref={this.timeTextField}
                        hint={"hämtningsdag och ca tid"}
                        onLoaded={(ev) => {
                            const textField = ev.object as TextField;
                            // textField.setAutofillHintContentType(AutofillHintContentType.time);
                            textField.applyStyle(SelectionsViewModel.get().selectionsModel.tid);
                        }}
                        text={SelectionsViewModel.get().selectionsModel.tid}
                        onTextChange={(event) => {
                            const textField = event.object as TextField;
                            SelectionsViewModel.get().selectionsModel.tid = textField.text;
                        }}
                        margin={cardStyle.childrenSpacing}
                        />
                    <$Label
                        text={"så återkommer till dig inom 2 arbetsdagar med en bokningsbekräftelse"}
                        fontSize={cardStyle.descriptionSize}
                        margin={cardStyle.littleDescriptionSpacing}
                        textWrap={true}
                        textAlignment={"center"}
                    />
                </$FlexboxLayout>
            </$StackLayout>
        );
    }
}
