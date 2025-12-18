export type ChildFilterType = {
    name: string;
    gender: 'male' | 'female' | 'all';
};

export type ChildType = {
    id: number;
    name: string;
    gender: string;
    birth_date: string;
    parent_id: number;
};
