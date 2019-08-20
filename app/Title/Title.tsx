import * as React from "react";
import { $FlexboxLayout, $Image, $StackLayout, $Label, $AbsoluteLayout } from "react-nativescript";
import { Image } from "tns-core-modules/ui/image/image";
import { Label } from "tns-core-modules/ui/label/label";
import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { FlexboxLayout, ScrollView } from "react-nativescript/dist/client/ElementRegistry";
import viewModel, { region } from "../ViewModel";
import { observer } from "mobx-react";

@observer
export default class Title extends React.Component {

    private imageRef = React.createRef<Image>();
    private labelRef = React.createRef<Label>();
    labelText = "Västra Götaland"
    
    getImg() {
        return viewModel.get().region == region.västraGötaland ? res.västraGötaland : res.Blekinge;
    }

    render() {

        const img = new Image();
        
        // get dimension to se fiting height: https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript

        return (
            <$Image
                        ref={this.imageRef}
                        src={this.getImg()}
                        backgroundColor={new Color('blue')}
                        stretch={"aspectFill"}
                        onTap={(ev) => {
                            console.log("taaap");
                            if(viewModel.get().region == region.västraGötaland) {
                                viewModel.get().region = region.blekinge;
                            } else {
                                
                                viewModel.get().region = region.västraGötaland;
                            }
                        }}
                        onLoaded={(ev) => {
                            // this.calculateImage();

                        }}
                    />
        )
    }
    // calculate width from given height maintining aspect ratio
    calculateImage() {
        const image = this.imageRef.current;
        const width = image.getMeasuredWidth()
        let height = image.getMeasuredHeight();
        const ratio = width / height;
        console.log("ratio: " + ratio + ", width: " + width + " and height: " + height);
        // image.stretch = "fill";
        height = 230;
        image.height = height;
        image.width = height * ratio;
    }
}
const res = {
    västraGötaland: "res://VästraGötaland",
    Blekinge: "res://Blekinge"
}