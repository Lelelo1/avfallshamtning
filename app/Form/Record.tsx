import * as React from "react";
import { $StackLayout, $Button } from "react-nativescript";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import Form from "./Form";
import { Color } from "tns-core-modules/color/color";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { Button } from "tns-core-modules/ui/button/button";

import { CardView } from "@nstudio/nativescript-cardview";
import { PercentLength } from "tns-core-modules/ui/page/page";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import FormViewModel from "~/ViewModels/FormViewModel";
import { autorun } from "mobx";
import { observer } from "mobx-react";

@observer
export default class Record extends React.Component {

    containerRef = React.createRef<StackLayout>();

    private recordButtonRef = React.createRef<Button>();
    private formRef = React.createRef<Form>();

    private card: CardView = null;

    componentDidMount() {
        this.card = this.formRef.current.build(this.containerRef.current);
        this.cardHeight = PercentLength.toDevicePixels(this.card.height);
        // this.containerRef.current.removeChild(this.card);
        const button = this.recordButtonRef.current;
        button.addEventListener("tap",() => { // the jsx/tsx tap does not trigger
            this.record(null);
        });
        autorun(() => {
            const hidden = FormViewModel.get().hidden;
            if(hidden) {
                this._triggerTap();
            }
        })
    }

    render() {
        return (
            <$StackLayout ref={this.containerRef} backgroundColor={new Color("#c4c4c4")}>
                <$Button ref={this.recordButtonRef} text={"Personuppgifter"} />
                <Form ref={this.formRef} />
            </$StackLayout>
        )
    }
    _triggerTap():void {
        this.recordButtonRef.current.notify({eventName: "tap", object: this.recordButtonRef.current});
    }
    cardHeight = -1;
    record = (event: GestureEventData) => {
        // Might request contact info here
        const container = this.containerRef.current;
        console.log("taped");
        if(this.containerRef.current.getChildIndex(this.card) == -1) {
            container.addChild(this.card);
            /* play animation */
            
        } else {
            container.removeChild(this.card);
        } 
    }
}