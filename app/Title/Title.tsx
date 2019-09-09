import * as React from "react";
import { $FlexboxLayout, $Image, $StackLayout, $Label, $AbsoluteLayout, $GridLayout, $Button } from "react-nativescript";
import { Image } from "tns-core-modules/ui/image/image";
import { Label } from "tns-core-modules/ui/label/label";

import { PercentLength, Color } from "tns-core-modules/ui/page/page";
import { FlexboxLayout, ScrollView, StackLayout, GridLayout, AbsoluteLayout } from "react-nativescript/dist/client/ElementRegistry";
import viewModel, { Region } from "../ViewModels/ViewModel";
import { observer } from "mobx-react";
import { Carousel, CarouselItem } from "nativescript-carousel";
// import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
@observer
export default class Title extends React.Component {

    private container = React.createRef<StackLayout>();
    private imageRef = React.createRef<Image>();
    private labelRef = React.createRef<Label>();
    labelText = "Västra Götaland"

    onTop(label: Label, src: string): GridLayout {
        const onTop = new GridLayout();
        
        const image = new Image();
        image.src = src;
        image.stretch = "fill"
        image.height = 250;
        onTop.addChild(image);
        label.horizontalAlignment = "center";
        label.color = new Color('white');
        label.fontSize = 34;
        onTop.backgroundColor = new Color('pink');
        // onTop.rowSpan = 0;
        onTop.addChild(label);
        return onTop;
    }
    
    carousel(gridLayouts: GridLayout[]) {
        const carousel = new Carousel();
        carousel.backgroundColor = new Color('blue');
        gridLayouts.forEach(element => {
            const carouselItem = new CarouselItem();
            // carouselItem.backgroundColor = new Color("green");
            carouselItem.addChild(element);
            carousel.addChild(carouselItem);
        });
        return carousel;
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

        this.container.current.addChild(carousel);
    }

    render() {

        const img = new Image();
        
        // get dimension to se fiting height: https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript

        return (
            <$StackLayout ref={this.container}>
                <$GridLayout rows={[]} columns={[]}>
                
                </$GridLayout>
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

// https://github.com/manijak/nativescript-carousel/issues/128