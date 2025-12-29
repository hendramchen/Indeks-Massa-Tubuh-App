import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SigiziLayout from '@/layouts/sigizi-layout';
import getChartBB from '@/lib/chart-func';
import { formatDateToReadable } from '@/lib/utils';
import {
    ChildType,
    HistoryType,
    MeasurementType,
    SummaryType,
} from '@/types/child-info';
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

const chartData = [
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
    const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(
        null,
    );
    const [chartBB, setChartBB] = useState([]);
    const chartDataBB = getChartBB(42, 14);
    console.log(chartDataBB);
    // const [chartPB, setChartPB] = useState([]);
    // const [chartIMT, setChartIMT] = useState([]);

    useEffect(() => {
        if (measurements.length === 0) return;
        const histories = measurements.map((measure, index) => ({
            id: index,
            note_date: measure.note_date,
        }));
        setHistoryData(histories);
        setSelectedHistory({
            id: 0,
            note_date: measurements[0].note_date,
        });
        setSelectedMeasureRecord(measurements[0]);
    }, [measurements]);

    const handleSelectHistory = (history: HistoryType) => {
        setSelectedHistory(history);
        setSelectedMeasureRecord(measureRecords[history.id]);
        const summ = {
            bbCategory: measureRecords[history.id].weight_category,
            pbCategory: measureRecords[history.id].height_category,
            bbPbCategory: measureRecords[history.id].wh_category,
            imtCategory: measureRecords[history.id].imt_category,
        };
        setCurrentSummary(summ);
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
                                historyData={historyData}
                                selectedHistory={selectedHistory}
                                handleSelectHistory={handleSelectHistory}
                            />
                        </CardContent>
                    </Card>
                    <ChildSummary summary={currentSummary} />
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
                                <p>{selectedMeasureRecord?.weight} kg</p>
                            </div>
                            <div className="flex-1">
                                <h1 className="font-bold">Panjang Badan</h1>
                                <p>{selectedMeasureRecord?.height} cm</p>
                            </div>
                        </CardContent>
                    </Card>
                    {selectedMeasureRecord &&
                        selectedMeasureRecord.weight_nearest && (
                            <ChildMeasurement
                                title="Berat Badan menurut Umur (BB/U)"
                                data={[
                                    selectedMeasureRecord.weight_zscore.toString(),
                                    selectedMeasureRecord.weight_nearest.toString(),
                                    selectedMeasureRecord.weight.toString(),
                                    selectedMeasureRecord.weight_category,
                                ]}
                                description={formatDateToReadable(
                                    selectedMeasureRecord.note_date,
                                )}
                            >
                                <LineChart
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1.5,
                                        margin: 'auto',
                                    }}
                                    responsive
                                    data={chartDataBB}
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
                                </LineChart>
                            </ChildMeasurement>
                        )}
                    {selectedMeasureRecord &&
                        selectedMeasureRecord.height_nearest && (
                            <ChildMeasurement
                                title="Panjang Badan menurut Umur (PB/U)"
                                data={[
                                    selectedMeasureRecord.height_zscore.toString(),
                                    selectedMeasureRecord.height_nearest.toString(),
                                    selectedMeasureRecord.height.toString(),
                                    selectedMeasureRecord.height_category,
                                ]}
                                description={formatDateToReadable(
                                    selectedMeasureRecord.note_date,
                                )}
                            >
                                <LineChart
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1.5,
                                        margin: 'auto',
                                    }}
                                    responsive
                                    data={chartData}
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
                                            value: 'Panjang Bedan',
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
                            </ChildMeasurement>
                        )}
                    {selectedMeasureRecord &&
                        selectedMeasureRecord.wh_nearest && (
                            <ChildMeasurement
                                title="Berat Badan menurut Panjang Badan (BB/PB)"
                                data={[
                                    selectedMeasureRecord.wh_zscore.toString(),
                                    selectedMeasureRecord.wh_nearest.toString(),
                                    selectedMeasureRecord.weight.toString(),
                                    selectedMeasureRecord.wh_category,
                                ]}
                                description={formatDateToReadable(
                                    selectedMeasureRecord.note_date,
                                )}
                            >
                                <LineChart
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1.5,
                                        margin: 'auto',
                                    }}
                                    responsive
                                    data={chartData}
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
                            </ChildMeasurement>
                        )}
                    {selectedMeasureRecord &&
                        selectedMeasureRecord.imt_nearest && (
                            <ChildMeasurement
                                title="Indeks Massa Tubuh menurut Umur (IMT/U)"
                                data={[
                                    selectedMeasureRecord.imt_zscore.toString(),
                                    selectedMeasureRecord.imt_nearest.toString(),
                                    selectedMeasureRecord.imt_actual.toString(),
                                    selectedMeasureRecord.imt_category,
                                ]}
                                description={formatDateToReadable(
                                    selectedMeasureRecord.note_date,
                                )}
                            >
                                <LineChart
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1.5,
                                        margin: 'auto',
                                    }}
                                    responsive
                                    data={chartData}
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
                            </ChildMeasurement>
                        )}
                </div>
            </div>
        </SigiziLayout>
    );
}
