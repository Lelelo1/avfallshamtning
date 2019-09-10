
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { device } from "tns-core-modules/platform/platform";
import { Color } from "tns-core-modules/color/color";

declare module "tns-core-modules/ui/text-field/text-field" {
    interface TextField {
        applyStyle(): void;
    }
}

TextField.prototype.applyStyle = function(this: TextField) {
    this.backgroundColor = commonStyle.backgroundColor;
    // this.borderColor = commonStyle.borderColor;
    this.margin = commonStyle.margin;
    if(device.os == "iOS") {
        this.className = iosStyle.className;
    } else if (device.os == "Android") {
        
    }
}

const iosStyle = { className: "input input-rounded m-t-10" };
const commonStyle = { backgroundColor: new Color('#ededed'), borderColor: ('#787878'), margin : 10 };
