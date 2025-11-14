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

export interface ImtResult {
    id: number;
    parent_name: string;
    child_name: string;
    gender: string;
    age: number;
    year: number;
    weight: number;
    height: number;
    province: string;
    city: string;
    district: string;
    weight_nearest: number;
    weight_zscore: number;
    weight_category: string;
    height_nearest: number;
    height_zscore: number;
    height_category: string;
    wh_nearest: number;
    wh_zscore: number;
    wh_category: string;
    imt_nearest: number;
    imt_zscore: number;
    imt_category: string;
    address: string;
    created_at: string;
}
