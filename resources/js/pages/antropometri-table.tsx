import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';

export default function AntropometriTable() {
    return (
        <div>
            <h1 className="mb-4 border-b border-gray-300 pb-4 text-center text-lg font-bold text-[#0b7285]">
                Kategori dan Ambang Batas
                <br />
                Status Gizi Anak
            </h1>
            <div className="bg-[#e3fafc] py-4">
                <h2 className="text-center font-bold text-[#0c8599]">
                    Berat Badan menurut Umur (BB/U)
                    <br />
                    anak usia 0 - 60 bulan
                </h2>
                <Table className="mt-6 w-full text-[#0c8599]">
                    <TableHeader>
                        <TableRow className="bg-[#c5f6fa]">
                            <TableHead className="text-[#0b7285]">
                                Kategori Status Gizi
                            </TableHead>
                            <TableHead className="text-right text-[#0b7285]">
                                Ambang Batas
                                <br />
                                (Z-Score)
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan sangat kurang</p>
                                <p>(severely underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                                <ChevronLeft size={16} />
                                <div>- 3 SD</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan kurang</p>
                                <p>(underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 3 SD</div>
                                <MoveRight />
                                <div className="flex items-center gap-1">
                                    <ChevronLeft size={16} />
                                    <div>- 2 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan normal</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 2 SD</div>
                                <MoveRight />
                                <p>+ 1 SD</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Risiko Berat badan lebih</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="flex items-center gap-1">
                                    <ChevronRight size={16} />
                                    <div>+1 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="border-t border-dashed border-[#74c0fc] bg-[#e7f5ff] py-4">
                <h2 className="text-center font-bold text-[#1864ab]">
                    Panjang Badan atau Tinggi Badan
                    <br />
                    menurut Umur
                    <br />
                    (PB/U atau TB/U) anak usia 0 - 60 bulan
                </h2>
                <Table className="mt-6 w-full text-[#1971c2]">
                    <TableHeader>
                        <TableRow className="bg-[#d0ebff]">
                            <TableHead className="text-[#1971c2]">
                                Kategori Status Gizi
                            </TableHead>
                            <TableHead className="text-right text-[#1971c2]">
                                Ambang Batas
                                <br />
                                (Z-Score)
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan sangat kurang</p>
                                <p>(severely underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                                <ChevronLeft size={16} />
                                <div>- 3 SD</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan kurang</p>
                                <p>(underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 3 SD</div>
                                <MoveRight />
                                <div className="flex items-center gap-1">
                                    <ChevronLeft size={16} />
                                    <div>- 2 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan normal</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 2 SD</div>
                                <MoveRight />
                                <p>+ 1 SD</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Risiko Berat badan lebih</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="flex items-center gap-1">
                                    <ChevronRight size={16} />
                                    <div>+1 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="border-t border-dashed border-[#b197fc] bg-[#f3f0ff] py-4">
                <h2 className="text-center font-bold text-[#5f3dc4]">
                    Berat Badan menurut Panjang Badan
                    <br />
                    atau Tinggi Badan
                    <br />
                    (BB/PB atau BB/TB) anak usia 0 - 60 bulan
                </h2>
                <Table className="mt-6 w-full text-[#5f3dc4]">
                    <TableHeader>
                        <TableRow className="bg-[#e5dbff]">
                            <TableHead className="text-[#5f3dc4]">
                                Kategori Status Gizi
                            </TableHead>
                            <TableHead className="text-right text-[#5f3dc4]">
                                Ambang Batas
                                <br />
                                (Z-Score)
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan sangat kurang</p>
                                <p>(severely underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                                <ChevronLeft size={16} />
                                <div>- 3 SD</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan kurang</p>
                                <p>(underweight)</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 3 SD</div>
                                <MoveRight />
                                <div className="flex items-center gap-1">
                                    <ChevronLeft size={16} />
                                    <div>- 2 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Berat badan normal</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="">- 2 SD</div>
                                <MoveRight />
                                <p>+ 1 SD</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>Risiko Berat badan lebih</p>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-3">
                                <div className="flex items-center gap-1">
                                    <ChevronRight size={16} />
                                    <div>+1 SD</div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
