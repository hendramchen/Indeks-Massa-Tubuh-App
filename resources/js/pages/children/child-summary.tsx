import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryType } from '@/types/child-info';

interface Props {
    summary: SummaryType | null;
}
export default function ChildSummary({ summary }: Props) {
    return (
        <Card className="w-full rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#d6336c]">
                    Ringkasan Hasil Pengukuran
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!summary && (
                    <p className="py-4 text-gray-500">
                        Tidak ada data pengukuran yang ditemukan
                    </p>
                )}
                {summary && summary.bbCategory && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Berat Badan menurut Umur (BB/U)
                        </h2>
                        <p className="text-gray-800">{summary.bbCategory}</p>
                    </div>
                )}

                {summary && summary.pbCategory && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Panjang Badan menurut Umur (PB/U)
                        </h2>
                        <p className="text-gray-800">{summary.pbCategory}</p>
                    </div>
                )}
                {summary && summary.bbPbCategory && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Berat Badan menurut Panjang Badan (BB/PB)
                        </h2>
                        <p className="text-gray-800">{summary.bbPbCategory}</p>
                    </div>
                )}
                {summary && summary.imtCategory && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Indeks Massa Tubuh menurut Umur (IMT/U)
                        </h2>
                        <p className="text-gray-800">{summary.imtCategory}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
