import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
    findNearest,
    getComparedValue,
    getZScoreCategory,
    getZscoreWithSign,
} from '@/lib/utils';
import type {
    ZscoreCategory as ZscoreCategoryType,
    ZscoreData,
} from '@/types/zscore';
import { useEffect } from 'react';

interface CardResultProps {
    title: string;
    subtitle: string;
    zScoreCategory: ZscoreCategoryType[];
    zScoreData: ZscoreData;
    zScoreType: 'BB' | 'PB' | 'TB' | 'BBPB' | 'BBTB' | 'IMT' | 'IMT5Plus';
    weight: number;
    height: number;
    setWeightNearest: (nearest: string) => void;
    setWeightZscore: (zscore: string) => void;
    setWeightCategory: (category: string) => void;
    setHeightNearest: (nearest: string) => void;
    setHeightZscore: (zscore: string) => void;
    setHeightCategory: (category: string) => void;
    setWhNearest: (nearest: string) => void;
    setWhZscore: (zscore: string) => void;
    setWhCategory: (category: string) => void;
    setImtNearest: (nearest: string) => void;
    setImtZscore: (zscore: string) => void;
    setImtCategory: (category: string) => void;
}

export default function CardResult({
    title,
    subtitle,
    zScoreCategory,
    zScoreData,
    zScoreType,
    weight,
    height,
    setWeightNearest,
    setWeightZscore,
    setWeightCategory,
    setHeightNearest,
    setHeightZscore,
    setHeightCategory,
    setWhNearest,
    setWhZscore,
    setWhCategory,
    setImtNearest,
    setImtZscore,
    setImtCategory,
}: CardResultProps) {
    if (!zScoreData) return null;
    const comparedValue = getComparedValue(zScoreType, weight, height);
    const satuan = zScoreType === 'BB' ? 'kg' : 'cm';
    const nearest = findNearest(zScoreData, comparedValue);
    const category = getZScoreCategory(
        getZscoreWithSign(nearest, comparedValue, zScoreData),
        zScoreCategory,
    );
    const data = [
        {
            label: 'Nilai Terdekat',
            value: `${nearest} ${satuan}`,
        },
        {
            label: 'Z-Score',
            value: `${getZscoreWithSign(nearest, comparedValue, zScoreData)}`,
        },
        {
            label: 'Kategori',
            value: `${category}`,
        },
    ];

    useEffect(() => {
        if (zScoreType === 'BB') {
            setWeightNearest(nearest.toString() + 'kg');
            setWeightZscore(
                getZscoreWithSign(nearest, comparedValue, zScoreData),
            );
            setWeightCategory(category);
        } else if (zScoreType === 'PB' || zScoreType === 'TB') {
            setHeightNearest(nearest.toString() + 'cm');
            setHeightZscore(
                getZscoreWithSign(nearest, comparedValue, zScoreData),
            );
            setHeightCategory(category);
        } else if (zScoreType === 'BBPB' || zScoreType === 'BBTB') {
            setWhNearest(nearest.toString() + 'kg');
            setWhZscore(getZscoreWithSign(nearest, comparedValue, zScoreData));
            setWhCategory(category);
        } else if (zScoreType === 'IMT' || zScoreType === 'IMT5Plus') {
            setImtNearest(nearest.toString() + ' IMT');
            setImtZscore(getZscoreWithSign(nearest, comparedValue, zScoreData));
            setImtCategory(category);
        }
    }, [
        setWeightNearest,
        setWeightZscore,
        setWeightCategory,
        setHeightNearest,
        setHeightZscore,
        setHeightCategory,
        setWhNearest,
        setWhZscore,
        setWhCategory,
        setImtNearest,
        setImtZscore,
        setImtCategory,
    ]);
    return (
        <Card className="dark:bg-white">
            <CardHeader className="border-b border-gray-400 pb-4">
                <CardTitle className="dark:text-black">{title}</CardTitle>
                <CardDescription className="dark:text-gray-600">
                    {subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="w-full text-gray-800">
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.label}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell className="flex items-center">
                                    {item.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
