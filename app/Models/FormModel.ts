import { observable } from "mobx";

export default class FormModel {
    @observable
    namn: string;
    @observable
    efternamn: string;
    @observable
    mobilnummer: string;
    @observable
    epostaddress: string;
    @observable
    gatuaddress: string;
    @observable
    postnummer: string;
    @observable
    ort: string
    constructor() {

    }
    /*
    constructor(
        name: string,
        efternamn: string,
        mobilnummer: number,
        epostaddress: string,
        gatuaddress: string,
        postnummer:number,
        ort: string
        ) {
        this.name = name;
        this.efternam = efternamn;
        this.mobilnummer = mobilnummer;
        this.epostaddress = epostaddress;
        this.gatuaddress = gatuaddress;
        this.postnummer = postnummer;
        this.ort = ort;
    }
    */
}