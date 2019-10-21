import * as React from "react";
import { $FlexboxLayout, $Image, $StackLayout, $Label, $AbsoluteLayout, $GridLayout, $Button } from "react-nativescript";
import { Image } from "tns-core-modules/ui/image/image";
import { Label } from "tns-core-modules/ui/label/label";

import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { FlexboxLayout, ScrollView, StackLayout, GridLayout, AbsoluteLayout } from "react-nativescript/dist/client/ElementRegistry";
import viewModel, { Region } from "../ViewModels/ViewModel";
import { observer } from "mobx-react";
import { Carousel, CarouselItem } from "nativescript-carousel";
import { device } from "tns-core-modules/platform/platform";
// import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
@observer
export default class Title extends React.Component {

    private container = React.createRef<StackLayout>();
    private imageRef = React.createRef<Image>();
    private labelRef = React.createRef<Label>();
    labelText = "Västra Götaland";
    
    carousel(gridLayouts: GridLayout[]) {
        const carousel = new Carousel();
        carousel.height = 230;
        gridLayouts.forEach(element => {
            const carouselItem = new CarouselItem();
            // carouselItem.backgroundColor = new Color("green");
            // element.iosOverflowSafeArea = false;
            carouselItem.addChild(element);
            carousel.addChild(carouselItem);
            carousel.iosOverflowSafeArea = false; // // neccesery on ios: https://github.com/manijak/nativescript-carousel/issues/128
        });
        
        return carousel;
    }

    onTop(label: Label, src: string): GridLayout {
        const onTop = new GridLayout();
        
        const image = new Image();
        image.src = src;
        image.stretch = "fill"
        // image.verticalAlignment = "bottom";
        onTop.addChild(image);
        label.horizontalAlignment = "center";
        label.verticalAlignment = "middle";
        label.color = new Color('white');
        label.fontSize = 34;
        
        onTop.addChild(label);
        return onTop;
    }
    
    createImage(text: string, src: string): GridLayout {
        const label = new Label();
        label.text = text;
        label.alignSelf = "center"
        return this.onTop(label, src);
    }
    
    componentDidMount() {
        const goteborg = this.createImage("G ö t e b o r g", res.Göteborg);
        const ronneby = this.createImage("R o n n e b y", res.Ronneby);
        const carousel = this.carousel([goteborg, ronneby]);
        carousel.finite = true;
        
        // android indicator fix
        if(device.os === "iOS") {
            this.container.current.addChild(carousel);
        } else if(device.os === "Android") {
            const wrapped = new GridLayout();
            wrapped.addChild(carousel);
            this.container.current.addChild(wrapped);
        }
        
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
// ccould not get res:// putting images in drawable to work
// https://stackoverflow.com/questions/52623493/nativescript-angular-local-file-system-images-not-showing/52677716
const res = {
    // Göteborg: "res://goteborg",
    Göteborg: "res://goteborg",
    Ronneby: "res://ronneby"
}

// https://github.com/manijak/nativescript-carousel/issues/128