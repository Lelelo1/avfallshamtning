import * as React from "react";
import { $StackLayout, $Button } from "react-nativescript";
import Form from "./Form";

import { CardView } from "@nstudio/nativescript-cardview";
import FormViewModel from "~/ViewModels/FormViewModel";
import { observer } from "mobx-react";

import { Reactified } from "rns-reactify/Reactified/Reactified";
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";
import { Button } from "@nativescript/core/ui/button/button";
import { Color } from "@nativescript/core/color/color";

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