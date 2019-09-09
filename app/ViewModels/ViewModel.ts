// https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json

import { observable, when } from "mobx";
import { Size } from "../ViewModels/SelectionsViewModel"
import { Model, Selection} from "../Models/Model";
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
   private _getSelection(size: Size): Selection {
        const { selections } = this.model.Avfallshamtning;
        switch (size) {
            case (Size.little) : {
                return selections[0];
            }
            case (Size.half) : {
                return selections[1];
            }
            case (Size.full) : {
                return selections[2];
            }
        }
   }
    getPrice(size: Size): number {
        return Number(this._getSelection(size).price);
    }
    getDescription(size: Size): string {
        return this._getSelection(size).description;
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