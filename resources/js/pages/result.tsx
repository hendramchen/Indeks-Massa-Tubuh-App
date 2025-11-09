import CardResult from '@/components/card-result';
import { Label } from '@/components/ui/label';
import {
    genderOptions,
    zScoreBBCategory,
    // zScoreCode,
    // zScoreIMT5PlusCategory,
    // zScoreIMTCategory,
    zScorePTBCategory,
} from '@/lib/constant';
import { ZscoreData } from '@/types/zscore';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Result({
    name,
    zscoreBB,
    zscorePTB,
    weight,
    height,
    age,
    gender,
}: {
    name: string;
    zscoreBB: ZscoreData;
    zscorePTB: ZscoreData;
    weight: number;
    height: number;
    age: number;
    gender: string;
}) {
    // const zscoreType = age > 23 ? 'TB/U' : 'PB/U';

    // const findNearest = (zscoreType: string) => {
    //     const zscore = zscoreType === 'BB' ? zscoreBB : zscorePTB;
    //     const wh = zscoreType === 'BB' ? weight : height;
    //     const scores = Object.values(zscore);
    //     const nearest = scores.reduce((prev, curr) => {
    //         return Math.abs(curr - wh) < Math.abs(prev - wh) ? curr : prev;
    //     });
    //     return nearest;
    // };

    // const getZScoreCategory = (
    //     zScore: string,
    //     zScoreCategory: ZscoreCategoryType[],
    // ) => {
    //     const category = zScoreCategory.find((item) =>
    //         item.zScore.includes(zScore),
    //     );
    //     return category?.category || 'Unknown';
    // };

    // const getZscoreWithSign = (zscoreType: string) => {
    //     let zScoreWithSign = '';
    //     const nearest = findNearest(zscoreType);
    //     const zscoreData = zscoreType === 'BB' ? zscoreBB : zscorePTB;
    //     const index = Object.values(zscoreData).indexOf(nearest);

    //     const zScoreIndex = zScoreCode[index];
    //     const wh = zscoreType === 'BB' ? weight : height;
    //     if (Number(wh) < nearest) {
    //         zScoreWithSign = `<${zScoreIndex}`;
    //     } else if (Number(wh) > nearest) {
    //         zScoreWithSign = `>${zScoreIndex}`;
    //     } else {
    //         zScoreWithSign = zScoreIndex;
    //     }
    //     return zScoreWithSign;
    // };

    return (
        <>
            <Head title="Hasil Perhitungan" />

            <div className="flex min-h-screen flex-col items-center bg-blue-500 p-2 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="my-2 flex w-full items-center gap-4 border-b border-dashed border-white pb-4">
                    <Link href="/">
                        <ArrowLeft className="text-white" />
                    </Link>
                    <h1 className="text-center text-3xl font-bold text-white">
                        Hasil Perhitungan
                    </h1>
                </header>
                <div className="mb-6 w-full text-white">
                    <div className="my-4 flex flex-col gap-1">
                        <Label className="font-bold">Nama Anak</Label>
                        <p>{name}</p>
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <Label className="font-bold">Tinggi Badan</Label>
                        <p>{height} cm</p>
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <Label className="font-bold">Berat Badan</Label>
                        <p>{weight} kg</p>
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <Label className="font-bold">Umur</Label>
                        <p>{age} bulan</p>
                    </div>
                    <div className="my-4 flex flex-col gap-1">
                        <Label className="font-bold">Jenis Kelamin</Label>
                        <p>{genderOptions[gender as 'male' | 'female']}</p>
                    </div>
                </div>
                <div className="container flex flex-col justify-between gap-4 opacity-100 transition-opacity duration-750 md:flex-row lg:grow starting:opacity-0">
                    <CardResult
                        title="Berat Badan menurut Umur (BB/U)"
                        subtitle="anak usia 0 - 60 bulan"
                        zScoreCategory={zScoreBBCategory}
                        zScoreData={zscoreBB}
                        zScoreType="BB"
                        weight={weight}
                        height={height}
                    />
                    <CardResult
                        title="Panjang Badan atau Tinggi Badan menurut Umur (PB/U atau TB/U)"
                        subtitle="anak usia 0 - 60 bulan"
                        zScoreCategory={zScorePTBCategory}
                        zScoreData={zscorePTB}
                        zScoreType={age > 23 ? 'TB' : 'PB'}
                        weight={weight}
                        height={height}
                    />
                    {/* <CardResult
                        title="Berat Badan menurut Panjang Badan atau Tinggi Badan (BB/PB atau BB/TB)"
                        subtitle="anak usia 0 - 60 bulan"
                        zScoreCategory={zScorePTBCategory}
                        zScoreType={age > 23 ? 'BBTB' : 'BBPB'}
                    />
                    <CardResult
                        title="Indeks Massa Tubuh (IMT) menurut Umur (IMT/U)"
                        subtitle="anak usia 0 - 60 bulan"
                        zScoreCategory={zScoreIMTCategory}
                        zScoreType="IMT"
                    />
                    <CardResult
                        title="Indeks Massa Tubuh (IMT) menurut Umur (IMT/U)"
                        subtitle="anak usia 5 - 18 tahun"
                        zScoreCategory={zScoreIMT5PlusCategory}
                        zScoreType="IMT5Plus"
                    /> */}
                    {/* <Card>
                        <CardHeader className="border-b border-gray-400 pb-4">
                            <CardTitle>
                                Berat Badan menurut Umur (BB/U)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full text-gray-800">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Berat Badan</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {weight} kg
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Nilai Terdekat</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {findNearest('BB')} kg
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Z-Score</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {getZscoreWithSign('BB')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Kategori</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {getZScoreCategory(
                                                getZscoreWithSign('BB'),
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="border-b border-gray-400 pb-4">
                            <CardTitle>
                                {zscoreType === 'PB/U'
                                    ? 'Panjang Badan'
                                    : 'Tinggi Badan'}{' '}
                                menurut Umur ({zscoreType})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full text-gray-800">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Panjang/Tinggi Badan
                                        </TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {height} cm
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Nilai Terdekat</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {findNearest('PTB')} cm
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Z-Score</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {getZscoreWithSign('PTB')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Kategori</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            {getZScoreCategory(
                                                getZscoreWithSign('PTB'),
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card> */}
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
