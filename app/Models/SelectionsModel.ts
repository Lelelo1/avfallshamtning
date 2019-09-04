 
 export class SelectionsModel {
    tjänst: string; // 1/4 bil eller mindrehämtning,  halvbil, helbil
    farligtAvfall: boolean;
    återvinn: boolean;
    hemma: boolean;
    anvisning?: string; // required when hemma is false
    personnummer?: number; //required when hemma is false

    constructor(
       tjänst: string,
       farligtAvfall: boolean,
       återvinn: boolean,
       hemma: boolean, 
       anvisning: string,
       ) {
      this.tjänst = tjänst;
      this.farligtAvfall = farligtAvfall;
      this.återvinn = återvinn;
      this.hemma = hemma;
      this.anvisning = anvisning;
    }
 }