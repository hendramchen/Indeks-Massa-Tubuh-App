import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import SigiziLayout from '@/layouts/sigizi-layout';
import { formatDateToReadable } from '@/lib/utils';
import { ChildType } from '@/types/child-info';
import { ParentType } from '@/types/parent-info';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const data = [
    {
        age: 0,
        weight: 2,
        normal: 1.5,
        actual: null,
    },
    {
        age: 1,
        weight: 3,
        normal: 2,
        actual: null,
    },
    {
        age: 2,
        weight: 4,
        normal: 2.5,
        actual: 2,
    },
    {
        age: 3,
        weight: 5,
        normal: 3,
        actual: 4,
    },
    {
        age: 4,
        weight: 6,
        normal: 3.5,
        actual: 5,
    },
    {
        age: 5,
        weight: 7,
        normal: 4,
        actual: null,
    },
];

export default function ChildInfo({
    child,
    parent,
}: {
    child: ChildType;
    parent: ParentType;
}) {
    return (
        <SigiziLayout>
            <Head title={`Detail Informasi Anak`} />
            <div className="flex items-center justify-center gap-4 pt-6 pb-4 md:justify-start md:pt-8 md:pb-4">
                <Link href="/children">
                    <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
                </Link>
                <h1 className="text-2xl font-semibold md:text-4xl">
                    {child.name}
                </h1>
            </div>
            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <Card className="w-full rounded-none md:w-1/3 md:rounded-lg">
                    <CardContent className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold text-[#d6336c]">
                            Data Anak
                        </h1>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Jenis Kelamain</h1>
                            <p>{child.gender}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Tanggal Lahir</h1>
                            <p>{child.birth_date}</p>
                        </div>
                        <hr />
                        <h1 className="text-xl font-semibold text-[#d6336c]">
                            Data Orang Tua
                        </h1>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Nama</h1>
                            <p>{parent.name}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Telepon</h1>
                            <p>{parent.phone}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Provinsi</h1>
                            <p>{parent.province}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Kabupaten/Kota</h1>
                            <p>{parent.city}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Kecamatan/Desa</h1>
                            <p>{parent.district}</p>
                        </div>
                        <div className="flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Alamat</h1>
                            <p>{parent.address}</p>
                        </div>
                        <hr />
                        <h1 className="text-xl font-semibold text-[#d6336c]">
                            Riwayat Imunisasi
                        </h1>
                        <ul>
                            <li className="flex items-center justify-between border-b bg-gray-50 py-2 hover:bg-gray-50">
                                <p className="font-bold text-[#d6336c]">
                                    {formatDateToReadable('2025-12-18')}
                                </p>
                                <ArrowRight className="h-5 w-5 text-[#f783ac]" />
                            </li>
                            <li className="flex items-center justify-between border-b py-2 hover:bg-gray-50">
                                <p className="font-bold">
                                    {formatDateToReadable('2025-11-18')}
                                </p>
                                <ArrowRight className="h-5 w-5 text-[#f783ac]" />
                            </li>
                            <li className="flex items-center justify-between border-b py-2 hover:bg-gray-50">
                                <p className="font-bold">
                                    {formatDateToReadable('2025-10-18')}
                                </p>
                                <ArrowRight className="h-5 w-5 text-[#f783ac]" />
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <div className="flex w-full flex-col gap-4 md:w-2/3">
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Pengukuran Fisik
                            </CardTitle>
                            <CardDescription>
                                {formatDateToReadable('2025-12-18')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex w-full flex-col flex-wrap gap-4 md:flex-row">
                            <div className="flex-1">
                                <h1 className="font-bold">Berat Badan</h1>
                                <p>14 kg</p>
                            </div>
                            <div className="flex-1">
                                <h1 className="font-bold">Panjang Badan</h1>
                                <p>140 cm</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Berat Badan menurut Umur (BB/U)
                            </CardTitle>
                            <CardDescription>
                                {formatDateToReadable('2025-12-18')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-wrap gap-4 p-0 md:flex-row">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Z-Score</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Normal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>-2SD</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>Normal</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <LineChart
                                style={{
                                    width: '100%',
                                    aspectRatio: 1.5,
                                    margin: 'auto',
                                }}
                                responsive
                                data={data}
                            >
                                <CartesianGrid
                                    stroke="#eee"
                                    strokeDasharray="5 5"
                                />
                                <XAxis
                                    dataKey="age"
                                    label={{
                                        value: 'Umur',
                                        position: 'top',
                                        angle: 0,
                                    }}
                                />
                                <YAxis
                                    dataKey="weight"
                                    label={{
                                        value: 'Berat Bedan',
                                        position: 'insideLeft',
                                        angle: -90,
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="normal"
                                    stroke="#82ca9d"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#333333"
                                />
                            </LineChart>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Panjang Badan menurut Umur (PB/U)
                            </CardTitle>
                            <CardDescription>
                                {formatDateToReadable('2025-12-18')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-wrap gap-4 p-0 md:flex-row">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Z-Score</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Normal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>-2SD</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>Normal</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Berat Badan menurut Panjang Badan (BB/PB)
                            </CardTitle>
                            <CardDescription>
                                {formatDateToReadable('2025-12-18')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-wrap gap-4 p-0 md:flex-row">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Z-Score</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Normal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>-2SD</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>Normal</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Indeks Massa Tubuh menurut Umur (IMT/U)
                            </CardTitle>
                            <CardDescription>
                                {formatDateToReadable('2025-12-18')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-wrap gap-4 p-0 md:flex-row">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Z-Score</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Normal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>-2SD</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>Normal</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SigiziLayout>
    );
}
