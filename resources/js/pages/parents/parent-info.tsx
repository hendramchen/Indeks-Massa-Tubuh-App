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
import { Head } from '@inertiajs/react';

export default function ParentInfo() {
    return (
        <SigiziLayout>
            <Head title={`Parent Info`} />
            <h1 className="pt-6 pb-4 text-center text-3xl font-semibold md:pt-8 md:pb-4 md:text-left md:text-4xl">
                Informasi Orang Tua
            </h1>
            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <Card className="w-full flex-1">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Data Orang Tua
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <h1 className="font-bold">Provinsi</h1>
                            <p>Bali</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Kabupaten</p>
                            <p>Buleleng</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Kecamatan</p>
                            <p className="">Baktiseraga</p>
                        </div>
                        <div className="my-4 flex flex-col justify-between md:flex-row">
                            <p className="font-bold">Alamat</p>
                            <p className="">
                                Jalan Laksamana Jalan Laksamana No.115
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Edit</Button>
                    </CardFooter>
                </Card>
                <Card className="w-full flex-1">
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
