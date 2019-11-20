import * as React from "react";
import { $StackLayout, $Button, $ContentView } from "react-nativescript";
import Form from "./Form";

import { CardView } from "@nstudio/nativescript-cardview";
import FormViewModel from "~/ViewModels/FormViewModel";
import { observer } from "mobx-react";

import { Reactified } from "rns-reactify/Reactified/Reactified";
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";
import { Button } from "@nativescript/core/ui/button/button";
import { Color } from "@nativescript/core/color/color";
import { reaction, autorun } from "mobx";
import { ContentView } from "react-nativescript/dist/client/ElementRegistry";

class $CardView  extends Reactified(CardView, "cardView") {};

@observer
export default class Record extends React.Component {

    containerRef = React.createRef<StackLayout>();

    private recordButtonRef = React.createRef<Button>();

    private formContainer = React.createRef<ContentView>();
    private formRef = React.createRef<Form>();

    private cardView = new CardView();
    componentDidMount() {

        // this.containerRef.current.removeChild(this.formRef.current.stackLayoutRef.current);
        
        autorun(() => {
            const isHidden = FormViewModel.get().isHidden;
            if(isHidden) {
                this.containerRef.current.removeChild(this.formContainer.current);
            } else {
                this.containerRef.current.addChild(this.formContainer.current);
            }
        });
        
        this._buildCardView();
        
    }
    private _buildCardView() {
        this.cardView.margin = 10;
        this.cardView.borderWidth = 2;
        this.cardView.shadowOffsetHeight = 2;
        this.cardView.shadowOffsetWidth = 1;
        this.cardView.className = "cardStyle";
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
                <$ContentView ref={this.formContainer}>
                    <Form ref={this.formRef} />
                </$ContentView>
            </$StackLayout>
        )
    }
    renderForm() {
        console.log("renderrr");
        
        return FormViewModel.get().isHidden ? null : ( 
            <$CardView
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