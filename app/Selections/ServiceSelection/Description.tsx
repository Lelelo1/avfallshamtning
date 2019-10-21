
import * as React from "react";
import { $FlexboxLayout, $Label, $TextView, $StackLayout, $Button, $Image, $FormattedString, $Span } from "react-nativescript";
import { FlexboxLayout, StackLayout, TextView, GridLayout, Image, ActionItem } from "react-nativescript/dist/client/ElementRegistry";
import { Button } from "tns-core-modules/ui/button/button";
import { CardView } from "@nstudio/nativescript-cardview";
import ViewModel from "../../ViewModels/ViewModel";
import { observer } from "mobx-react";
import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { observable, autorun } from "mobx";
import "../../Extensions";
import { device } from "tns-core-modules/platform/platform";
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { FormattedString, Span } from "tns-core-modules/text/formatted-string";
import { Fab } from "nativescript-floatingactionbutton";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import "../../Styles";
import { Size } from "../../Models/SelectionsModel"
import { cardStyle } from "../cardStyles";
import SelectionsViewModel from "~/ViewModels/SelectionsViewModel";
@observer
export default class Description extends React.Component <{ size: Size }> {
    
    private containerRef = React.createRef<StackLayout>();
    private bottomContainer = React.createRef<FlexboxLayout>();
    private checkBoxContainerRef = React.createRef<StackLayout>();
    private checkBox = new CheckBox();

    build(parent: StackLayout) {
        const container = this.containerRef.current;
        const index = parent.getChildIndex(container);
        parent.removeChild(container);
        this._buildBottom();
        const cardView = new CardView();
        cardView.applyStyle();
        cardView.content = container;
        parent.addChild(cardView);
    }

    _buildBottom() {
        this._buildCheckBox();
    }

    marginTop = 0;
    marginBottom = 5;
    marginSide = 15;
    private _buildCheckBox(): void {
        this.checkBox.on("onTap", () => {
            const selectedSize = SelectionsViewModel.get().selectionsModel.tjänst;
            if(selectedSize == this.props.size) {
                console.log("unselected");
                SelectionsViewModel.get().selectionsModel.tjänst = Size.unselected;
            } else {
                console.log("selected " + this.props.size);
                SelectionsViewModel.get().selectionsModel.tjänst = this.props.size;
            }
            
        })
        this.checkBox.borderColor = new Color('black');

        this.checkBox.scaleX = 1.4;
        this.checkBox.scaleY = 1.4;
        

        const checkBoxContainer = this.checkBoxContainerRef.current;
        checkBoxContainer.insertChild(this.checkBox, 0);
    }
    imageButtonSize = 30;
    imageButtonColor = new Color('purple');
    render() {
        const selectedSize = SelectionsViewModel.get().selectionsModel.tjänst;
        if(this.props.size === selectedSize) {
            setTimeout(() => {
                this.checkBox.checked = true;
            }, 0.000001);
        } else {
            setTimeout(() => {
                this.checkBox.checked = false;
            }, 0.000001);
        }
        return (
            <$StackLayout
                ref={this.containerRef}
                
            >
                <$Label
                    horizontalAlignment={"center"}
                    text={this._displayPrice()}
                    margin={5}
                    color={new Color('black')}
                    fontSize={cardStyle.titleSize}
                />
                <$TextView
                    text={this._displayDescription()}
                    textAlignment={"center"}
                    fontSize={14}
                    editable={false}
                    onLoaded={(ev) => {
                        const textView = ev.object as TextView;
                        // disabliing scroll
                        textView.scrollEnabled(false);
                        if(device.os == "Android") {
                            const editText = textView.android as android.widget.EditText;
                            // removes line under text
                            editText.setBackground(null);
                        }
                        
                        // removing default margin set (ios)
                        textView.noMargin();
                    }}
                    marginLeft={5}
                    marginRight={5}
                    />
                    <$FlexboxLayout justifyContent={"space-between"}
                        ref={this.bottomContainer}
                        marginTop={this.marginTop}
                        marginBottom={this.marginBottom}
                        marginLeft={this.marginSide}
                        marginRight={this.marginSide}
                        alignContent={"center"}
                    >    
                        <$StackLayout orientation={"horizontal"}
                            ref={this.checkBoxContainerRef}
                        >
                            <$Label
                                marginLeft={3}
                                text={"Välj"}
                                formattedText={this._getFormattedText()}
                                onLoaded={() => {
                                
                                }}
                                verticalAlignment={"middle"}
                            >
                            </$Label>
                            
                        </$StackLayout>
                            <$Button
                                borderRadius={45}
                                height={device.os === "iOS" ? 30 : null}
                                width={30}
                                margin={0}
                                
                            >
                                <$FormattedString>
                                    <$Span  color={new Color("black")} className={"car"} text={"\ue800"} fontSize={30} />
                                </$FormattedString>
                                
                            </$Button>                 
                    </$FlexboxLayout>
            </$StackLayout>
        );
    }
    // to set fontwieght bold // https://www.telerik.com/forums/bold-text-in-label
    _getFormattedText() {
        const formattedText = new FormattedString();
        formattedText.fontWeight = "600";
        const span = new Span();
        span.text = "Välj";
        formattedText.spans.push(span);
        span.color = new Color('black');
        return formattedText;
    }
    _displayPrice() {  
        const viewModel = ViewModel.get();
        if(viewModel.model) {
            const startAvgift = Number(viewModel.model.Avfallshamtning.startAvgift);
            const price = viewModel.getPrice(this.props.size);
            if(this.props.size == Size.little) {
                return price + " kr/m3";
            } else {
                return price + " kr";
            }
        }
        return "";
    }
    /* not needed - redundant info
    _displaySubtitle() {
        const viewModel = ViewModel.get();
        
    }
    */
    _displayDescription() {
        const viewModel = ViewModel.get();
        const model = viewModel.model;
        if(model) {
            // console.log("mzz: " + JSON.stringify(model));
            const size = this.props.size;
            const fastAvgift = viewModel.model.Avfallshamtning.startAvgift;
            if (size == Size.little) {
                 // note 
                return viewModel.getDescription(size) + `. Till priset tillkommer en grundavgift på ${fastAvgift} kr`;
            } else {
                return viewModel.getDescription(size) + `. Där grundavgift på ${fastAvgift} kr ingår priset`;
            }
        }
    }
}

/*
    <$Image 
                            src={"res://van"}
                            stretch={"fill"}
                            height={30}
                            width={30}
                        />
*/

// chekbox align issue: https://github.com/nstudio/nativescript-checkbox/issues/80 solver using stacklayout