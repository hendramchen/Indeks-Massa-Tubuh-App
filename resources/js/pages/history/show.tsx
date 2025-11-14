import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImtResult } from '@/types/zscore';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Ruler, Scale, User } from 'lucide-react';

interface ShowProps {
    imtResult: ImtResult;
}

export default function Show({ imtResult }: ShowProps) {
    // const getStatusColor = (category: string) => {
    //     switch (category.toLowerCase()) {
    //         case 'normal':
    //             return 'text-green-600 bg-green-50 border-green-200';
    //         case 'gizi kurang':
    //         case 'pendek':
    //         case 'sangat pendek':
    //             return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    //         case 'gizi buruk':
    //         case 'obesitas':
    //         case 'gemuk':
    //             return 'text-red-600 bg-red-50 border-red-200';
    //         default:
    //             return 'text-gray-600 bg-gray-50 border-gray-200';
    //     }
    // };

    // const formatZScore = (zscore: number) => {
    //     return zscore > 0 ? `+${zscore.toFixed(2)}` : zscore.toFixed(2);
    // };

    return (
        <div>
            <Head title={`Detail - ${imtResult.child_name}`} />
            <Header />
            <div className="px-1 py-4">
                {/* Header with back button */}
                <div className="my-4 flex flex-col items-center gap-4 md:flex-row">
                    <Link href="/imt-result">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Riwayat
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Detail Perhitungan IMT
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Informasi Anak</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Nama Anak
                                    </label>
                                    <p className="text-lg font-semibold">
                                        {imtResult.child_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Nama Orang Tua
                                    </label>
                                    <p className="text-lg font-semibold">
                                        {imtResult.parent_name}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Jenis Kelamin
                                    </label>
                                    <p className="text-lg">
                                        {imtResult.gender === 'male'
                                            ? 'Laki-laki'
                                            : 'Perempuan'}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Umur
                                        </label>
                                        <p className="text-lg">
                                            {imtResult.year
                                                ? `${imtResult.year}th ${imtResult.age}bln`
                                                : `${imtResult.age} bulan`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Physical Measurements */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Scale className="h-5 w-5" />
                                <span>Pengukuran Fisik</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Scale className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Berat Badan
                                        </label>
                                        <p className="text-lg font-semibold">
                                            {imtResult.weight} kg
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Ruler className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Tinggi Badan
                                        </label>
                                        <p className="text-lg font-semibold">
                                            {imtResult.height} cm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>Informasi Lokasi</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Provinsi
                                </label>
                                <p className="text-base">
                                    {imtResult.province}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Kabupaten/Kota
                                </label>
                                <p className="text-base">{imtResult.city}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Kecamatan/Desa
                                </label>
                                <p className="text-base">
                                    {imtResult.district}
                                </p>
                            </div>
                            {imtResult.address && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Alamat
                                    </label>
                                    <p className="text-base">
                                        {imtResult.address}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Z-Score Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hasil Perhitungan Z-Score</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Weight for Age (BB/U) */}
                            {imtResult.weight_category && (
                                <div className="rounded-lg border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-semibold">
                                            Berat Badan menurut Umur (BB/U)
                                        </h4>
                                        <span
                                            className={`rounded-lg border px-3 py-1 text-xs font-medium`}
                                        >
                                            {imtResult.weight_category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Z-Score: {imtResult.weight_zscore}
                                    </p>
                                    {imtResult.weight_nearest && (
                                        <p className="text-sm text-gray-600">
                                            Nilai Terdekat:{' '}
                                            {imtResult.weight_nearest}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Height for Age (PB/U) */}
                            {imtResult.height_category && (
                                <div className="rounded-lg border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-semibold">
                                            Panjang Badan menurut Umur (PB/U)
                                        </h4>
                                        <span
                                            className={`rounded-lg border px-3 py-1 text-xs font-medium`}
                                        >
                                            {imtResult.height_category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Z-Score: {imtResult.height_zscore}
                                    </p>
                                    {imtResult.height_nearest && (
                                        <p className="text-sm text-gray-600">
                                            Nilai Terdekat:{' '}
                                            {imtResult.height_nearest}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Weight for Height (BB/PB) */}
                            {imtResult.wh_category && (
                                <div className="rounded-lg border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-semibold">
                                            Berat Badan menurut Panjang Badan
                                            (BB/PB)
                                        </h4>
                                        <span
                                            className={`rounded-lg border px-3 py-1 text-xs font-medium`}
                                        >
                                            {imtResult.wh_category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Z-Score: {imtResult.wh_zscore}
                                    </p>
                                    {imtResult.wh_nearest && (
                                        <p className="text-sm text-gray-600">
                                            Nilai Terdekat:{' '}
                                            {imtResult.wh_nearest}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* IMT for Age */}
                            <div className="rounded-lg border bg-blue-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="font-semibold text-blue-900">
                                        Indeks Massa Tubuh menurut Umur (IMT/U)
                                    </h4>
                                    <span
                                        className={`rounded-lg border px-3 py-1 text-xs font-medium`}
                                    >
                                        {imtResult.imt_category}
                                    </span>
                                </div>
                                <p className="text-sm text-blue-700">
                                    Z-Score: {imtResult.imt_zscore}
                                </p>
                                {imtResult.imt_nearest && (
                                    <p className="text-sm text-blue-700">
                                        Nilai Terdekat: {imtResult.imt_nearest}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Card */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Ringkasan Hasil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="mb-2 text-sm text-gray-600">
                                Berdasarkan perhitungan Z-Score untuk anak{' '}
                                <span className="font-semibold">
                                    {imtResult.child_name}
                                </span>{' '}
                                (
                                {imtResult.gender === 'male'
                                    ? 'Laki-laki'
                                    : 'Perempuan'}
                                ,{' '}
                                {imtResult.year
                                    ? `${imtResult.year}th ${imtResult.age}bln`
                                    : `${imtResult.age} bulan`}
                                ):
                            </p>
                            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                                {imtResult.weight_category && (
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">
                                            BB/U
                                        </p>
                                        <p className="font-medium">
                                            {imtResult.weight_category}
                                        </p>
                                    </div>
                                )}

                                {imtResult.height_category && (
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">
                                            PB/U
                                        </p>
                                        <p className="font-medium">
                                            {imtResult.height_category}
                                        </p>
                                    </div>
                                )}

                                {imtResult.wh_category && (
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">
                                            BB/PB
                                        </p>
                                        <p className="font-medium">
                                            {imtResult.wh_category}
                                        </p>
                                    </div>
                                )}

                                <div className="text-center">
                                    <p className="text-xs text-gray-500">
                                        IMT/U
                                    </p>
                                    <p className="font-medium text-blue-600">
                                        {imtResult.imt_category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
