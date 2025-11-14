import { BMICalculator } from '@/components/bmi-calculator';
import { Head } from '@inertiajs/react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import AntropometriTable from './antropometri-table';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Sigizi App">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Header canRegister={canRegister} />
            <div className="flex flex-col items-center bg-[#FDFDFC] p-2 text-[#1b1b18] lg:justify-center lg:p-8">
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
            <Footer />
        </>
    );
}
