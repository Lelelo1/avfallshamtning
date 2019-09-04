
import * as React from "react";
import { $FlexboxLayout, $Label, $TextView, $StackLayout } from "react-nativescript";
import { Size } from "./size";
import { FlexboxLayout, StackLayout, TextView } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "@nstudio/nativescript-cardview";
import ViewModel,{ Region } from "../ViewModel";
import { observer } from "mobx-react";
import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { observable } from "mobx";
import "../Extensions";
import { device } from "tns-core-modules/platform/platform";
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { FormattedString, Span } from "tns-core-modules/text/formatted-string";
@observer
export default class Description extends React.Component <{ size: Size }> {
    
    private containerRef = React.createRef<StackLayout>();
    private checkBoxContainerRef = React.createRef<StackLayout>();

    build(parent: StackLayout) {
        const container = this.containerRef.current;
        const index = parent.getChildIndex(container);
        parent.removeChild(container);
        const cardView = new CardView();
        // cardView.margin = 10;
        cardView.margin = 10;

        this._buildCheckBox();
        cardView.className = "cardStyle";
        cardView.borderWidth = 2;
        cardView.content = container;
        parent.addChild(cardView);

    }
    marginTop = 5;
    marginBottom = 10;
    private _buildCheckBox(): void {
        
        const checkBox = new CheckBox();
        checkBox.horizontalAlignment = "center"
        checkBox.borderColor = new Color('black');
        checkBox.marginLeft = 15;
        checkBox.marginBottom = this.marginBottom;
        checkBox.marginTop = this.marginTop;
        checkBox.scaleX = 1.4;
        checkBox.scaleY = 1.4;
        
        const checkBoxContainer = this.checkBoxContainerRef.current;
        checkBoxContainer.insertChild(checkBox, 0);
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
                    <$StackLayout
                        ref={this.checkBoxContainerRef}
                        orientation={"horizontal"}
                    >    
                        <$Label
                            marginLeft={3}
                            marginBottom={this.marginBottom}
                            marginTop={this.marginTop}
                            text={"Välj"}
                            formattedText={this._getFormattedText()}
                            onLoaded={() => {
                                
                            }}
                        >
                        </$Label>
                            
                    </$StackLayout>
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
        console.log("displayPrice");
        const model = ViewModel.get().model;
        if(model) {
            const selection = ViewModel.get().getSelection(this.props.size);
            if(selection) {
                const startAvgift = Number(model.Avfallshamtning.startAvgift);
                const grundAvgift = Number(selection.grundAvgift);
                const price = startAvgift + grundAvgift;
                switch(this.props.size) {
                    case Size.little : {
                        return price + " kr/m3";
                    }
                    case Size.half : {
                        return price + " kr";
                    }
                    case Size.full : {
                        return price + " kr";
                    }
                }   
            }
        }
        /*
        const selection = viewModel.getSelection(this.props.size);
        if(selection) {
            switch(this.props.size) {
                case Size.little : {
                    return selection.grundAvgift + startAvgift + " kr/m3"
                }
                case Size.half : {
                    return selection.grundAvgift + startAvgift + "kr";
                }
                case Size.full : {
                    return selection.grundAvgift + startAvgift + "kr";
                }
            }
        }
        */
       return "";
    }
    /* not needed - redundant info
    _displaySubtitle() {
        const viewModel = ViewModel.get();
        
    }
    */
    _displayDescription() {
        const selection = ViewModel.get().getSelection(this.props.size);
            return selection ? selection.description : null;
    }
}

// chekbox align issue: https://github.com/nstudio/nativescript-checkbox/issues/80 solver using stacklayout