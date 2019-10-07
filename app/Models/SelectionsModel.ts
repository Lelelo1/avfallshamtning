import { observable } from "mobx";

 
export default class SelectionsModel {
   @observable 
   tjänst: Size; // 1/4 bil eller mindrehämtning,  halvbil, helbil
   
   @observable
   hemma: Hemma = Hemma.ja;
   @observable
   personnummer?: number;
   @observable
   anvisning?: string;

   @observable
   hantering: Hantering = Hantering.kassera;

   @observable
   avfall: Avfall = Avfall.ofarligt;
    
   @observable
   tid: string;

   formattedTjänst() {
      if(this.tjänst == Size.little) return "mindre hämtning" // or 1/4 bil;
      if(this.tjänst == Size.half) return "Halv bil";
      if(this.tjänst == Size.full) return "Hel bil"
   }
   formattedAvfall() {
      if(this.avfall == Avfall.farligt) return "Ja";
      if(this.avfall == Avfall.ofarligt) return "Nej";
   }
   formattedHantering() {
      if(this.hantering == Hantering.kassera) return "Kassera allt" // check this
      if(this.hantering == Hantering.återvinn) return "Återvinn det som kan återvinnas";
   }
   formattedTid() {
      return this.tid;
   }
   formattedHemma() {
      if(this.hemma == Hemma.ja) return "Ja";
      if(this.hemma == Hemma.nej) return "Nej";
   }
 }

 export enum Size {
   "little" = "little",
   "half" = "half",
   "full" = "full"
}
export enum Avfall {
   ofarligt = "ofarligt",
   farligt = "farligt"
}
export enum Hantering {
   kassera = "kassera",
   återvinn = "återvinn"
}
export enum Hemma {
   ja = "ja",
   nej = "nej"
}