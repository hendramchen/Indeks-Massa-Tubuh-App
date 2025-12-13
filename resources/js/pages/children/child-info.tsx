import SigiziLayout from '@/layouts/sigizi-layout';
import { Head } from '@inertiajs/react';

export default function ChildInfo({ id }: { id: string }) {
    return (
        <SigiziLayout>
            <Head title={`Detail Informasi Anak`} />
            <h1 className="py-4 text-center text-3xl font-semibold text-gray-600 md:py-4 md:text-left md:text-4xl">
                Detail Informasi Anak {id}
            </h1>
            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <div>Left</div>
                <div>Right</div>
            </div>
        </SigiziLayout>
    );
}
