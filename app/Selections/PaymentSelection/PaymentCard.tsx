
import * as React from "react";
import { CardView } from "@nstudio/nativescript-cardview";
import { $StackLayout, $FlexboxLayout, $Label, $TextView } from "react-nativescript";

import { StackLayout, FlexboxLayout, Label } from "react-nativescript/dist/client/ElementRegistry";

export default class PaymentCard extends React.Component {

    private cardContainerRef = React.createRef<StackLayout>();

    componentDidMount() {
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
                <$FlexboxLayout >
                    <$Label text={"Betalning"}/>
                    <$TextView />
                </$FlexboxLayout>
            </$StackLayout>
        )
    }
}