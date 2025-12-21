import PaginationTable from '@/components/pagination-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDateToReadable } from '@/lib/utils';
import { ChildType } from '@/types/child-info';
import { DataWithPagination } from '@/types/pagination';
import { Link } from '@inertiajs/react';

interface ChildTableProps {
    children: DataWithPagination<ChildType>;
    setPageLink: (url: string | null) => void;
}

export default function ChildTable({ children, setPageLink }: ChildTableProps) {
    if (!children) return null;
    const { data, links, from } = children;
    return (
        <div className="my-6">
            <Table className="">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Tgl Lahir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((child, index) => {
                        let nomor = from + index;
                        const rowBg = index % 2 === 0 ? 'bg-white' : '';
                        return (
                            <TableRow key={child.id} className={rowBg}>
                                <TableCell>{nomor}</TableCell>
                                <TableCell>
                                    <Link
                                        href={`/children/${child.id}`}
                                        className="font-bold text-[#d6336c] hover:underline"
                                    >
                                        {child.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{child.gender}</TableCell>
                                <TableCell>
                                    {formatDateToReadable(child.birth_date)}
                                </TableCell>
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
