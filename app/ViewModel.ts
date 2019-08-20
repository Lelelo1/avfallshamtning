// https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json
import { observable, when } from "mobx";
export default class ViewModel {
    private static viewModel: ViewModel;
    static get(): ViewModel {
        if(ViewModel.viewModel == null) {
            ViewModel.viewModel = new ViewModel();
        }
        return ViewModel.viewModel;
    }

    constructor() {
        console.log("contructing viewmodel");
        
        // kolla contact
        // get location nearest

    }



    @observable
    region: region = region.västraGötaland;

    @observable
    private _address: string = null;
    get address(): string {
        return this._address;
    }
    
    /*
    set address(string address): string {
        // return this._address;
    }
    */


    /* ui animations */

}
export enum region {
    västraGötaland = "västraGötaland",
    blekinge = "Blekinge"
}
