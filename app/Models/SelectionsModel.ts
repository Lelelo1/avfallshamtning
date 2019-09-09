import { Size } from "tns-core-modules/ui/page/page";
import { Avfall, Hantering, Hemma } from "~/ViewModels/SelectionsViewModel";

 
 export class SelectionsModel {
    tjänst: Size; // 1/4 bil eller mindrehämtning,  halvbil, helbil
    avfall: Avfall;
    hantering: Hantering;
    tid: string;
    hemma: Hemma;
    anvisning?: string; // required when hemma is false
    personnummer?: number; //required when hemma is false


    
    constructor(
       tjänst: Size,
       avfall: Avfall,
       hantering: Hantering,
       tid: string,
       hemma: Hemma, 
       anvisning?: string,
       personnummer?: number
       ) {
      this.tjänst = tjänst;
      this.avfall = avfall;
      this.hantering = hantering;
      this.tid = tid;
      this.hemma = hemma;
      if(anvisning && personnummer) {
         this.anvisning = anvisning;
         this.personnummer = personnummer;
      }
    }
    
 }
