
import * as React from "react";
import { CardView } from "@nstudio/nativescript-cardview";
import { $StackLayout, $Label, $Switch, $FlexboxLayout, $Button, $TextField } from "react-nativescript";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { StackLayout, FlexboxLayout, Label, Color, TextField } from "react-nativescript/dist/client/ElementRegistry";
import ViewModel from "~/ViewModels/ViewModel";
import SelectionsViewModel, { Hemma } from "~/ViewModels/SelectionsViewModel";
import { observer } from "mobx-react";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import { autorun } from "mobx";
import { commonStyle } from "~/Form/FormStyles";
import { cardStyle } from "../cardStyles";
import { PercentLength } from "tns-core-modules/ui/page/page";

@observer
export default class HomeCard extends React.Component {

    private cardContainerRef = React.createRef<StackLayout>();
    /*
    private topRowRef = React.createRef<StackLayout>() 
    private switchRef = React.createRef<Switch>();
    */

    private personNummerTextField = React.createRef<TextField>();

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
        var content = container.getChildAt(0);
        container.removeChild(content);

        const cardView = new CardView();
        cardView.applyStyle();
        cardView.content = content;

        container.addChild(cardView);
    }

    render() {
        return (
            <$StackLayout ref={this.cardContainerRef}>
                <$FlexboxLayout alignItems={"center"} flexDirection={"column"} margin={5}>
                    <$Label text={"Är du hemma vid hämtningstillfället?"} fontSize={cardStyle.titleSize}/>
                    <SelectorComponent buttonContents={[this._yesButton(), this._noButton()]}/>
                    {this._renderPaymentDescriptionArea()}
                </$FlexboxLayout>
            </$StackLayout>
        )
    }

    private _yesButton(): Content {
        const content = new Content()
        content.text = "Ja";
        content.onTap = () => {
            console.log("yes/ja");
            const vm = SelectionsViewModel.get();
            vm.hemma = Hemma.ja;
        }
        return content;
    }
    private _noButton(): Content {
        const content = new Content();
        content.text = "Nej";
        content.onTap = () => {
            console.log("no/nej");
            const vm = SelectionsViewModel.get();
            vm.hemma = Hemma.nej;
        }
        return content
    } 

    private _renderPaymentDescriptionArea() {
        const model = ViewModel.get().model;
        if(model) {
            const vm = SelectionsViewModel.get();
            console.log("vm hemma: " + vm.hemma);
            if(vm.hemma == Hemma.ja) {
                const description = model.Avfallshamtning.placePayment;
                console.log("payment: " + description);
                return this._renderPlacePayment(description);
            } else if (vm.hemma == Hemma.nej) {
                const description = model.Avfallshamtning.awayPayment;
                console.log("payment: " + description);
                return this._renderAwayPayment(description);
            }
        }
        return null;   
    }
    _paymentSpacing = 10;
    private _renderPlacePayment(description: string) {
        return (
            <$Label marginTop={this._paymentSpacing} text={description} fontSize={this.textSize} />
        )
    }
    private _renderAwayPayment(description: string) {
        return (
            <$FlexboxLayout marginTop={this._paymentSpacing} flexDirection={"column"}>
                <$FlexboxLayout justifyContent={"center"} flexDirection={"column"}>
                    <$Label text={description} fontSize={cardStyle.descriptionSize} />
                    <$Label marginTop={2} text={"var vänlig ange personummer"} fontSize={11} />
                </$FlexboxLayout>
                <$FlexboxLayout justifyContent={"space-between"} flexDirection={"row"}>
                    <$TextField 
                        ref={this.personNummerTextField}
                        borderColor={commonStyle.borderColor}
                        hint={"Personnummer"}
                        margin={0}
                    />
                    <$Button text={"ok"} margin={0} /> 
                </$FlexboxLayout>
            </$FlexboxLayout>
        );
    }
}
// set personummer textfieid style
// check "ok" button on android. marin etc.

// https://stackoverflow.com/questions/8323819/is-there-a-quicker-better-way-to-clear-the-iphone-simulator-cache-than-deletin