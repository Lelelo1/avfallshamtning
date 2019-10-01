
import * as React from "react";
import { $StackLayout, $FlexboxLayout, $Label } from "react-nativescript";
import { StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "@nstudio/nativescript-cardview";
import { cardStyle } from "../cardStyles";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import SelectionsViewModel, { Hemma, Avfall } from "~/ViewModels/SelectionsViewModel";

export default class GarbageTypeSelection extends React.Component {
    cardContainerRef = React.createRef<StackLayout>();


    componentDidMount() {
        this._buildCardView();
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
            <$StackLayout ref={this.cardContainerRef} className={"form"}>
                <$FlexboxLayout margin={cardStyle.contentMargin} flexDirection={"column"} >
                    <$Label alignSelf={"center"} text={"Innehåller avfallet något farligt?"} fontSize={cardStyle.titleSize}/>
                    <SelectorComponent buttonContents={[this._yesButton(), this._noButton()]} selectedIndex={1}/>
                </$FlexboxLayout>
            </$StackLayout>
        )
    }
    private _yesButton(): Content {
        const content = new Content()
        content.text = "Ja";
        content.onTap = () => {
            const vm = SelectionsViewModel.get();
            vm.avfall = Avfall.farligt;
        }
        return content;
    }
    private _noButton(): Content {
        const content = new Content();
        content.text = "Nej";
        content.onTap = () => {
            const vm = SelectionsViewModel.get();
            vm.avfall = Avfall.ofarligt;
        }
        return content
    } 
}