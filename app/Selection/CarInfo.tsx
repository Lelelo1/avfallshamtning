
import * as React from "react";
import { $FlexboxLayout, $Label } from "react-nativescript";
import { Size } from "./size";
import { FlexboxLayout, StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "nativescript-cardview";

export default class CarInfo extends React.Component <{ size: Size }> {
    
    private containerRef = React.createRef<FlexboxLayout>();

    build(parent: StackLayout) {
        const container = this.containerRef.current;
        const index = parent.getChildIndex(container);
        parent.removeChild(container);
        const cardView = new CardView();
        cardView.content = container;
        parent.addChild(cardView);
    }

    render() {
        return (
            <$FlexboxLayout
                ref={this.containerRef}
                justifyContent={"center"}
                alignContent={"center"}    
            >
                <$Label text={this.props.size}/>
            </$FlexboxLayout>
        );
    }
}