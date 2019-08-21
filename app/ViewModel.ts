// https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json
import { Model } from "./Model";
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
        this._fetchModel();
    }

    private _fetchModel() {
        fetch(res.model).then((res) => {
            return res.json();
        }).then((value) => {
            this._model = value;
        }, (reason) => {
            console.log(reason);
        })
    }

    @observable
    region: Region = Region.västraGötaland;

    @observable 
    private _model: Model = null
    getModel(): Model {
        if(this._model == null) {
            this._fetchModel(); // just in case first fetch was not succesfull
        }
        return this._model;
    } 

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
export enum Region {
    västraGötaland = "västraGötaland",
    blekinge = "Blekinge"
}
const res = {
    model: "https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json";
}
