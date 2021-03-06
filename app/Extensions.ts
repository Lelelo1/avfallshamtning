
import { device } from "tns-core-modules/platform/platform";
import { TextField } from "@nativescript/core/ui/text-field/text-field";
import { TextView } from "@nativescript/core/ui/text-view/text-view";
import { Button } from "@nativescript/core/ui/button/button";
import { ScrollView } from "@nativescript/core/ui/scroll-view/scroll-view";
// import { $TextField } from "react-nativescript";

export enum AutofillHintContentType {
    name = "name",
    surname = "surname",
    mobileNumber = "mobileNumber",
    email = "email",
    address = "address",
    postalCode = "postalCode",
    place = "place",
    personnummer = "personnummer"
}

declare module "@nativescript/core/ui/text-field/" {
    interface TextField {
        // setPlaceholder(placeholder: string);
        setAutofillHintContentType(contentType: AutofillHintContentType);
        // placeholder: string;
    }
    // what name should i use?!
    // can't use enum when places here from ComponentExample class
}

TextField.prototype.setAutofillHintContentType = function(this: TextField, contentType: AutofillHintContentType) {

    const name = AutofillHintContentType.name;
    const surname = AutofillHintContentType.surname;
    const mobileNumber = AutofillHintContentType.mobileNumber;
    const email = AutofillHintContentType.email;
    const address = AutofillHintContentType.address;
    const postalCode = AutofillHintContentType.postalCode;
    const place = AutofillHintContentType.place;
    const personnummer = AutofillHintContentType.personnummer;

    let uiTextField: UITextField = null;
    if(device.os == "iOS") {
        uiTextField = this.ios as UITextField;
    }
    let editText: android.widget.EditText = null;
    if(device.os == "Android") {
        editText =this.android as android.widget.EditText;
    }

    switch(contentType) {
        case name: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${name} textfield`);   
                uiTextField.textContentType = UITextContentTypeGivenName;
            } else if (device.os == "Android") {
                console.log(`setting up android ${name} textfield`);
            }
            break;
        }
        case surname: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${surname} textfield`);  
                uiTextField.textContentType = UITextContentTypeFamilyName;
            } else if (device.os == "Android") {
                console.log(`setting up android ${surname} textfield`);
            }
            break;
        }
        case mobileNumber: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${mobileNumber} textfield`); 
                uiTextField.textContentType = UITextContentTypeTelephoneNumber // is mobile         
            } else if (device.os == "Android") {
                console.log(`setting up android ${mobileNumber} textfield`);
            }
            break;
        }
        case email: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${email} textfield`);  
                uiTextField.textContentType = UITextContentTypeEmailAddress;        
            } else if (device.os == "Android") {
                console.log(`setting up android ${email} textfield`);
            }
            break;
        }
        case address: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${address} textfield`);  
                uiTextField.textContentType = UITextContentTypeFullStreetAddress // what is 1 and 2?        
            } else if (device.os == "Android") {
                console.log(`setting up android ${address} textfield`);
            }
            break;
        }
        case postalCode: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${postalCode} textfield`);
                uiTextField.textContentType = UITextContentTypePostalCode;          
            } else if (device.os == "Android") {
                console.log(`setting up android ${postalCode} textfield`);
            }
            break;
        }
        case place: {
            if(device.os == "iOS") {
                console.log(`setting up ios ${place} textfield`);
                uiTextField.textContentType = UITextContentTypeAddressCity;          
            } else if (device.os == "Android") {
                console.log(`setting up android ${place} textfield`);
            }
            break;
        }
        case personnummer: {
            /* apple/google doesn't save personnummer/ personal identity number*/
            if(device.os == "iOS") {
                console.log(`setting up ios ${personnummer} textfield`);
                     
            } else if (device.os == "Android") {
                console.log(`setting up android ${personnummer} textfield`);
            }
        }
    }
}

// ios predictive area not showing swedish keyboard: https://forums.developer.apple.com/message/375445#375445

// textContentTypes
/* https://developer.apple.com/documentation/uikit/uitextcontenttype?language=objc */
// autofiltlHints
// https://developer.android.com/reference/android/view/View.html#setAutofillHints(java.lang.String...) 

declare module "@nativescript/core/ui/text-view/text-view" {
    interface TextView {
        scrollEnabled(yes: boolean): void;
        noMargin() : void
    }
}
TextView.prototype.scrollEnabled = function(this: TextView, yes: boolean) {
    if(device.os == "iOS") {
        const uiTextView = this.ios as UITextView;
        uiTextView.scrollEnabled = yes;
    } else if (device.os == "Android") {
        const editText = this.android as android.widget.EditText;
        editText.setVerticalScrollBarEnabled(yes);
        editText.setHorizontalScrollBarEnabled(yes);
    }
}
TextView.prototype.noMargin = function(this: TextView ) {
    if(device.os == "iOS") { // nativescript margin does not effect iostextview
        const uiTextView = this.ios as UITextView;
        uiTextView.textContainerInset = UIEdgeInsetsZero;
    } else if (device.os == "Android") {
        const editText = this.android as android.widget.EditText;
        // is nomargin needed for android. its padding on android.
        editText.setPadding(0, 0, 0, 0);
    }
}

declare module "@nativescript/core/ui/button/button" {
    interface Button {
        setTextTransparent(): void
    }
}

Button.prototype.setTextTransparent = function(this: Button) {
    this.once(Button.loadedEvent, () => {
        console.log(Button.loadedEvent + " zzz"); // same as "loaded"
        if(device.os == "iOS") {
            const uiButton = this.ios as UIButton;
            uiButton.setTitleColorForState(UIColor.clearColor, UIControlState.Normal);
        } else if (device.os == "Android") {
            const androidButton = this.android as android.widget.Button;
            androidButton.setTextColor(android.graphics.Color.TRANSPARENT);
        }
    })
}

declare module "@nativescript/core/ui/scroll-view/scroll-view" {
    interface ScrollView {
        addMissingTouchEffectiOS(): void;
        enableScrollOverControlsiOS(): void
    }
}

ScrollView.prototype.addMissingTouchEffectiOS = function(this: ScrollView) {
    // https://stackoverflow.com/questions/25088042/ios-button-tap-animation-in-uiscrollview
    const uiScrollView = this.ios as UIScrollView;
    uiScrollView.delaysContentTouches = false;
}
ScrollView.prototype.enableScrollOverControlsiOS = function(this: ScrollView) {
    // https://stackoverflow.com/questions/3512563/scrollview-not-scrolling-when-dragging-on-buttons
    const uiScrollView = this.ios as UIScrollView;
    uiScrollView.canCancelContentTouches = true;
    uiScrollView.touchesShouldCancelInContentView = (view) => {
        if(view as UITextField) {
            return true;
        }
        return false;;
    }
}