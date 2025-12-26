import { Button } from '@/components/ui/button';
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
import SigiziLayout from '@/layouts/sigizi-layout';
import { formatDateToReadable } from '@/lib/utils';
import { ChildType, HistoryType, MeasurementType } from '@/types/child-info';
import { ParentType } from '@/types/parent-info';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import ChildBio from './child-bio';
import ChildCreateMeasure from './child-create-measure';
import ChildHistory from './child-history';
import ChildMeasurement from './child-measurement';
import ChildSummary from './child-summary';

const data = [
    {
        age: 0,
        weight: 2,
        normal: 1.5,
        actual: null,
    },
    {
        age: 1,
        weight: 3,
        normal: 2,
        actual: null,
    },
    {
        age: 2,
        weight: 4,
        normal: 2.5,
        actual: 2,
    },
    {
        age: 3,
        weight: 5,
        normal: 3,
        actual: 4,
    },
    {
        age: 4,
        weight: 6,
        normal: 3.5,
        actual: 5,
    },
    {
        age: 5,
        weight: 7,
        normal: 4,
        actual: null,
    },
];

interface Props {
    child: ChildType;
    parent: ParentType;
    ageString: string;
    measurements: MeasurementType[];
}

export default function ChildInfo({
    child,
    parent,
    ageString,
    measurements,
}: Props) {
    const [measureRecords, setMeasureRecords] =
        useState<MeasurementType[]>(measurements);
    const [selectedMeasureRecord, setSelectedMeasureRecord] =
        useState<MeasurementType | null>(null);
    const [historyData, setHistoryData] = useState<HistoryType[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<HistoryType | null>(
        null,
    );

    const summary = {
        bbCategory: '',
        pbCategory: '',
        bbPbCategory: '',
        imtCategory: '',
    };

    useEffect(() => {
        const sortedMeasurements = measurements.sort((a, b) =>
            b.note_date.localeCompare(a.note_date),
        );
        setHistoryData(
            sortedMeasurements.map((measure, index) => ({
                id: index,
                note_date: measure.note_date,
            })),
        );
        setSelectedHistory({
            id: 0,
            note_date: sortedMeasurements[0].note_date,
        });
        setMeasureRecords(sortedMeasurements);
    }, [measurements]);

    const handleSelectMeasureRecord = (record: MeasurementType) => {
        setSelectedMeasureRecord(record);
    };

    const handleSelectHistory = (history: HistoryType) => {
        setSelectedHistory(history);
        setSelectedMeasureRecord(measureRecords[history.id]);
    };
    return (
        <SigiziLayout>
            <Head title={`Detail Informasi Anak`} />
            <div className="flex flex-col items-center justify-center gap-4 pt-6 pb-4 md:flex-row md:justify-between md:pt-8 md:pb-4">
                <div className="flex items-center gap-4">
                    <Link href="/children">
                        <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
                    </Link>
                    <h1 className="text-2xl font-semibold md:text-4xl">
                        {child.name}
                    </h1>
                </div>
                <div className="flex gap-2">
                    <ChildCreateMeasure id={child.id} />
                    <Button variant="outline">
                        <Download className="mr-1 h-4 w-4" /> Download Report
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-start gap-4 py-4 md:flex-row">
                <div className="flex w-full flex-col gap-4 md:w-1/3">
                    <Card className="w-full rounded-none md:rounded-lg">
                        <CardContent className="flex flex-col gap-4">
                            <ChildBio
                                child={child}
                                parent={parent}
                                age={ageString}
                            />
                            <ChildHistory
                                historyData={[]}
                                // historyData={historyData}
                                selectedHistory={selectedHistory}
                                handleSelectHistory={handleSelectHistory}
                            />
                        </CardContent>
                    </Card>
                    <ChildSummary summary={summary} />
                </div>
                <div className="flex w-full flex-col gap-4 md:w-2/3">
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Pengukuran Fisik
                            </CardTitle>
                            <CardDescription>
                                {selectedMeasureRecord?.note_date &&
                                    formatDateToReadable(
                                        selectedMeasureRecord.note_date,
                                    )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex w-full flex-col flex-wrap gap-4 md:flex-row">
                            <div className="flex-1">
                                <h1 className="font-bold">Berat Badan</h1>
                                <p>14 kg</p>
                            </div>
                            <div className="flex-1">
                                <h1 className="font-bold">Panjang Badan</h1>
                                <p>140 cm</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Berat Badan menurut Umur (BB/U)
                            </CardTitle>
                            <CardDescription>
                                {selectedMeasureRecord?.note_date &&
                                    formatDateToReadable(
                                        selectedMeasureRecord.note_date,
                                    )}
                            </CardDescription>
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
                                        <TableCell>-2SD</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>Normal</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <LineChart
                                style={{
                                    width: '100%',
                                    aspectRatio: 1.5,
                                    margin: 'auto',
                                }}
                                responsive
                                data={data}
                            >
                                <CartesianGrid
                                    stroke="#eee"
                                    strokeDasharray="5 5"
                                />
                                <XAxis
                                    dataKey="age"
                                    label={{
                                        value: 'Umur',
                                        position: 'top',
                                        angle: 0,
                                    }}
                                />
                                <YAxis
                                    dataKey="weight"
                                    label={{
                                        value: 'Berat Bedan',
                                        position: 'insideLeft',
                                        angle: -90,
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="normal"
                                    stroke="#82ca9d"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#333333"
                                />
                            </LineChart>
                        </CardContent>
                    </Card>
                    <ChildMeasurement
                        title="Panjang Badan menurut Umur (PB/U)"
                        data={['2SD', '13', '14', 'Normal']}
                        description={
                            selectedMeasureRecord?.note_date
                                ? formatDateToReadable(
                                      selectedMeasureRecord.note_date,
                                  )
                                : ''
                        }
                    />
                    <ChildMeasurement
                        title="Berat Badan menurut Panjang Badan (BB/PB)"
                        data={['3SD', '15', '15', 'Normal']}
                        description={
                            selectedMeasureRecord?.note_date
                                ? formatDateToReadable(
                                      selectedMeasureRecord.note_date,
                                  )
                                : ''
                        }
                    />
                    <ChildMeasurement
                        title="Indeks Massa Tubuh menurut Umur (IMT/U)"
                        data={['-2SD', '14', '15', 'Normal']}
                        description={
                            selectedMeasureRecord?.note_date
                                ? formatDateToReadable(
                                      selectedMeasureRecord.note_date,
                                  )
                                : ''
                        }
                    />
                </div>
            </div>
        </SigiziLayout>
    );
}
