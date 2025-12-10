import { BMICalculator } from '@/components/bmi-calculator';
import { Head } from '@inertiajs/react';

import SigiziLayout from '@/layouts/sigizi-layout';
import AntropometriTable from './antropometri-table';

export default function Welcome() {
    return (
        <SigiziLayout>
            <Head title="Sigizi App" />
            <div className="flex flex-col items-center p-2 text-gray-600 lg:justify-center lg:p-8">
                <div className="container flex flex-col justify-between gap-4 opacity-100 transition-opacity duration-750 md:flex-row lg:grow starting:opacity-0">
                    <BMICalculator />
                    <div className="flex-1">
                        <img
                            src="/toddler.png"
                            alt="toddlers are measuring their height and weight"
                            className="w-full rounded-2xl"
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <AntropometriTable />
            </div>
        </SigiziLayout>
    );
}
