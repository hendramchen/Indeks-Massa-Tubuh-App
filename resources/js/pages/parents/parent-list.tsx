import SigiziLayout from '@/layouts/sigizi-layout';
import { DataWithPagination } from '@/types/pagination';
import { ParentFilterType, ParentType } from '@/types/parent-info';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ParentCreate from './parent-create';
import ParentFilter from './parent-filter';
import ParentTable from './parent-table';

export interface ParentListType {
    parents: DataWithPagination<ParentType>;
}

export default function ParentList() {
    const [parents, setParents] =
        useState<DataWithPagination<ParentType> | null>(null);
    const [pageLink, setPageLink] = useState<string | null>(null);
    const [filters, setFilters] = useState<ParentFilterType | null>(null);

    useEffect(() => {
        let url = pageLink || '/parent_data';
        if (filters) {
            url = pageLink ? pageLink + '&' : '/parent_data?';
            const params = new URLSearchParams();
            if (filters.name) params.append('name', filters.name);
            if (filters.phone) params.append('phone', filters.phone);
            if (filters.city) params.append('city', filters.city);
            if (filters.district) params.append('district', filters.district);
            url += params.toString();
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => setParents(data))
            .catch((error) => console.error('Error fetching parents:', error));
    }, [pageLink, filters]);

    const refetchParents = () => {
        let endpoint = '/parent_data';
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setParents(data))
            .catch((error) => console.error('Error fetching parents:', error));
    };

    const handleFilter = (filters: ParentFilterType) => {
        // Reset to first page when filtering
        setPageLink(null);
        setFilters(filters);
    };

    return (
        <SigiziLayout>
            <Head title={`Daftar Orang Tua`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Orang Tua
            </h1>
            <ParentFilter setFilters={handleFilter} />
            <ParentCreate onParentCreated={refetchParents} />
            {parents && (
                <ParentTable parents={parents} setPageLink={setPageLink} />
            )}
        </SigiziLayout>
    );
}
