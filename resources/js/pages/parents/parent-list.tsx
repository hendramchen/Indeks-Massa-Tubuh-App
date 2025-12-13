import SigiziLayout from '@/layouts/sigizi-layout';
import { Head } from '@inertiajs/react';

export default function ParentList() {
    return (
        <SigiziLayout>
            <Head title={`Daftar Orang Tua`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Orang Tua
            </h1>
            <div className="p-4">
                <p>Ini adalah halaman daftar orang tua.</p>
            </div>
        </SigiziLayout>
    );
}
