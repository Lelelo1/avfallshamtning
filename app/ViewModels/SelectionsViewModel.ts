
export default class SelectionsViewModel {
    private static viewModel: SelectionsViewModel;
    static get(): SelectionsViewModel {
        if(SelectionsViewModel.viewModel == null) {
            SelectionsViewModel.viewModel = new SelectionsViewModel();
        }
        return SelectionsViewModel.viewModel;
    }

    constructor() {
        console.log("contructing selectionsViewModel");
    }

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