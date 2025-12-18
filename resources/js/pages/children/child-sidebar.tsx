import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateToReadable } from '@/lib/utils';
import { ChildType } from '@/types/child-info';
import { ParentType } from '@/types/parent-info';
import { ArrowRight } from 'lucide-react';

interface ChildSidebarProps {
    child: ChildType;
    parent: ParentType;
}

export function ChildSidebar({ child, parent }: ChildSidebarProps) {
    return (
        <div className="flex w-full flex-col gap-4 md:w-1/3">
            <Card className="w-full rounded-none md:rounded-lg">
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
                        <p>{formatDateToReadable(child.birth_date)}</p>
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
            <Card className="w-full rounded-none md:rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#d6336c]">
                        Ringkasan Hasil Pengukuran
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Berat Badan menurut Umur (BB/U)
                        </h2>
                        <p className="text-gray-800">Normal</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Panjang Badan menurut Umur (PB/U)
                        </h2>
                        <p className="text-gray-800">Normal</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Berat Badan menurut Panjang Badan (BB/PB)
                        </h2>
                        <p className="text-gray-800">Normal</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Indeks Massa Tubuh menurut Umur (IMT/U)
                        </h2>
                        <p className="text-gray-800">Normal</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
