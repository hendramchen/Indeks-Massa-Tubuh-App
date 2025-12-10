import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import SigiziLayout from '@/layouts/sigizi-layout';
import { tabelZscore } from '@/routes';
import { ZscoreItem } from '@/types/zscore';
import { Head, Link } from '@inertiajs/react';
import { Mars, Venus } from 'lucide-react';

interface TableProps {
    type: string;
    gender: string;
    zscores: ZscoreItem[];
}

const queryBBMale = {
    query: {
        type: 'BB',
        gender: 'male',
    },
};
const queryBBFemale = {
    query: {
        type: 'BB',
        gender: 'female',
    },
};
const queryPBMale = {
    query: {
        type: 'PB',
        gender: 'male',
    },
};
const queryTBMale = {
    query: {
        type: 'TB',
        gender: 'male',
    },
};
const queryPBFemale = {
    query: {
        type: 'PB',
        gender: 'female',
    },
};
const queryTBFemale = {
    query: {
        type: 'TB',
        gender: 'female',
    },
};
const queryBBPBMale = {
    query: {
        type: 'BBPB',
        gender: 'male',
    },
};
const queryBBPBFemale = {
    query: {
        type: 'BBPB',
        gender: 'female',
    },
};
const queryBBTBMale = {
    query: {
        type: 'BBTB',
        gender: 'male',
    },
};
const queryBBTBFemale = {
    query: {
        type: 'BBTB',
        gender: 'female',
    },
};
const queryIMT1Male = {
    query: {
        type: 'IMT1',
        gender: 'male',
    },
};
const queryIMT1Female = {
    query: {
        type: 'IMT1',
        gender: 'female',
    },
};
const queryIMT2Male = {
    query: {
        type: 'IMT2',
        gender: 'male',
    },
};
const queryIMT2Female = {
    query: {
        type: 'IMT2',
        gender: 'female',
    },
};
const queryIMT5Male = {
    query: {
        type: 'IMT5',
        gender: 'male',
    },
};
const queryIMT5Female = {
    query: {
        type: 'IMT5',
        gender: 'female',
    },
};

type zscoreType =
    | 'BB'
    | 'PB'
    | 'TB'
    | 'BBPB'
    | 'BBTB'
    | 'IMT1'
    | 'IMT2'
    | 'IMT5';

const header: Record<
    zscoreType,
    { title: string; subtitle: string; longText: string }
> = {
    BB: {
        title: 'Berat Badan menurut Umur (BB/U)',
        subtitle: '(0-60) bulan',
        longText: 'Berat Badan',
    },
    PB: {
        title: 'Panjang Badan menurut Umur (PB/U)',
        subtitle: '(0-23) bulan',
        longText: 'Panjang Badan',
    },
    TB: {
        title: 'Tinggi Badan menurut Umur (TB/U)',
        subtitle: '(24-60) bulan',
        longText: 'Tinggi Badan',
    },
    BBPB: {
        title: 'Berat Badan menurut Panjang Badan (BB/PB)',
        subtitle: '(0-23) bulan',
        longText: 'Berat Badan',
    },
    BBTB: {
        title: 'Berat Badan menurut Tinggi Badan (BB/TB)',
        subtitle: '(24-60) bulan',
        longText: 'Berat Badan',
    },
    IMT1: {
        title: 'Indeks Massa Tubuh (IMT)',
        subtitle: '(0-23) bulan',
        longText: 'Indeks Massa Tubuh',
    },
    IMT2: {
        title: 'Indeks Massa Tubuh (IMT)',
        subtitle: '(24-60) bulan',
        longText: 'Indeks Massa Tubuh',
    },
    IMT5: {
        title: 'Indeks Massa Tubuh (IMT)',
        subtitle: '(5-18) tahun',
        longText: 'Indeks Massa Tubuh',
    },
};

const genderTitle: Record<string, string> = {
    male: 'Laki-laki',
    female: 'Perempuan',
};

