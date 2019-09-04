import * as React from "react";
import { $FlexboxLayout, $Image, $StackLayout, $Label, $AbsoluteLayout, $GridLayout } from "react-nativescript";
import { Image } from "tns-core-modules/ui/image/image";
import { Label } from "tns-core-modules/ui/label/label";

import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { FlexboxLayout, ScrollView, StackLayout, GridLayout } from "react-nativescript/dist/client/ElementRegistry";
import viewModel, { Region } from "../ViewModel";
import { observer } from "mobx-react";

@observer
export default class Title extends React.Component {

    private container = React.createRef<StackLayout>();
    private imageRef = React.createRef<Image>();
    private labelRef = React.createRef<Label>();
    labelText = "Västra Götaland"

    getImg() {
        return res.Göteborg;
    }

    onTop(label: Label): void {
        const onTop = new GridLayout();
        
        const image = new Image();
        image.src = this.getImg();
        image.stretch = "aspectFit";
        
        onTop.addChild(image);
        label.horizontalAlignment = "center";
        label.color = new Color('white');
        label.fontSize = 34;
        onTop.addChild(label);
        this.container.current.addChild(onTop);
    }

    componentDidMount() {
        const label = new Label();
        label.text = "G ö t e b o r g";
        label.alignSelf = "center"
        this.onTop(label);
    }

    render() {

        const img = new Image();
        
        // get dimension to se fiting height: https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript

        return (
            <$StackLayout ref={this.container}>

            </$StackLayout>
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
    Göteborg: "res://goteborg",
    Ronneby: "res://ronneby"
}

/*
                <$Image
                        ref={this.imageRef}
                        src={this.getImg()}
                        backgroundColor={new Color('blue')}
                        stretch={"aspectFit"}
                        onLoaded={(ev) => {
                            // this.calculateImage();
                        }}
                    />
                <$Label text={this.labelText} />
*/