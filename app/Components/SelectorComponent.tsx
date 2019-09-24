import * as React from "react" ;
import { $FlexboxLayout, $Button, $Label, $FormattedString, $Span } from "react-nativescript";
import { FlexboxLayout, Button, Label, StackLayout, Image, Color } from "react-nativescript/dist/client/ElementRegistry";
import { FormattedString, Span } from "tns-core-modules/text/formatted-string";
import { fromAsset } from "tns-core-modules/image-source/image-source";
import { observable, autorun } from "mobx";
import { observer } from "mobx-react";
import { EventData } from "tns-core-modules/ui/frame/frame";
import { Fragment } from "react";

export class Content {
    text: string;
    css: string;
    glyph: string;
    onTap: () => void;
}


@observer
export default class SelectorComponent extends React.Component<{buttonContents: Content[]}> {
    
    private containerRef = React.createRef<FlexboxLayout>();
    private buttonRefs: React.RefObject<Button> [] = [];

    // weird home card using slectorcomponent button null;
    private button0Ref = React.createRef<Button>();
    private button1Ref = React.createRef<Button>();

    @observable
    activeIndex = 0;
    
    activeColor = new Color("black");
    inactiveColor = new Color("silver");

    componentDidMount() {
        this.buttonRefs.push(this.button0Ref);
        this.buttonRefs.push(this.button1Ref);
        autorun(() => {
            const container = this.containerRef.current;
            console.log("index: " + this.activeIndex);
            if(this.activeIndex == 0) {
                const activeButton = this.buttonRefs[0].current;
                console.log("activeButton: " + activeButton);
                activeButton.backgroundColor = this.activeColor;
                const inactiveButton = this.buttonRefs[1].current;
                console.log("inactiveButton: " + inactiveButton);
                inactiveButton.backgroundColor = this.inactiveColor;
            } else {
                const activeButton = this.buttonRefs[1].current;
                console.log("activeButton: " + activeButton);
                activeButton.backgroundColor = this.activeColor;
                const inactiveButton = this.buttonRefs[0].current;
                console.log("inactiveButton: " + inactiveButton);
                inactiveButton.backgroundColor = this.inactiveColor;
            }   
        })
        
    }

    // iconTextSpace = 8; Can't. Using empty space in text instead...
    
    
    render() {
        const content0 = this.props.buttonContents[0];
        const content1 = this.props.buttonContents[1];
        return (
            <$FlexboxLayout
                ref={this.containerRef}
                flexDirection={"row"}
                justifyContent={"space-between"}
            >
                <$Button
                    ref={this.button0Ref}
                    onTap={() => {
                        this.activeIndex = 0
                        content0.onTap();
                    }}
                >
                    <$FormattedString
                        backgroundColor={new Color("transparent")}
                    >
                        <$Span text={content0.glyph} className={content0.css} />
                        <$Span text={this._getText(content0)} />
                    </$FormattedString>
                </$Button>
                <$Button
                    ref={this.button1Ref}
                    onTap={() => {
                        this.activeIndex = 1;
                        content0.onTap();
                    }}
                >
                    <$FormattedString
                        backgroundColor={new Color("transparent")}
                    >
                        <$Span text={content1.glyph} className={content1.css} />
                        <$Span text={this._getText(content1)} />
                    </$FormattedString>
                </$Button>
            </$FlexboxLayout>
        )
    }
    private _getText(content: Content) {
        if(content.glyph && content.css) {
            return "  " + content.text; // add spacing when has button has icon
        }
        return content.text;
    }
    /*
    _renderSpans = (content: Content): Span[] => {
        const spans: Span[] = [];
        
        if(content.glyph && content.css) {
            const icon = new Span();
            icon.text = content.glyph;
            icon.className = content.css
            spans.push(icon);
        }
        const label = new Span();
        label.text = content.text;
        spans.push(label);

        return spans;
    }
    */
   /*
   _renderSpans = (content: Content) => {
       return content.glyph && content.css ? (
           <Fragment>
               <$Span text={content.glyph} className={content.css} />
               <$Span text={"  " + content.text} />
           </Fragment>
       ) : (
            <$Span text={content.text} />
       )
   }
   */
    // can't access this when using a separate render method for button with .map
}

// http://fontello.com

// Can't set margin 0 on android: https://stackoverflow.com/questions/57146409/removing-the-margin-of-a-button-on-android-using-nativescript