import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    summary: {
        bbCategory: string;
        pbCategory: string;
        bbPbCategory: string;
        imtCategory: string;
    };
}
export default function ChildSummary({ summary }: Props) {
    const { bbCategory, pbCategory, bbPbCategory, imtCategory } = summary;
    return (
        <Card className="w-full rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#d6336c]">
                    Ringkasan Hasil Pengukuran
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Berat Badan menurut Umur (BB/U)
                    </h2>
                    <p className="text-gray-800">
                        {bbCategory ? bbCategory : '-'}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Panjang Badan menurut Umur (PB/U)
                    </h2>
                    <p className="text-gray-800">
                        {pbCategory ? pbCategory : '-'}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Berat Badan menurut Panjang Badan (BB/PB)
                    </h2>
                    <p className="text-gray-800">
                        {bbPbCategory ? bbPbCategory : '-'}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Indeks Massa Tubuh menurut Umur (IMT/U)
                    </h2>
                    <p className="text-gray-800">
                        {imtCategory ? imtCategory : '-'}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
