import * as React from "react";
import { $StackLayout, $FlexboxLayout, $Label, $Switch } from "react-nativescript";
import SelectorComponent, { Content } from "~/Components/SelectorComponent";
import { StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import { CardView } from "@nstudio/nativescript-cardview";
import { cardStyle } from "../cardStyles";


export default class Hantering extends React.Component {

    containerRef = React.createRef<StackLayout>();

    componentDidMount() {
        this.buildCard();
    }
    buildCard() {
        const container = this.containerRef.current;
        const content = container.getChildAt(0);
        container.removeChild(content);
        const card = new CardView();
        card.content = content;
        card.applyStyle();
        container.addChild(card);
    }
    render() {
        return (
            <$StackLayout 
                ref={this.containerRef}
            >
                <$FlexboxLayout
                    margin={5}
                    justifyContent={"center"}
                    flexDirection={"column"}
                >
                    <$Label
                        text={"Hur vill du att vi hanterar avfallet?"}
                        alignSelf={"center"}
                        fontSize={cardStyle.titleSize}
                    />
                    <SelectorComponent
                        buttonContents={[ this.discardButton(), this.recycleButton()]}
                    />
                </$FlexboxLayout>
            </$StackLayout>
        )
    }
    discardButton(): Content {
        const discard = new Content();
        discard.text = "Kassera allt";
        discard.glyph = "\ue801";
        discard.css = "discard";
        discard.onTap = () => {
            console.log("selected discard/kassera");
        }
        return discard;
    }
    recycleButton(): Content {
        const recycle= new Content();
        recycle.text = "Återvinn";
        recycle.glyph = "\uf1b8";
        recycle.css = "recycle";
        recycle.onTap = () => {
            console.log("selected recycle/återvinn");
        }
        return recycle;
    }
}