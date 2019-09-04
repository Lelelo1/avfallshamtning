// https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json

import { observable, when } from "mobx";
import { Size } from "./Selection/size";
import { Model, Selection} from "./Models/Model";
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
            this.model = value;
            console.log("model set: " + JSON.stringify(this.model));
        }, (reason) => {
            console.log(reason);
        })
    }

    @observable 
    model: Model = null
    getModel(): Model {
        if(this.model == null) {
            this._fetchModel(); // just in case first fetch was not succesfull
        }
        return this.model;
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

    getSelection(size: Size): Selection {
        // model = ViewModel.get().getModel();
        if(this.model) {
            console.log("switch size: " + size + " and " + this.model.Avfallshamtning.selections[0]);
            switch(size) {
                case (Size.little): {
                    return this.model.Avfallshamtning.selections[0];
                }
                case (Size.half) : {
                    return this.model.Avfallshamtning.selections[1];
                }
                case (Size.full) : {
                    return this.model.Avfallshamtning.selections[2];
                }
            }
        }
        return null;
    }
    @observable
    selectedSize: Size = null;



    // https://docs.nativescript.org/ui/professional-ui-components/DataForm/GettingStarted/dataform-start-source

    /* make a observable PersonInfoModel object */

    /* make a observable SelectionsModelobject*/

        /* ui animations */
}
export enum Region {
    göteborg = "Göteborg",
    blekinge = "Blekinge"
}
const res = {
    model: "https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json";
}

// code2flow visualera 