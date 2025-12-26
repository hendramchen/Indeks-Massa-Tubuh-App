export type ChildFilterType = {
    name: string;
    gender: 'male' | 'female' | 'all';
};

export type ChildType = {
    id: number;
    name: string;
    gender: string;
    birth_date: string;
    parent_info_id: number;
};

export interface MeasurementType {
    id: number;
    age: number;
    years: number;
    months: number;
    weight: number;
    height: number;
    weight_nearest: number;
    weight_zscore: number;
    weight_category: string;
    height_nearest: number;
    height_zscore: number;
    height_category: string;
    wh_nearest: number;
    wh_zscore: number;
    wh_category: string;
    imt_actual: number;
    imt_nearest: number;
    imt_zscore: number;
    imt_category: string;
    note_date: string;
    user_id: number;
    child_info_id: number;
}

export type HistoryType = {
    id: number;
    note_date: string;
};
