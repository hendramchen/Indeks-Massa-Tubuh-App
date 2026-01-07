// import { Button } from '@/components/ui/button';
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
// import { TrendingUp } from 'lucide-react';
// import ChildChart from './child-chart';

interface ChildMeasurementProps {
    title: string;
    description: string;
    data: string[];
    // zscoreType: string;
    // gender: string;
    // age: number;
}

export default function ChildMeasurement({
    title,
    description,
    data,
    // zscoreType,
    // gender,
    // age
}: ChildMeasurementProps) {
    // const handleGetChartData = () => {};
    return (
        <Card className="rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#d6336c]">
                        {title}
                    </h1>
                    {/* <Button variant="outline" onClick={handleGetChartData}>
                        <TrendingUp />
                    </Button> */}
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
                {/* <ChildChart data={[]} /> */}
            </CardContent>
        </Card>
    );
}
