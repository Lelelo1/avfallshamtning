import PersonInfoModel from "~/Models/FormModel";
import FormModel from "~/Models/FormModel";
import { observable } from "mobx";

export default class FormViewModel {
    private static viewModel: FormViewModel;
    static get(): FormViewModel {
        if(FormViewModel.viewModel == null) {
            FormViewModel.viewModel = new FormViewModel();
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
}



declare module "tns-core-modules/ui/layouts/stack-layout/stack-layout" {
    interface TextField {

    }
}