import SigiziLayout from '@/layouts/sigizi-layout';
import { ChildFilterType, ChildType } from '@/types/child-info';
import { DataWithPagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ChildFilter from './child-filter';
import ChildTable from './child-table';

export default function ChildList() {
    const [children, setChildren] =
        useState<DataWithPagination<ChildType> | null>(null);
    const [pageLink, setPageLink] = useState<string | null>(null);
    const [filters, setFilters] = useState<ChildFilterType | null>(null);

    useEffect(() => {
        let endpoint = pageLink || '/child_data';
        if (filters) {
            endpoint = pageLink ? pageLink + '&' : '/child_data?';
            const params = new URLSearchParams();
            if (filters.name) params.append('name', filters.name);
            if (filters.gender) params.append('gender', filters.gender);
            endpoint += params.toString();
        }
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setChildren(data))
            .catch((error) => console.error('Error fetching children:', error));
    }, [pageLink, filters]);

    const handleFilter = (filters: ChildFilterType) => {
        setPageLink(null);
        setFilters(filters);
    };
    return (
        <SigiziLayout>
            <Head title={`Daftar Anak`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Anak
            </h1>
            <ChildFilter setFilters={handleFilter} />
            {children && (
                <ChildTable children={children} setPageLink={setPageLink} />
            )}
        </SigiziLayout>
    );
}
