import { observable } from "mobx";
import SelectionsModel, { Size, Hemma } from "~/Models/SelectionsModel";

export default class SelectionsViewModel {
    private static viewModel: SelectionsViewModel = null;
    static get(): SelectionsViewModel {
        if(SelectionsViewModel.viewModel === null) {
            SelectionsViewModel.viewModel = new SelectionsViewModel();
        }
        return SelectionsViewModel.viewModel;
    }

    constructor() {
        console.log("contructing selectionsViewModel");
        this.selectionsModel = new SelectionsModel();
        this.selectionsModel.tjänst = Size.unselected;
    }

    selectionsModel: SelectionsModel;
   
    @observable
    shouldDisplayTextFieldsStatus = false;

    @observable
    showToast = false;
    selectionsIsValid() {
        let isValid = true;
        if(this.selectionsModel.hemma === Hemma.nej) {
            if(!this.selectionsModel.personnummer) isValid = false;
            if(!this.selectionsModel.anvisning) isValid = false;
        }
        if(this.selectionsModel.tjänst == Size.unselected) isValid = false;
        if(!this.selectionsModel.tid) isValid = false;
        return isValid;
    }
    serviceNotSelected() {
        if(this.selectionsModel.tjänst == Size.unselected) return true;
    }
}