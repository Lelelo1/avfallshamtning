



import { TextField } from "@nativescript/core/ui/text-field/text-field";
import { device } from "@nativescript/core/platform/platform";
import { Color } from "@nativescript/core/color/color";

declare module "@nativescript/core/ui/text-field/text-field" {
    
    interface TextField {
        applyStyle(modelProperty: string | number): void;
    }
}
/* don't use in forms*/
TextField.prototype.applyStyle = function(this: TextField, modelProperty: string | number) {
    this.backgroundColor = commonStyle.backgroundColor;
    // this.borderColor = commonStyle.borderColor; <-- handled by dynamic style in Form.tsx
    this.margin = commonStyle.margin;
    this.marginLeft = commonStyle.marginLeft;
    this.marginRight = commonStyle.marginRight;

    if(device.os == "iOS") {
        this.className = iosStyle.className;
    } else if (device.os == "Android") {
        this.borderWidth = commonStyle.androidBorderWidth;
    }
    console.log("style applied");
}

export const iosStyle = { className: "input input-rounded m-t-10" };
export const commonStyle = { backgroundColor: new Color('#ededed'), borderColor: ('#787878'), margin : 2, marginLeft : 10, marginRight: 10, androidBorderWidth: 0.5 };
