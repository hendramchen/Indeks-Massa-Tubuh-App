import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';

interface ZScoreIndexProps {
    title: string;
    subtitle: string;
    tableData: {
        category: string[];
        zScore: string[];
    }[];
}

export default function ZScoreIndex({
    title,
    subtitle,
    tableData,
}: ZScoreIndexProps) {
    const renderCategory = (category: string[]) => {
        if (category.length === 0) {
            return null;
        }
        return category.map((item, index) => (
            <p key={index} className={index === 1 ? 'italic' : ''}>
                {index === 1 ? `(${item})` : item}
            </p>
        ));
    };

    const renderZScore = (zScore: string[]) => {
        if (zScore.length === 0) {
            return null;
        }
        return zScore.map((item, index) => {
            switch (item) {
                case '<':
                    return <ChevronLeft size={16} key={index} />;
                case '>':
                    return <ChevronRight size={16} key={index} />;
                case 'to':
                    return <MoveRight key={index} />;
                default:
                    return <p key={index}>{item}</p>;
            }
        });
    };
    return (
        <div className="w-full bg-gray-100 py-4 md:w-[600px] md:rounded-lg">
            <div className="flex flex-col justify-center px-2">
                <h2 className="text-center font-bold text-gray-800">{title}</h2>
                <p className="text-center text-gray-800">{subtitle}</p>
            </div>
            <Table className="mt-6 w-full text-gray-800">
                <TableHeader>
                    <TableRow className="bg-gray-200">
                        <TableHead className="text-gray-800">
                            Kategori Status Gizi
                        </TableHead>
                        <TableHead className="text-right text-gray-800">
                            Ambang Batas
                            <br />
                            (Z-Score)
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {renderCategory(item.category)}
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                                {renderZScore(item.zScore)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
