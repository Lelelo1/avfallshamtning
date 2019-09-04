export interface Selection {
    title: string;
    grundAvgift: string;
    subtitle: string;
    description: string;
}

export interface Avfallshamtning {
    startAvgift: string;
    selections: Selection[];
    carInfo: string;
}

export interface Model {
    Avfallshamtning: Avfallshamtning;
}

