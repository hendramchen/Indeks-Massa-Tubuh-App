import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit2, Trash } from 'lucide-react';

export default function ChildTable() {
    return (
        <div className="my-6">
            <Table className="">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Tgl Lahir</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Laki-laki</TableCell>
                        <TableCell>2023-01-15</TableCell>
                        <TableCell className="flex justify-end gap-4">
                            <Edit2 className="h-4 w-4 cursor-pointer" />
                            <Trash className="h-4 w-4 cursor-pointer" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
