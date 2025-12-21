import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import SigiziLayout from '@/layouts/sigizi-layout';
import { ParentType } from '@/types/parent-info';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ParentDelete from './parent-delete';
import ParentEdit from './parent-edit';

export default function ParentInfo({ parent }: { parent: ParentType }) {
    const children = parent.children ?? [];

    const getAgeInMonths = (birthDate: string) => {
        const birth = new Date(birthDate);
        const now = new Date();
        if (Number.isNaN(birth.getTime())) return null;

        let months =
            (now.getFullYear() - birth.getFullYear()) * 12 +
            (now.getMonth() - birth.getMonth());

        if (now.getDate() < birth.getDate()) months -= 1;
        return Math.max(0, months);
    };

    return (
        <SigiziLayout>
            <Head title={`Detail Info Orang Tua`} />
            <div className="flex flex-col items-center justify-between gap-4 pt-6 pb-4 md:flex-row md:pt-8 md:pb-4">
                <div className="flex items-center gap-4">
                    <Link href="/parents">
                        <ArrowLeft className="h-8 w-8" />
                    </Link>
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        Informasi Orang Tua
                    </h1>
                </div>

                <div className="flex gap-2">
                    <ParentEdit parent={parent} />
                    <ParentDelete />
                </div>
            </div>

            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <Card className="w-full flex-1 rounded-none md:rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Data Orang Tua
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Nama</h1>
                            <p>{parent.name}</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Nomor Telepon</h1>
                            <p>{parent.phone}</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Provinsi</h1>
                            <p>{parent.province}</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Kabupaten</p>
                            <p>{parent.city}</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Kecamatan</p>
                            <p>{parent.district}</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Alamat</p>
                            <p className="">{parent.address}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full flex-1 rounded-none md:rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Data Anak</CardTitle>
                    </CardHeader>
                    <CardContent className="mx-0 px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-4">Nama</TableHead>
                                    <TableHead>Umur</TableHead>
                                    <TableHead>Gender</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {children.length === 0 ? (
                                    <TableRow>
                                        <TableCell className="pl-4" colSpan={3}>
                                            Belum ada data anak.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    children.map((child) => {
                                        const ageMonths = getAgeInMonths(
                                            child.birth_date,
                                        );
                                        return (
                                            <TableRow key={child.id}>
                                                <TableCell className="pl-4">
                                                    <Link
                                                        href={`/children/${child.id}`}
                                                        className="font-bold text-[#d6336c] hover:underline"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {ageMonths === null
                                                        ? '-'
                                                        : `${ageMonths} Bulan`}
                                                </TableCell>
                                                <TableCell>
                                                    {child.gender}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </SigiziLayout>
    );
}
