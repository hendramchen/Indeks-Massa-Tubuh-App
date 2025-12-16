import PaginationTable from '@/components/pagination-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataWithPagination } from '@/types/pagination';
import { ParentType } from '@/types/parent-info';
import { Link } from '@inertiajs/react';

interface ParentTableProps {
    parents: DataWithPagination<ParentType>;
    setPageLink: (url: string | null) => void;
}

export default function ParentTable({
    parents,
    setPageLink,
}: ParentTableProps) {
    if (!parents) return null;
    const { data, links, from } = parents;
    return (
        <div className="mb-6">
            <Table className="">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Kabupaten/Kota</TableHead>
                        <TableHead>Kecamatan/Desa</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((parent, index) => {
                        let nomor = from + index;
                        const rowBg = index % 2 === 0 ? 'bg-white' : '';
                        return (
                            <TableRow key={parent.id} className={rowBg}>
                                <TableCell>{nomor}</TableCell>
                                <TableCell>
                                    <Link
                                        href={`/parents/${parent.id}`}
                                        className="font-bold text-[#d6336c] hover:underline"
                                    >
                                        {parent.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{parent.phone}</TableCell>
                                <TableCell>{parent.city}</TableCell>
                                <TableCell>{parent.district}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {data.length > 0 && (
                <PaginationTable links={links} onPageChange={setPageLink} />
            )}
        </div>
    );
}
