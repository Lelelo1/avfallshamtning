

import * as React from "react";
import { $FlexboxLayout, $Label, $TextView, $StackLayout, $Button, $FormattedString, $Span } from "react-nativescript";
import { CardView } from "@nstudio/nativescript-cardview";
import ViewModel from "../../ViewModels/ViewModel";
import { observer } from "mobx-react";
import { observable, } from "mobx";
import "../../Extensions";
import { device } from "tns-core-modules/platform/platform";
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { Fab } from "nativescript-floatingactionbutton";
import "../../Styles";
import { Size } from "../../Models/SelectionsModel"
import { cardStyle } from "../cardStyles";
import SelectionsViewModel from "~/ViewModels/SelectionsViewModel";

// for showing carinfo
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle
} from 'nativescript-cfalert-dialog';
import { StackLayout } from "@nativescript/core/ui/layouts/stack-layout/stack-layout";
import { FlexboxLayout } from "@nativescript/core/ui/layouts/flexbox-layout/flexbox-layout";
import { Color } from "@nativescript/core/color/color";
import { TextView } from "@nativescript/core/ui/text-view/text-view";
import { FormattedString, Span } from "@nativescript/core/text/formatted-string";


@observer
export default class Description extends React.Component<{ size: Size }> {
    @observable
    private shouldDisplayCarInfo = false;

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

    marginTop = 10;
    marginBottom = 10;
    marginSide = 15;
    private _buildCheckBox(): void {
        this.checkBox.borderColor = new Color('black');
        this.checkBox.verticalAlignment = "middle";
        this.checkBox.scaleX = 1.4;
        this.checkBox.scaleY = 1.4;

        if (device.os == "Android") this.checkBox.on("onTap", this._selectService);
        // Due to tap event is passed through the checkbox and received on stacklayout on iOS, the state of the checkbox can be handled completely manually handled
        // on android the tap listener doen't fire and the check box looks different if enabled is set to false
        if(device.os == "iOS") this.checkBox.isEnabled = false;  
        const checkBoxContainer = this.checkBoxContainerRef.current;

        checkBoxContainer.insertChild(this.checkBox, 0);
    }
    imageButtonSize = 30;
    imageButtonColor = new Color('purple');
    render() {
        const selectedSize = SelectionsViewModel.get().selectionsModel.tjänst;
        
        if(device.os == "iOS") {
            if (this.props.size === selectedSize) {
                // this.checkBox.checked = true;
                if(!this.checkBox.checked) this.checkBox.toggle();
            } else {
                // this.checkBox.checked = false;
                if(this.checkBox.checked) this.checkBox.toggle();
            }
        } else if (device.os == "Android") {
            // needed as having to use the tap event handler on the checkbox on android
            setTimeout(() => {
                if (this.props.size === selectedSize) { 
                    if(!this.checkBox.checked) this.checkBox.toggle();
                } else {
                    if(this.checkBox.checked) this.checkBox.toggle();
                }
            }, 200);
        }
        /*
        if (this.props.size === selectedSize) {
            setTimeout(() => {
                if(device.os === "iOS") {
                    this.checkBox.checked = true;
                } else if(device.os === "Android") {
                    // this.checkBox.toggle();
                    if(!this.checkBox.checked) this.checkBox.toggle();
                }
            }, 200);
        } else {
            setTimeout(() => {
                if(device.os === "iOS") {
                    this.checkBox.checked = false;
                } else if(device.os === "Android") {
                    // this.checkBox.toggle();
                    if(this.checkBox.checked) this.checkBox.toggle();
                }
            }, 200);
        }
        */
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
                        if (device.os == "Android") {
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
                    marginRight={this.marginSide}
                    alignContent={"center"}
                >
                    <$StackLayout orientation={"horizontal"}
                        ref={this.checkBoxContainerRef}
                        paddingLeft={this.marginSide}
                        onTap={device.os == "iOS" ? this._selectService : undefined}
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
                        onTap={() => {
                            console.log("tap carInfo");
                            const options: DialogOptions = {
                                dialogStyle: CFAlertStyle.BOTTOM_SHEET,
                                title: "Bilen",
                                textAlignment: CFAlertGravity.CENTER_HORIZONTAL,
                                backgroundColor: "#1A000000",
                                message: this._displayCarInfo()
                            }
                            let cfalertDialog = new CFAlertDialog();
                            cfalertDialog.show(options);
                        }}
                    >
                        <$FormattedString>
                            <$Span color={new Color("black")} className={"car"} text={"\ue800"} fontSize={30} />
                        </$FormattedString>

                    </$Button>
                </$FlexboxLayout>

            </$StackLayout>
        );
    }
    _selectService = () => {
        const selectedSize = SelectionsViewModel.get().selectionsModel.tjänst;
        if (selectedSize == this.props.size) {
            console.log("unselected");
            SelectionsViewModel.get().selectionsModel.tjänst = Size.unselected;
        } else {
            console.log("selected " + this.props.size);
            SelectionsViewModel.get().selectionsModel.tjänst = this.props.size;
        }
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
        if (viewModel.model) {
            const startAvgift = Number(viewModel.model.Avfallshamtning.startAvgift);
            const price = viewModel.getPrice(this.props.size);
            if (this.props.size == Size.little) {
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
        if (model) {
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
    _displayCarInfo() {
        const model = ViewModel.get().model;
        if (model) {
            return model.Avfallshamtning.carInfo;
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