
import * as React from "react";
import { $FlexboxLayout, $Label, $TextView, $StackLayout, $Button, $Image } from "react-nativescript";
import { FlexboxLayout, StackLayout, TextView, GridLayout, Image, ActionItem } from "react-nativescript/dist/client/ElementRegistry";
import { Button } from "tns-core-modules/ui/button/button";
import { CardView } from "@nstudio/nativescript-cardview";
import ViewModel from "../../ViewModels/ViewModel";
import { observer } from "mobx-react";
import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { observable } from "mobx";
import "../../Extensions";
import { device } from "tns-core-modules/platform/platform";
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { FormattedString, Span } from "tns-core-modules/text/formatted-string";
import { Fab } from "nativescript-floatingactionbutton";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import "../../Styles";
import { Size } from "../../ViewModels/SelectionsViewModel";
import { cardStyle } from "../cardStyles";
@observer
export default class Description extends React.Component <{ size: Size }> {
    
    private containerRef = React.createRef<StackLayout>();
    private bottomContainer = React.createRef<FlexboxLayout>();
    private checkBoxContainerRef = React.createRef<StackLayout>();


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
        this._buildImageButton();
    }

    marginTop = 5;
    marginBottom = 10;
    marginSide = 15;
    private _buildCheckBox(): void {
        
        const checkBox = new CheckBox();
        checkBox.verticalAlignment = "middle";
        checkBox.borderColor = new Color('black');

        checkBox.scaleX = 1.4;
        checkBox.scaleY = 1.4;
        
        const checkBoxContainer = this.checkBoxContainerRef.current;
        checkBoxContainer.insertChild(checkBox, 0);
    }
    imageButtonSize = 30;
    imageButtonColor = new Color('purple');
    private _buildImageButton() {
        
        const imageButton = new GridLayout();
        const image = new Image();
        image.src = "res://van";
        const size = this.imageButtonSize;
        image.width = size
        image.height = size
        
        const button = new Button();
        button.width = size * 1.5;
        button.height = size * 1.2;
        button.borderRadius = 10;
        button.backgroundColor = this.imageButtonColor;
        button.opacity = 0.5;

        button.addEventListener("touch", (event: TouchGestureEventData) => {
            if(event.action == "down") {
                button.backgroundColor = new Color("transparent");
                image.opacity = 0;
            } else {
                button.backgroundColor = this.imageButtonColor;
                image.opacity = 1;
            }
        });
        imageButton.addChild(image);
        imageButton.addChild(button);
        imageButton.horizontalAlignment = "right";
        this.bottomContainer.current.addChild(imageButton);
        
       /*
        const actionItem = new ActionItem();
        actionItem.icon = "src://van";
        actionItem.effectiveWidth = 30;
        this.bottomContainer.current.addChild(actionItem);
        */
       /*
       const fab = new Fab();
       fab.icon = "res://van";
       fab.width = 40;
       fab.height = 40;
// alpha color
       this.bottomContainer.current.addChild(fab);
       fab.addEventListener("onTap", () => {
           console.log(" tapp");
       })
       */
        // trye // tns plugin add nativescript-floatingactionbutton
       /*
        const button = new Button();
        const formattedtext = new FormattedString();
        const span = new Span();
        span
       */
    }
    render() {
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

                    />
                    <$FlexboxLayout justifyContent={"space-between"}
                        ref={this.bottomContainer}
                        marginTop={this.marginTop}
                        marginBottom={this.marginBottom}
                        marginLeft={this.marginSide}
                        marginRight={this.marginSide}
                        
                    >    
                        <$StackLayout orientation={"horizontal"}
                            ref={this.checkBoxContainerRef}
                        >
                            <$Label
                                verticalAlignment={"middle"}
                                marginLeft={3}
                                text={"Välj"}
                                formattedText={this._getFormattedText()}
                                onLoaded={() => {
                                
                                }}
                            >
                            </$Label>
                        </$StackLayout>                    
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
            console.log("mzz: " + JSON.stringify(model));
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