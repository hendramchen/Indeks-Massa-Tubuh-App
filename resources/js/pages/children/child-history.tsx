import { cn, formatDateToReadable } from '@/lib/utils';
import { HistoryType } from '@/types/child-info';
import { ArrowRight } from 'lucide-react';

interface Props {
    historyData: HistoryType[];
    selectedHistory: HistoryType | null;
    handleSelectHistory: (history: HistoryType) => void;
}
export default function ChildHistory({
    historyData,
    selectedHistory,
    handleSelectHistory,
}: Props) {
    return (
        <div className="w-full border-t border-gray-200 pt-4">
            <h1 className="text-xl font-semibold text-[#d6336c]">
                Riwayat Imunisasi
            </h1>
            {historyData.length === 0 ? (
                <p className="py-4 text-gray-500">
                    Tidak ada riwayat imunisasi
                </p>
            ) : (
                <ul>
                    {historyData.map((history) => (
                        <li
                            className={cn(
                                'flex cursor-pointer items-center justify-between border-b py-2 hover:bg-gray-50',
                                selectedHistory === history && 'bg-gray-50',
                            )}
                            onClick={() => handleSelectHistory(history)}
                        >
                            <p
                                className={cn(
                                    'font-bold text-gray-800',
                                    selectedHistory === history &&
                                        'text-[#d6336c]',
                                )}
                            >
                                {formatDateToReadable(history.note_date)}
                            </p>
                            <ArrowRight
                                className={cn(
                                    'h-5 w-5 text-gray-800',
                                    selectedHistory === history &&
                                        'text-[#d6336c]',
                                )}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
