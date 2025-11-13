import CardResult from '@/components/card-result';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Label } from '@/components/ui/label';
import {
    genderOptions,
    zScoreBBCategory,
    zScoreBBPBCategory,
    zScoreIMT5PlusCategory,
    zScoreIMTCategory,
    zScorePTBCategory,
} from '@/lib/constant';
import { SharedData } from '@/types';
import { ZscoreData } from '@/types/zscore';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import ResultForm from './result-form';

export default function Result({
    name,
    zscoreBB,
    zscorePTB,
    zscoreBBPB,
    zscoreIMT,
    zscoreIMT5,
    weight,
    height,
    age,
    year,
    month,
    gender,
}: {
    name: string;
    zscoreBB: ZscoreData;
    zscorePTB: ZscoreData;
    zscoreBBPB: ZscoreData;
    zscoreIMT: ZscoreData;
    zscoreIMT5: ZscoreData;
    weight: number;
    height: number;
    age: number;
    year: number;
    month: number;
    gender: string;
}) {
    const [weightNearest, setWeightNearest] = useState<string>('');
    const [weightZscore, setWeightZscore] = useState<string>('');
    const [weightCategory, setWeightCategory] = useState<string>('');
    const [heightNearest, setHeightNearest] = useState<string>('');
    const [heightZscore, setHeightZscore] = useState<string>('');
    const [heightCategory, setHeightCategory] = useState<string>('');
    const [whNearest, setWhNearest] = useState<string>('');
    const [whZscore, setWhZscore] = useState<string>('');
    const [whCategory, setWhCategory] = useState<string>('');
    const [imtNearest, setImtNearest] = useState<string>('');
    const [imtZscore, setImtZscore] = useState<string>('');
    const [imtCategory, setImtCategory] = useState<string>('');

    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Hasil Perhitungan" />
            <Header />
            <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#03a79f] to-[#016c82] p-2 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="my-2 flex w-full items-center gap-6 border-b border-[#2be1d8] pb-4">
                    <Link href="/">
                        <ArrowLeft className="text-white" />
                    </Link>
                    <h1 className="text-center text-3xl font-bold text-white">
                        Hasil Perhitungan
                    </h1>
                </header>
                <div className="my-4 flex flex-col text-white">
                    <Label className="font-bold">Nama Anak</Label>
                    <p className="text-2xl">{name}</p>
                </div>
                <div className="mb-6 flex w-full gap-4 text-white">
                    <div className="my-4 flex w-1/2 flex-col gap-1">
                        <Label className="font-bold">Tinggi Badan</Label>
                        <p className="text-2xl">{height} cm</p>
                    </div>
                    <div className="my-4 flex w-1/2 flex-col gap-1">
                        <Label className="font-bold">Berat Badan</Label>
                        <p className="text-2xl">{weight} kg</p>
                    </div>
                </div>
                <div className="mb-6 flex w-full gap-4 text-white">
                    <div className="my-4 flex w-1/2 flex-col gap-1">
                        <Label className="font-bold">Umur</Label>
                        <p className="text-2xl">
                            {year ? `${year}th ${month}bln` : `${age} bulan`}
                        </p>
                    </div>
                    <div className="my-4 flex w-1/2 flex-col gap-1">
                        <Label className="font-bold">Jenis Kelamin</Label>
                        <p className="text-2xl">
                            {genderOptions[gender as 'male' | 'female']}
                        </p>
                    </div>
                </div>
                <div className="container flex flex-col justify-between gap-4 opacity-100 transition-opacity duration-750 md:flex-row lg:grow starting:opacity-0">
                    {year ? (
                        <CardResult
                            title="Indeks Massa Tubuh (IMT) menurut Umur (IMT/U)"
                            subtitle="anak usia 5 - 18 tahun"
                            zScoreCategory={zScoreIMT5PlusCategory}
                            zScoreData={zscoreIMT5}
                            zScoreType="IMT5Plus"
                            weight={weight}
                            height={height}
                            setWeightNearest={setWeightNearest}
                            setWeightZscore={setWeightZscore}
                            setWeightCategory={setWeightCategory}
                            setHeightNearest={setHeightNearest}
                            setHeightZscore={setHeightZscore}
                            setHeightCategory={setHeightCategory}
                            setWhNearest={setWhNearest}
                            setWhZscore={setWhZscore}
                            setWhCategory={setWhCategory}
                            setImtNearest={setImtNearest}
                            setImtZscore={setImtZscore}
                            setImtCategory={setImtCategory}
                        />
                    ) : (
                        <>
                            <CardResult
                                title="Berat Badan menurut Umur (BB/U)"
                                subtitle="anak usia 0 - 60 bulan"
                                zScoreCategory={zScoreBBCategory}
                                zScoreData={zscoreBB}
                                zScoreType="BB"
                                weight={weight}
                                height={height}
                                setWeightNearest={setWeightNearest}
                                setWeightZscore={setWeightZscore}
                                setWeightCategory={setWeightCategory}
                                setHeightNearest={setHeightNearest}
                                setHeightZscore={setHeightZscore}
                                setHeightCategory={setHeightCategory}
                                setWhNearest={setWhNearest}
                                setWhZscore={setWhZscore}
                                setWhCategory={setWhCategory}
                                setImtNearest={setImtNearest}
                                setImtZscore={setImtZscore}
                                setImtCategory={setImtCategory}
                            />
                            <CardResult
                                title="Panjang Badan atau Tinggi Badan menurut Umur (PB/U atau TB/U)"
                                subtitle="anak usia 0 - 60 bulan"
                                zScoreCategory={zScorePTBCategory}
                                zScoreData={zscorePTB}
                                zScoreType={age > 23 ? 'TB' : 'PB'}
                                weight={weight}
                                height={height}
                                setWeightNearest={setWeightNearest}
                                setWeightZscore={setWeightZscore}
                                setWeightCategory={setWeightCategory}
                                setHeightNearest={setHeightNearest}
                                setHeightZscore={setHeightZscore}
                                setHeightCategory={setHeightCategory}
                                setWhNearest={setWhNearest}
                                setWhZscore={setWhZscore}
                                setWhCategory={setWhCategory}
                                setImtNearest={setImtNearest}
                                setImtZscore={setImtZscore}
                                setImtCategory={setImtCategory}
                            />
                            <CardResult
                                title="Berat Badan menurut Panjang Badan atau Tinggi Badan (BB/PB atau BB/TB)"
                                subtitle="anak usia 0 - 60 bulan"
                                zScoreCategory={zScoreBBPBCategory}
                                zScoreData={zscoreBBPB}
                                zScoreType={age > 23 ? 'BBTB' : 'BBPB'}
                                weight={weight}
                                height={height}
                                setWeightNearest={setWeightNearest}
                                setWeightZscore={setWeightZscore}
                                setWeightCategory={setWeightCategory}
                                setHeightNearest={setHeightNearest}
                                setHeightZscore={setHeightZscore}
                                setHeightCategory={setHeightCategory}
                                setWhNearest={setWhNearest}
                                setWhZscore={setWhZscore}
                                setWhCategory={setWhCategory}
                                setImtNearest={setImtNearest}
                                setImtZscore={setImtZscore}
                                setImtCategory={setImtCategory}
                            />
                            <CardResult
                                title="Indeks Massa Tubuh (IMT) menurut Umur (IMT/U)"
                                subtitle="anak usia 0 - 60 bulan"
                                zScoreCategory={zScoreIMTCategory}
                                zScoreData={zscoreIMT}
                                zScoreType="IMT"
                                weight={weight}
                                height={height}
                                setWeightNearest={setWeightNearest}
                                setWeightZscore={setWeightZscore}
                                setWeightCategory={setWeightCategory}
                                setHeightNearest={setHeightNearest}
                                setHeightZscore={setHeightZscore}
                                setHeightCategory={setHeightCategory}
                                setWhNearest={setWhNearest}
                                setWhZscore={setWhZscore}
                                setWhCategory={setWhCategory}
                                setImtNearest={setImtNearest}
                                setImtZscore={setImtZscore}
                                setImtCategory={setImtCategory}
                            />
                        </>
                    )}
                    {auth.user && (
                        <ResultForm
                            childName={name}
                            gender={gender}
                            age={age}
                            year={year}
                            weight={weight}
                            height={height}
                            weightNearest={weightNearest}
                            weightZscore={weightZscore}
                            weightCategory={weightCategory}
                            heightNearest={heightNearest}
                            heightZscore={heightZscore}
                            heightCategory={heightCategory}
                            whNearest={whNearest}
                            whZscore={whZscore}
                            whCategory={whCategory}
                            imtNearest={imtNearest}
                            imtZscore={imtZscore}
                            imtCategory={imtCategory}
                        />
                    )}
                </div>
                <div className="my-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 font-semibold"
                    >
                        <ArrowLeft className="text-gray-500" /> Kembali
                    </Link>
                </div>
                <Footer />
            </div>
        </>
    );
}
