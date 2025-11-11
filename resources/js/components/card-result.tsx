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

export default function CardResult({
    title,
    subtitle,
    zScoreCategory,
    zScoreData,
    zScoreType,
    weight,
    height,
}: {
    title: string;
    subtitle: string;
    zScoreCategory: ZscoreCategoryType[];
    zScoreData: ZscoreData;
    zScoreType: 'BB' | 'PB' | 'TB' | 'BBPB' | 'BBTB' | 'IMT' | 'IMT5Plus';
    weight: number;
    height: number;
}) {
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

// data={[
//                             {
//                                 label: 'Panjang Badan',
//                                 value: `${height} cm`,
//                             },
//                             {
//                                 label: 'Nilai Terdekat',
//                                 value: `${findNearest('PTB')} cm`,
//                             },
//                             {
//                                 label: 'Z-Score',
//                                 value: `${getZscoreWithSign('PTB')}`,
//                             },
//                             {
//                                 label: 'Kategori',
//                                 value: `${getZScoreCategory(
//                                     getZscoreWithSign('PTB'),
//                                 )}`,
//                             },
//                         ]}
