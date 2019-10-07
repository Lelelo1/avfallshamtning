import PersonInfoModel from "./FormModel";
import SelectionsModel from "./SelectionsModel";

// test objects
export const test1 = {"Namn":"Leo","Efternamn":"Wetterek","Mobilnummer":"23434","Gatuaddress":"Majorsgatan1","Post nr":"Göteborg","Jag vill boka":"mindre hämtning","Hämtningen innehåller farligt avfall":"Ja","Ange önskad hämtningsdag och ca tid":"Torsdag kl 5","Jag är hemma när ni kommer?":"Nej"}

export const postModel = (person: PersonInfoModel, selections: SelectionsModel ) => {
    const postRecord: Record<string, string> = {
        "Namn": person.namn,
        "Efternamn": person.efternamn,
        "Mobilnummer": person.mobilnummer + "",
        "Gatuaddress": person.gatuaddress,
        "Post nr": person.ort,
        "Jag vill boka": selections.formattedTjänst(),
        "Hämtningen innehåller farligt avfall": selections.formattedAvfall(),
        "Ange önskad hämtningsdag och ca tid" : selections.formattedTid(),
        "Jag är hemma när ni kommer?": selections.formattedHemma(),
    }
    return postRecord;
}