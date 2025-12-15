import ZscoreIndex from '@/components/zscore-index';
// import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';

const tableBBData = [
    {
        category: ['Berat badan sangat kurang', 'severely underweight'],
        zScore: ['<', '- 3 SD'],
    },
    {
        category: ['Berat badan kurang', 'underweight'],
        zScore: ['-3 SD', 'to', '<', '-2 SD'],
    },
    {
        category: ['Berat badan normal'],
        zScore: ['-2 SD', 'to', '+1 SD'],
    },
    {
        category: ['Risiko Berat badan lebih'],
        zScore: ['>', '+1 SD'],
    },
];

const tablePBData = [
    {
        category: ['Sangat pendek', 'severely stunted'],
        zScore: ['<', '-3 SD'],
    },
    {
        category: ['Pendek', 'stunted'],
        zScore: ['-3 SD', 'to', '<', '-2 SD'],
    },
    {
        category: ['Normal'],
        zScore: ['-2 SD', 'to', '+3 SD'],
    },
    {
        category: ['Tinggi'],
        zScore: ['>', '+3 SD'],
    },
];

const tableBBPBData = [
    {
        category: ['Gizi buruk', 'severely wasted'],
        zScore: ['<', '-3 SD'],
    },
    {
        category: ['Gizi kurang', 'wasted'],
        zScore: ['-3 SD', 'to', '<', '-2 SD'],
    },
    {
        category: ['Gizi baik', 'normal'],
        zScore: ['-2 SD', 'to', '+1 SD'],
    },
    {
        category: ['Berisiko gizi lebih', 'possible risk of overweight'],
        zScore: ['>', '+1 SD', 'to', '+2 SD'],
    },
    {
        category: ['Gizi lebih', 'overweight'],
        zScore: ['>', '+2 SD', 'to', '+3 SD'],
    },
    {
        category: ['Obesitas', 'obese'],
        zScore: ['>', '+3 SD'],
    },
];

const tableIMTData = [
    {
        category: ['Gizi buruk', 'severely wasted'],
        zScore: ['<', '-3 SD'],
    },
    {
        category: ['Gizi kurang', 'wasted'],
        zScore: ['-3 SD', 'to', '<', '-2 SD'],
    },
    {
        category: ['Gizi baik', 'normal'],
        zScore: ['-2 SD', 'to', '+1 SD'],
    },
    {
        category: ['Berisiko gizi lebih', 'possible risk of overweight'],
        zScore: ['>', '+1 SD', 'to', '+2 SD'],
    },
    {
        category: ['Gizi lebih', 'overweight'],
        zScore: ['>', '+2 SD', 'to', '+3 SD'],
    },
    {
        category: ['Obesitas', 'obese'],
        zScore: ['>', '+3 SD'],
    },
];

const tableIMT5PlusData = [
    {
        category: ['Gizi buruk', 'severely thinness'],
        zScore: ['<', '-3 SD'],
    },
    {
        category: ['Gizi kurang', 'thinness'],
        zScore: ['-3 SD', 'to', '<', '-2 SD'],
    },
    {
        category: ['Gizi baik', 'normal'],
        zScore: ['-2 SD', 'to', '+1 SD'],
    },
    {
        category: ['Gizi lebih', 'overweight'],
        zScore: ['+1 SD', 'to', '+2 SD'],
    },
    {
        category: ['Obesitas', 'obese'],
        zScore: ['>', '+2 SD'],
    },
];

export default function AntropometriTable() {
    return (
        <div className="my-6">
            <h1 className="mb-4 border-b border-gray-200 pb-4 text-center text-2xl font-bold text-[#d6336c] md:text-4xl">
                Kategori dan Ambang Batas
                <br />
                Status Gizi Anak
            </h1>
            <div className="flex flex-col justify-center gap-4 md:flex-row md:flex-wrap">
                <ZscoreIndex
                    title="Berat Badan Menurut Umur (BB/U)"
                    subtitle="anak usia 0 - 60 bulan"
                    tableData={tableBBData}
                />
                <ZscoreIndex
                    title="Panjang Badan atau Tinggi Badan menurut Umur (PB/U atau TB/U)"
                    subtitle="anak usia 0 - 60 bulan"
                    tableData={tablePBData}
                />
                <ZscoreIndex
                    title="Berat Badan menurut Panjang Badan atau Tinggi Badan (BB/PB atau BB/TB)"
                    subtitle="anak usia 0 - 60 bulan"
                    tableData={tableBBPBData}
                />
                <ZscoreIndex
                    title="Indeks Massa Tubuh menurut Umur (IMT/U)"
                    subtitle="anak usia 0 - 60 bulan"
                    tableData={tableIMTData}
                />
                <ZscoreIndex
                    title="Indeks Massa Tubuh menurut Umur (IMT/U)"
                    subtitle="anak usia 5 - 18 tahun"
                    tableData={tableIMT5PlusData}
                />
            </div>
        </div>
    );
}
