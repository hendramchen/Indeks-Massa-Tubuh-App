import SigiziLayout from '@/layouts/sigizi-layout';
import { Head } from '@inertiajs/react';

export default function ChildList() {
    return (
        <SigiziLayout>
            <Head title={`Daftar Anak`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Daftar Anak
            </h1>
            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <div>Left</div>
                <div>Right</div>
            </div>
        </SigiziLayout>
    );
}
