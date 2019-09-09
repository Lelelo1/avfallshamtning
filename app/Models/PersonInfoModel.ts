export default class PersonInfoModel {
    name: string;
    efternam: string;
    mobilnummer: number;
    epostaddress: string;
    gatuaddress: string;
    postnummer: number;
    ort: string

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
}