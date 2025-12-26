import {
    Card,
    CardContent,
    CardDescription,
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

interface ChildMeasurementProps {
    title: string;
    description: string;
    data: string[];
}

export default function ChildMeasurement({
    title,
    description,
    data,
}: ChildMeasurementProps) {
    return (
        <Card className="rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#d6336c]">
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap gap-4 p-0 md:flex-row">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Z-Score</TableHead>
                            <TableHead>Aktual</TableHead>
                            <TableHead>Normal</TableHead>
                            <TableHead>Kategori</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {data.map((item, index) => (
                                <TableCell key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
