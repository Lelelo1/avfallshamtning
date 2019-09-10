
import * as React from "react";
import { CardView } from "@nstudio/nativescript-cardview";
import { $StackLayout, $Label, $Switch, $FlexboxLayout, $Button } from "react-nativescript";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { StackLayout, FlexboxLayout, Label, Color } from "react-nativescript/dist/client/ElementRegistry";
import ViewModel from "~/ViewModels/ViewModel";
import SelectionsViewModel, { Hemma } from "~/ViewModels/SelectionsViewModel";
import { observer } from "mobx-react";

@observer
export default class HomeCard extends React.Component {

    private cardContainerRef = React.createRef<StackLayout>();
    private topRowRef = React.createRef<StackLayout>() 
    private switchRef = React.createRef<Switch>();
    componentDidMount() {

        // this._buildSwitch();
        this._buildCardView();
    }
    _buildSwitch() {
        const s = this.switchRef.current;
        const vm = SelectionsViewModel.get();
        s.checked = vm.hemma == Hemma.ja;
        s.on(Switch.checkedChangeEvent, (ev) => {
            vm.hemma = s.checked ? Hemma.ja : Hemma.nej;
        });
    }
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
                <$StackLayout>
                    <$FlexboxLayout justifyContent={"space-between"}>
                        <$Label text={"Är du hemma vid hämtningstillfället?"} fontSize={16}/>
                        <$FlexboxLayout>
                            <$Button text={"Ja"}
                                backgroundColor={new Color("black")}
                            />
                            <$Button text={"Nej"} backgroundColor={new Color("silver")}/>
                        </$FlexboxLayout>
                    </$FlexboxLayout>
                    <$StackLayout>
                        <$Label text={this._displayPaymentInfo()}/>
                    </$StackLayout>
                </$StackLayout>
            </$StackLayout>
        )
    }
    _displayPaymentInfo() {
        const model = ViewModel.get().model;
        if(model) {
            const vm = SelectionsViewModel.get();
            if(vm.hemma == Hemma.ja) {
                return model.Avfallshamtning.placePayment;
            } else if (vm.hemma == Hemma.nej) {
                return model.Avfallshamtning.awayPayment;
            }
        }
        return "";
    }
}
// https://stackoverflow.com/questions/8323819/is-there-a-quicker-better-way-to-clear-the-iphone-simulator-cache-than-deletin