export default function Index({ type, gender, zscores }: TableProps) {
    const getItem = (item: ZscoreItem) => {
        switch (type) {
            case 'BB':
                return item.age;
            case 'PB':
                return item.age;
            case 'TB':
                return item.age;
            case 'BBPB':
                return item.height;
            case 'BBTB':
                return item.height;
            case 'IMT1':
                return item.age;
            case 'IMT2':
                return item.age;
            case 'IMT5':
                return `${item.year}th ${item.age}bln`;
            default:
                return item.age;
        }
    };

    return (
        <SigiziLayout>
            <Head title="Tabel ZScore" />
            <div className="flex items-center gap-2 px-4 pt-4 text-[#00548c]">
                <Mars />
                <h2 className="text-lg font-bold">Anak Laki-laki</h2>
            </div>

            <div className="flex flex-wrap gap-3 p-4">
                <Link
                    href={tabelZscore(queryBBMale)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    BB/U - (0-60) bulan
                </Link>

                <Link
                    href={tabelZscore(queryPBMale)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    PB/U - (0-23) bulan
                </Link>
                <Link
                    href={tabelZscore(queryTBMale)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    TB/U - (24-60) bulan
                </Link>
                <Link
                    href={tabelZscore(queryBBPBMale)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    BB/PB - (0-23) bulan
                </Link>

                <Link
                    href={tabelZscore(queryBBTBMale)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    BB/TB - (24-60) bulan
                </Link>

                <Link
                    href={tabelZscore(queryIMT1Male)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    IMT - (0-23) bulan
                </Link>

                <Link
                    href={tabelZscore(queryIMT2Male)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    IMT - (24-60) bulan
                </Link>

                <Link
                    href={tabelZscore(queryIMT5Male)}
                    className="border-b border-[#00548c] pb-2 text-sm text-[#00548c]"
                >
                    IMT - (5-18) tahun
                </Link>
            </div>
            <div className="flex items-center gap-2 px-4 pt-4 text-[#b50082]">
                <Venus />
                <h2 className="text-lg font-bold">Anak Perempuan</h2>
            </div>
            <div className="flex flex-wrap gap-3 p-4">
                <Link
                    href={tabelZscore(queryBBFemale)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    BB/U - (0-60) bulan
                </Link>
                <Link
                    href={tabelZscore(queryPBFemale)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    PB/U - (0-23) bulan
                </Link>
                <Link
                    href={tabelZscore(queryTBFemale)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    TB/U - (24-60) bulan
                </Link>
                <Link
                    href={tabelZscore(queryBBPBFemale)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    BB/PB - (0-23) bulan
                </Link>
                <Link
                    href={tabelZscore(queryBBTBFemale)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    BB/TB - (24-60) bulan
                </Link>
                <Link
                    href={tabelZscore(queryIMT1Female)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    IMT - (0-23) bulan
                </Link>
                <Link
                    href={tabelZscore(queryIMT2Female)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    IMT - (24-60) bulan
                </Link>
                <Link
                    href={tabelZscore(queryIMT5Female)}
                    className="border-b border-[#b50082] pb-2 text-sm text-[#b50082]"
                >
                    IMT - (5-18) tahun
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-1 text-center">
                <h1 className="text-lg font-bold">
                    {header[type as zscoreType].title}
                </h1>
                <h2 className="text-base font-semibold">
                    Anak {genderTitle[gender]}
                </h2>
                <p className="text-sm">
                    Umur {header[type as zscoreType].subtitle}
                </p>
            </div>
            <div className="flex flex-col justify-center gap-4 md:flex-row md:flex-wrap">
                <Table className="mt-6 w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="border-t border-gray-300">
                                {type === 'BBPB' || type === 'BBTB'
                                    ? 'Panjang'
                                    : 'Umur'}
                            </TableHead>
                            <TableHead
                                colSpan={7}
                                className="border border-gray-300 text-center"
                            >
                                {header[type as zscoreType].longText}
                            </TableHead>
                        </TableRow>
                        <TableRow className="bg-gray-200">
                            <TableHead className="border-b border-gray-300">
                                {type === 'BBPB' || type === 'BBTB'
                                    ? 'Badan'
                                    : '(bulan)'}
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                -3SD
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                -2SD
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                -1SD
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Median
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                +1SD
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                +2SD
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                +3SD
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {zscores.map((zscore) => (
                            <TableRow key={zscore.id}>
                                <TableCell>{getItem(zscore)}</TableCell>
                                <TableCell className="bg-red-100">
                                    {zscore.min3SD}
                                </TableCell>
                                <TableCell className="bg-pink-100">
                                    {zscore.min2SD}
                                </TableCell>
                                <TableCell className="bg-yellow-100">
                                    {zscore.min1SD}
                                </TableCell>
                                <TableCell className="bg-green-100">
                                    {zscore.median}
                                </TableCell>
                                <TableCell className="bg-yellow-100">
                                    {zscore.plus1SD}
                                </TableCell>
                                <TableCell className="bg-pink-100">
                                    {zscore.plus2SD}
                                </TableCell>
                                <TableCell className="bg-red-100">
                                    {zscore.plus3SD}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </SigiziLayout>
    );
}
