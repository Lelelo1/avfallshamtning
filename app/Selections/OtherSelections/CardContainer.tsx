import * as React from "react";
import { CardView } from "@nstudio/nativescript-cardview";
import { $StackLayout } from "react-nativescript";
import { StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import "../SelectionStyles";

export default class CardContainer extends React.Component {
    cardContainerRef = React.createRef<StackLayout>();
    
    componentDidMount() {
        var cardContainer = this.cardContainerRef.current;
        
        var content = cardContainer.getChildAt(0);
        cardContainer.removeChild(content);

        // wrap with card
        var cardView = new CardView();
        cardView.applyStyle();
        cardView.content = content;
        cardContainer.addChild(cardView);
    }
    
    render() {
        return (
            <$StackLayout ref={this.cardContainerRef}>
                <$StackLayout>
                    
                </$StackLayout>
            </$StackLayout>
        )
    }
}