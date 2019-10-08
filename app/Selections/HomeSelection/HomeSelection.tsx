
import * as React from "react";
import { CardView } from "@nstudio/nativescript-cardview";
import { $StackLayout, $Label, $Switch, $FlexboxLayout, $Button, $TextField } from "react-nativescript";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { StackLayout, FlexboxLayout, Label, Color, TextField } from "react-nativescript/dist/client/ElementRegistry";
import ViewModel from "~/ViewModels/ViewModel";
import SelectionsViewModel from "~/ViewModels/SelectionsViewModel";
import { observer } from "mobx-react";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import { autorun } from "mobx";

import { cardStyle } from "../cardStyles";

import AwayPayment from "./AwayPayment"; 
import { Hemma } from "~/Models/SelectionsModel";

@observer
export default class HomeSelection extends React.Component {

    private cardContainerRef = React.createRef<StackLayout>();
    /*
    private topRowRef = React.createRef<StackLayout>() 
    private switchRef = React.createRef<Switch>();
    */

    private personNummerTextFieldRef = React.createRef<TextField>();

    textSize = 16; // consider making a global style attribute

    componentDidMount() {

        // this._buildSwitch();
        this._buildCardView();
    }
    /*
    _buildSwitch() {
        const s = this.switchRef.current;
        const vm = SelectionsViewModel.get();
        s.checked = vm.hemma == Hemma.ja;
        s.on(Switch.checkedChangeEvent, (ev) => {
            vm.hemma = s.checked ? Hemma.ja : Hemma.nej;
        });
    }
    */
    _buildCardView() {
        const container = this.cardContainerRef.current;
        const content = container.getChildAt(0);
        container.removeChild(content);

        const cardView = new CardView();
        cardView.applyStyle();
        cardView.content = content;

        container.addChild(cardView);
    }
    // _paymentSpacing = 10; consider making a line/border bwteen yes/no and description area
    render() {
        return (
            <$StackLayout ref={this.cardContainerRef}>
                <$FlexboxLayout margin={cardStyle.contentMargin} flexDirection={"column"}>
                    <$Label
                        alignSelf={"center"}
                        text={"Är du hemma vid hämtningstillfället?"}
                        fontSize={cardStyle.titleSize}
                        margin={cardStyle.childrenSpacing}
                    />
                    <SelectorComponent buttonContents={[this._yesButton(), this._noButton()]} margin={cardStyle.childrenSpacing}/>
                    {
                        this._renderPaymentDescription()
                    }
                </$FlexboxLayout>
            </$StackLayout>
        )
    }

    private _yesButton(): Content {
        const content = new Content()
        content.text = "Ja";
        content.onTap = () => {
            const model = SelectionsViewModel.get().selectionsModel;
            model.hemma = Hemma.ja;
        }
        return content;
    }
    private _noButton(): Content {
        const content = new Content();
        content.text = "Nej";
        content.onTap = () => {
            const model = SelectionsViewModel.get().selectionsModel;
            model.hemma = Hemma.nej;
        }
        return content
    } 

    _renderPaymentDescription() {
        const model = ViewModel.get().model;
        if(model) {
            const selectionsModel = SelectionsViewModel.get().selectionsModel;
            console.log("vm hemma: " + selectionsModel.hemma);
            if(selectionsModel.hemma == Hemma.ja) {
                const description = model.Avfallshamtning.placePayment;
                console.log("payment: " + description);
                return <$Label alignSelf={"center"} text={description} fontSize={cardStyle.descriptionSize} margin={cardStyle.childrenSpacing}/>
            } else if (selectionsModel.hemma == Hemma.nej) {
                const description = model.Avfallshamtning.awayPayment;
                console.log("payment: " + description);
                return <AwayPayment description={description} fontSize={this.textSize} margin={cardStyle.childrenSpacing} />;
            }
        }
            
    }
}
// set personummer textfieid style
// check "ok" button on android. marin etc.

// https://stackoverflow.com/questions/8323819/is-there-a-quicker-better-way-to-clear-the-iphone-simulator-cache-than-deletin