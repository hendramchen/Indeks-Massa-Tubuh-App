import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Head } from '@inertiajs/react';

interface ZscoreData {
    min3SD: number;
    min2SD: number;
    min1SD: number;
    median: number;
    plus1SD: number;
    plus2SD: number;
    plus3SD: number;
}
const zScore = ['-3SD', '-2SD', '-1SD', 'Median', '+1SD', '+2SD', '+3SD'];
const zScoreCategory = [
    {
        zScore: ['<-3SD'],
        category: 'Severely Underweight',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Underweight',
    },
    {
        zScore: [
            '-2SD',
            '>-2SD',
            '<-1SD',
            '-1SD',
            '>-1SD',
            '<Median',
            'Median',
            '>Median',
            '<+1SD',
            '+1SD',
        ],
        category: 'Normal',
    },
    {
        zScore: ['>+1SD', '<+2SD', '+2SD', '>+2SD', '<+3SD', '+3SD'],
        category: 'Risk of Obesity',
    },
];

const genderOptions = {
    male: 'Laki-laki',
    female: 'Perempuan',
};

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
    const zscoreType = age > 23 ? 'TB/U' : 'PB/U';

    const findNearest = (zscoreType: string) => {
        const zscore = zscoreType === 'BB' ? zscoreBB : zscorePTB;
        const wh = zscoreType === 'BB' ? weight : height;
        const scores = Object.values(zscore);
        const nearest = scores.reduce((prev, curr) => {
            return Math.abs(curr - wh) < Math.abs(prev - wh) ? curr : prev;
        });
        return nearest;
    };

    const getZScoreCategory = (zScore: string) => {
        const category = zScoreCategory.find((item) =>
            item.zScore.includes(zScore),
        );
        return category?.category || 'Unknown';
    };

    const getZscoreWithSign = (zscoreType: string) => {
        let zScoreWithSign = '';
        const nearest = findNearest(zscoreType);
        const zscoreData = zscoreType === 'BB' ? zscoreBB : zscorePTB;
        const index = Object.values(zscoreData).indexOf(nearest);

        const zScoreIndex = zScore[index];
        const wh = zscoreType === 'BB' ? weight : height;
        if (Number(wh) < nearest) {
            zScoreWithSign = `<${zScoreIndex}`;
        } else if (Number(wh) > nearest) {
            zScoreWithSign = `>${zScoreIndex}`;
        } else {
            zScoreWithSign = zScoreIndex;
        }
        return zScoreWithSign;
    };

    return (
        <>
            <Head title="Hasil Perhitungan" />

            <div className="flex min-h-screen flex-col items-center bg-pink-800 p-2 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full">
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
                    <Card>
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
                                        <TableCell>Berat Terdekat</TableCell>
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
                    </Card>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
