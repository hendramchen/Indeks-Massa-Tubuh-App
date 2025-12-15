import SigiziLayout from '@/layouts/sigizi-layout';
import { Head } from '@inertiajs/react';
import ParentCreate from './parent-create';
import ParentFilter from './parent-filter';
import ParentTable from './parent-table';

export default function ParentList() {
    return (
        <SigiziLayout>
            <Head title={`Daftar Orang Tua`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Orang Tua
            </h1>
            <ParentFilter />
            <ParentCreate />
            <ParentTable />
        </SigiziLayout>
    );
}
