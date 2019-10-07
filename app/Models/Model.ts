export interface Selection {
    title: string;
    price: string;
    subtitle: string;
    description: string;
}

export interface Avfallshamtning {
    startAvgift: string;
    selections: Selection[];
    carInfo: string;
    hamtningEfter18: string;
    placePayment: string;
    awayPayment: string;
}

export interface Model {
    Avfallshamtning: Avfallshamtning;
}
