export interface Selection {
    title: string;
    price: string;
    subtitle: string;
    description: string;
}

export interface VästraGötaland {
    selections: Selection[];
    carInfo: string;
}

export interface Selection2 {
    title: string;
    price: string;
    subtitle: string;
    description: string;
    descriptionNoRUT: string;
}

export interface Blekinge {
    selections: Selection2[];
    carInfo: string;
}

export interface Avfallshamtning {
    VästraGötaland: VästraGötaland;
    Blekinge: Blekinge;
    RUTInfo: string;
}

export interface Model {
    Avfallshamtning: Avfallshamtning;
}

