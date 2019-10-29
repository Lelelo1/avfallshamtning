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
import { autorun, reaction } from "mobx";
import { observer } from "mobx-react";

import { Reactified } from "rns-reactify/Reactified/Reactified";
import { cardStyle } from "~/Selections/cardStyles";
import { ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";

class $CardView  extends Reactified(CardView, "cardView") {};

@observer
export default class Record extends React.Component {

    containerRef = React.createRef<StackLayout>();

    private cardViewRef = React.createRef<CardView>();
    private recordButtonRef = React.createRef<Button>();
    private formRef = React.createRef<Form>();

    componentDidMount() {
        console.log("cardview: " + this.cardViewRef.current);
        // this.containerRef.current.removeChild(this.formRef.current.stackLayoutRef.current);
    }

    render() {
        console.log("erere");
        return (
            <$StackLayout ref={this.containerRef} backgroundColor={new Color("#c4c4c4")}>
                <$Button ref={this.recordButtonRef} text={"Personuppgifter"} onTap={() => {
                    console.log("settin: " + !FormViewModel.get().isHidden);
                    FormViewModel.get().isHidden = !FormViewModel.get().isHidden;
                }}
                />
                {this.renderForm()}
                
                
            </$StackLayout>
        )
    }
    renderForm() {
        console.log("renderrr");
        return FormViewModel.get().isHidden ? null : ( 
            <$CardView
                forwardedRef={this.cardViewRef}
                margin={10}
                borderWidth={2} 
                shadowOffsetHeight={2}
                shadowOffsetWidth={1}
                className={"cardStyle"}
            >
                <Form ref={this.formRef} />
            </$CardView>
            
        );
    }
}