import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SigiziLayout from '@/layouts/sigizi-layout';
// import getChartBB from '@/lib/chart-func';
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
import { useState } from 'react';
import ChildBio from './child-bio';
import ChildCreateMeasure from './child-create-measure';
import ChildHistory from './child-history';
import ChildMeasurement from './child-measurement';
import ChildSummary from './child-summary';

interface Props {
    child: ChildType;
    parent: ParentType;
    histories: HistoryType[];
    // measurements: MeasurementType[];
    // chartData: ZscoreField[];
}

export default function ChildInfo({ child, parent, histories }: Props) {
    // const [measureRecords, setMeasureRecords] = useState<MeasurementType[]>([]);
    const [selectedMeasureRecord, setSelectedMeasureRecord] =
        useState<MeasurementType | null>(null);
    // const [historyData, setHistoryData] = useState<HistoryType[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<HistoryType | null>(
        null,
    );
    const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(
        null,
    );

    const fetchMeasurement = async (history: HistoryType) => {
        const response = await fetch(`/measurements/${history.id}`);
        const { data } = await response.json();
        if (data) {
            const measurement: MeasurementType = data;
            setSelectedMeasureRecord(measurement);
            const summary = {
                bbCategory: measurement?.weight_category,
                pbCategory: measurement?.height_category,
                bbPbCategory: measurement?.wh_category,
                imtCategory: measurement?.imt_category,
            };
            setCurrentSummary(summary);
        }
    };

    const handleSelectHistory = async (history: HistoryType) => {
        setSelectedHistory(history);
        // call api to get measurement by history id
        await fetchMeasurement(history);
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
                            <ChildBio child={child} parent={parent} />
                            <ChildHistory
                                historyData={histories}
                                selectedHistory={selectedHistory}
                                handleSelectHistory={handleSelectHistory}
                            />
                        </CardContent>
                    </Card>
                    <ChildSummary summary={currentSummary} />
                </div>
                {histories.length === 0 && (
                    <Card className="w-full rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Belum ada pengukuran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <p>Silahkan tambah atau buat pengukuran baru.</p>
                        </CardContent>
                    </Card>
                )}
                {histories.length > 0 && !selectedHistory && (
                    <Card className="w-full rounded-none md:rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                Pilih riwayat pengukuran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <p>
                                Pilih riwayat sesuai tanggal pengukuran, maka
                                data akan dimuat dan ditampilkan.
                            </p>
                        </CardContent>
                    </Card>
                )}
                {histories.length > 0 && selectedHistory && (
                    <div className="flex w-full flex-col gap-4 md:w-2/3">
                        <Card className="rounded-none md:rounded-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-[#d6336c]">
                                    Pengukuran Fisik & Umur
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
                                <div className="flex-1">
                                    <h1 className="font-bold">Umur</h1>
                                    <p>{selectedMeasureRecord?.age} bulan</p>
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
                                    // zscoreType="BB/U"
                                    // gender={child.gender}
                                    // age={selectedMeasureRecord.age}
                                />
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
                                    // zscoreType="weight"
                                    // gender={child.gender}
                                    // age={selectedMeasureRecord.age}
                                />
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
                                    // zscoreType="wh"
                                    // gender={child.gender}
                                    // age={selectedMeasureRecord.age}
                                />
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
                                    // zscoreType="imt"
                                    // gender={child.gender}
                                    // age={selectedMeasureRecord.age}
                                />
                            )}
                    </div>
                )}
            </div>
        </SigiziLayout>
    );
}
