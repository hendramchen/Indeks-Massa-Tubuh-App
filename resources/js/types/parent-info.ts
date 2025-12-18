export type ParentType = {
    id: number;
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    address: string;
    children?: Array<{
        id: number;
        name: string;
        gender: string;
        birth_date: string;
        parent_info_id: number;
    }>;
};
export type ParentFilterType = {
    name: string;
    phone: string;
    city: string;
    district: string;
};
