// https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json
import { Model, Selection, Selection2 } from "./Model";
import { observable, when } from "mobx";
import { Size } from "./Selection/size";
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
        }, (reason) => {
            console.log(reason);
        })
    }

    @observable
    region: Region = Region.västraGötaland;

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
            switch(size) {
                case (Size.quarter): {
                    return this.model.Avfallshamtning.VästraGötaland.selections[0];
                }
                case (Size.half) : {
                    return this.model.Avfallshamtning.VästraGötaland.selections[1];
                }
                case (Size.full) : {
                    return this.model.Avfallshamtning.VästraGötaland.selections[2];
                }
            }
        }
        return null;
    }
    getSelection2(size: Size): Selection2 {
        if(this.model) {
            switch(size) {
                case (Size.quarter): {
                    return this.model.Avfallshamtning.Blekinge.selections[0];
                }
                case (Size.half) : {
                    return this.model.Avfallshamtning.Blekinge.selections[1];
                }
                case (Size.full) : {
                    return this.model.Avfallshamtning.Blekinge.selections[2];
                }
            }
        }
        return null;
    }


    /* ui animations */

}
export enum Region {
    västraGötaland = "västraGötaland",
    blekinge = "Blekinge"
}
const res = {
    model: "https://avfallshamtningstoragea.blob.core.windows.net/avfallshamtningblob/avfallshamtning.json";
}
