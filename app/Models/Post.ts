import PersonInfoModel from "./FormModel";
import SelectionsModel from "./SelectionsModel";

class Property {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

// test object
const test1: Property[] = [
    new Property("Namn", "Leo"),
    new Property("Efternamn", "Wetterek"),
    new Property("Mobilnummer", "23434"),
    new Property("Gatuaddress", "Majorsgatan1"),
    new Property("Post nr", "Göteborg"),
    new Property("Jag vill boka", "mindre hämtning"),
    new Property("Hämtningen innehåller farligt avfall","Ja"),
    new Property("Ange önskad hämtningsdag och ca tid", "Torsdag kl 5"),
    new Property("Jag är hemma när ni kommer?", "Nej")
];

export const postModel = (person: PersonInfoModel, selections: SelectionsModel, isHome = true ) => {
    const postPropertyList: Property[] = [
        new Property("Namn", person.namn),
        new Property("Efternamn", person.efternamn),
        /* mejladdress not needed */
        new Property("Mobilnummer", person.mobilnummer),
        new Property("Gatuaddress", person.gatuaddress),
        new Property("Post nr", person.postnummer),
        new Property("Ort", person.ort),
        new Property("Jag vill boka", selections.formattedTjänst()),
        new Property("Hämtningen innehåller farligt avfall", selections.formattedAvfall()),
        new Property("Ange önskad hämtningsdag och ca tid" , selections.formattedTid()),
        new Property("Jag är hemma när ni kommer?", selections.formattedHemma())
    ];
    if(!isHome) {
        postPropertyList.push(
            new Property("Ge en anvisning om var vi kan hitta avfallet", selections.anvisning)
            );
        postPropertyList.push(
            new Property("Personnummer för fakturering", selections.personnummer)
        );
    }
    
    return formattedPost(postPropertyList);
}
const formattedPost = (postPropertyList: Property[]) : string => {
    let post = "";
    
    postPropertyList.forEach(element => {
        post += element.key + ": " + element.value + "\n"; // will make a new line at the end - doesn't matter though
        console.log("post: " + post);
    });

    return post;
}