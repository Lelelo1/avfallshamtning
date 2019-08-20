import * as React from "react";
import { $StackLayout, $Button } from "react-nativescript";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import Form from "./Form";
import { Color } from "tns-core-modules/color/color";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { Button } from "tns-core-modules/ui/button/button";

import { CardView } from "nativescript-cardview";
import { PercentLength } from "tns-core-modules/ui/page/page";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";

export default class Record extends React.Component {

    containerRef = React.createRef<StackLayout>();

    private recordButtonRef = React.createRef<Button>();
    private formRef = React.createRef<Form>();

    private card: CardView = null;

    componentDidMount() {
        this.card = this.formRef.current.build(this.containerRef.current);
        this.cardHeight = PercentLength.toDevicePixels(this.card.height);
        // this.containerRef.current.removeChild(this.card);
    }

    render() {
        return (
            <$StackLayout ref={this.containerRef} backgroundColor={new Color('silver')}>
                <$Button ref={this.recordButtonRef} text={"Personuppgifter"} onTap={this.record} />
                <Form ref={this.formRef} />
            </$StackLayout>
        )
    }

    cardHeight = -1;
    record = (event: GestureEventData) => {
        
        const container = this.containerRef.current;
        console.log("kidzz: " + container.getChildIndex(new StackLayout()));

        if(container.getChildIndex(this.card) === -1) {
            container.addChild(this.card);
            /* play animation */
            
            this.formRef.current.getUserInfo();
            
        } else {
            container.removeChild(this.card);
        } 
    }
}