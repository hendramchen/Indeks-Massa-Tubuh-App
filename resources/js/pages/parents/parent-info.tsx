import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
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
import { ParentType } from '@/types/parent-info';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ParentInfo({ parent }: { parent: ParentType }) {
    return (
        <SigiziLayout>
            <Head title={`Detail Info Orang Tua`} />
            <div className="flex items-center justify-center gap-4 pt-6 pb-4 md:justify-start md:pt-8 md:pb-4">
                <Link href="/parents">
                    <ArrowLeft className="h-8 w-8" />
                </Link>
                <h1 className="text-3xl font-semibold md:text-4xl">
                    Informasi Orang Tua
                </h1>
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
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Nomor Telepon</p>
                            <p className="">{parent.phone}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Edit</Button>
                    </CardFooter>
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
                                <TableRow className="">
                                    <TableCell className="pl-4">
                                        Ayu Manika Sari
                                    </TableCell>
                                    <TableCell>12 Bulan</TableCell>
                                    <TableCell>Perempuan</TableCell>
                                </TableRow>
                                <TableRow className="">
                                    <TableCell className="pl-4">
                                        Ngurah Adnyana
                                    </TableCell>
                                    <TableCell>12 Bulan</TableCell>
                                    <TableCell>Laki-laki</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </SigiziLayout>
    );
}
