import * as React from "react" ;
import { $FlexboxLayout, $Button, $Label, $FormattedString, $Span } from "react-nativescript";
import { FlexboxLayout, Button, Label, StackLayout, Image, Color } from "react-nativescript/dist/client/ElementRegistry";
import { FormattedString, Span } from "tns-core-modules/text/formatted-string";
import { fromAsset } from "tns-core-modules/image-source/image-source";
import { observable, autorun } from "mobx";
import { observer } from "mobx-react";
import { EventData } from "tns-core-modules/ui/frame/frame";

export class Content {
    text: string;
    css: string;
    glyph: string;
}
const buttonRefs: React.RefObject<Button> [] = [];

@observer
export default class SelectorComponent extends React.Component<{buttonContents: Content[]}> {
    
    private containerRef = React.createRef<FlexboxLayout>();
    
    @observable
    activeIndex = 0;
    
    activeColor = new Color("black");
    inactiveColor = new Color("silver");

    componentDidMount() {
        
        autorun(() => {
            const container = this.containerRef.current;
            if(this.activeIndex == 0) {
                const activeButton = buttonRefs[0].current;
                activeButton.backgroundColor = this.activeColor;
                const inactiveButton = buttonRefs[1].current;
                inactiveButton.backgroundColor = this.inactiveColor;
            } else {
                const activeButton = buttonRefs[1].current;
                activeButton.backgroundColor = this.activeColor;
                const inactiveButton = buttonRefs[0].current;
                inactiveButton.backgroundColor = this.inactiveColor;
            }   
        })
        
    }

    // iconTextSpace = 8; Can't. Using empty space in text instead...
    
    
    render() {
        const ref0 = React.createRef<Button>();
        const content0 = this.props.buttonContents[0];
        buttonRefs.push(ref0);
        const content1 = this.props.buttonContents[1];
        const ref1 = React.createRef<Button>();
        buttonRefs.push(ref1);
        return (
            <$FlexboxLayout
                ref={this.containerRef}
                flexDirection={"row"}
                justifyContent={"space-between"}
            >
                <$Button
                    ref={ref0}
                    onTap={() => {
                        this.activeIndex = 0
                    }}
                >
                    <$FormattedString
                        backgroundColor={new Color("transparent")}
                    >
                        <$Span text={content0.glyph} className={content0.css} />
                        <$Span text={"  " + content0.text} />
                    </$FormattedString>
                </$Button>
                <$Button
                    ref={ref1}
                    onTap={() => {
                        this.activeIndex = 1;
                    }}
                >
                    <$FormattedString
                        backgroundColor={new Color("transparent")}
                    >
                        <$Span text={content1.glyph} className={content1.css} />
                        <$Span text={" " + content1.text} />
                    </$FormattedString>
                </$Button>
            </$FlexboxLayout>
        )
    }
    // can't access this when using a separate render method for button with .map
}

// http://fontello.com

// Can't set margin 0 on android: https://stackoverflow.com/questions/57146409/removing-the-margin-of-a-button-on-android-using-nativescript