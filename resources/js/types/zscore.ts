export type ZscoreCategory = {
    zScore: string[];
    category: string;
};

export interface ZscoreData {
    min3SD: number;
    min2SD: number;
    min1SD: number;
    median: number;
    plus1SD: number;
    plus2SD: number;
    plus3SD: number;
}

export interface ZscoreItem extends ZscoreData {
    id: number;
    age: number;
    height: number;
    year: number;
    zscoreType: string;
    gender: string;
}
