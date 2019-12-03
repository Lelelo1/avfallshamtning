import { observable } from "mobx";
import { Size } from "~/Models/SelectionsModel";

// helper to keep a shared viewedSize instead of the props passed when managing checkbox checked
export class ServiceSelectionViewModel {
    private static instance: ServiceSelectionViewModel;
    static get(): ServiceSelectionViewModel {
        if(!ServiceSelectionViewModel.instance) {
            ServiceSelectionViewModel.instance = new ServiceSelectionViewModel();
        }
        return ServiceSelectionViewModel.instance;
    }

    @observable
    displayedSize: Size = Size.little;
}