import { CardView } from "@nstudio/nativescript-cardview";
import { TextView } from "react-nativescript/dist/client/ElementRegistry";

declare module "@nstudio/nativescript-cardview" {
    interface CardView {
        applyStyle(): void;
    }
}

CardView.prototype.applyStyle = function(this: CardView) {
    this.className = "cardStyle";
    this.margin = cardStyle.margin;
    this.borderWidth = cardStyle.borderWidth;
}

const cardStyle = { className: "cardStyle" , margin: 10, borderWidth: 2, };