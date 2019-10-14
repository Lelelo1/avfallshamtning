import PersonInfoModel from "~/Models/FormModel";
import FormModel from "~/Models/FormModel";
import { observable } from "mobx";
import { TextField, Color } from "react-nativescript/dist/client/ElementRegistry";
import { commonStyle } from "../Form/FormStyles";
import { getString } from "tns-core-modules/application-settings/application-settings"
export default class FormViewModel {
    private static viewModel: FormViewModel = null;
    static get(): FormViewModel {
        if(FormViewModel.viewModel == null) {
            const savedForm = getString("formViewModel");
            FormViewModel.viewModel = savedForm ? JSON.parse(savedForm) : new FormViewModel();
        }
        return FormViewModel.viewModel;
    }

    constructor() {
        console.log("contructing formViewModel");
        this.formModel = new FormModel();
        
    }

    formModel: FormModel

    getTextFieldNotFilledText() {

    }
    @observable
    shouldDisplayTextFieldsStatus = false;

    // might add getters that return undefined / null / "" so properties can be invididually checked
    formIsValid(): boolean {
        const model = FormViewModel.get().formModel;

        if(model.namn && model.efternamn && model.mobilnummer &&
             /*model.epostaddress*/ model.gatuaddress && model.postnummer && model.ort) {
                 return true;
             }
        return false;
    }

    @observable
    hidden = true; 
    hide(): void { // <-- use
        this.hidden = false;
        this.hidden = true;
    }
    /*  there is some strange bug that this has to opened and saved to work */ 
    setStyle(textField: TextField, modelProperty: string | number, show: boolean ) {  

        // other checks - like is of email format etc
        //const evaluateProperty = modelProperty != null && modelProperty != undefined; && modelProperty != ""
        if(modelProperty && show) {
            // textField.borderColor = new Color("green");
            textField.borderColor = commonStyle.borderColor;
        } else if (!modelProperty && show) {
            textField.borderColor = new Color("red");
        } else {
            textField.borderColor = commonStyle.borderColor;
        }
    }
}



declare module "tns-core-modules/ui/layouts/stack-layout/stack-layout" {
    interface TextField {

    }
}