import SigiziLayout from '@/layouts/sigizi-layout';
import { Head } from '@inertiajs/react';
import ChildFilter from './child-filter';
import ChildTable from './child-table';

export default function ChildList() {
    return (
        <SigiziLayout>
            <Head title={`Daftar Anak`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Anak
            </h1>
            <ChildFilter />
            <ChildTable />
        </SigiziLayout>
    );
}
