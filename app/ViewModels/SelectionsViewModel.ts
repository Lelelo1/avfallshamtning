import { observable } from "mobx";

export default class SelectionsViewModel {
    private static viewModel: SelectionsViewModel = null;
    static get(): SelectionsViewModel {
        if(SelectionsViewModel.viewModel == null) {
            SelectionsViewModel.viewModel = new SelectionsViewModel();
        }
        return SelectionsViewModel.viewModel;
    }

    constructor() {
        console.log("contructing selectionsViewModel");
    }

    @observable
    hemma: Hemma = Hemma.nej;

}

export enum Size {
    "little" = "little",
    "half" = "half",
    "full" = "full"
}
export enum Avfall {
    ofarligt = "ofarligt",
    farligt = "farligt"
}
export enum Hantering {
    kassera = "kassera",
    återvinn = "återvinn"
}
export enum Hemma {
    ja = "ja",
    nej = "nej"
}