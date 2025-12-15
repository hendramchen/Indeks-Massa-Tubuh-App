import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function ParentTable() {
    return (
        <Table className="">
            <TableHeader className="bg-gray-50">
                <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Alamat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>123 Main St</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
