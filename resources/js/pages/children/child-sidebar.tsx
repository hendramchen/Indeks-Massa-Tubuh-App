import { Card, CardContent } from '@/components/ui/card';

import { ChildType, HistoryType } from '@/types/child-info';
import { ParentType } from '@/types/parent-info';

interface ChildSidebarProps {
    child: ChildType;
    parent: ParentType;
    age: string;
    historyData: HistoryType[];
    selectedHistory: HistoryType | null;
    handleSelectHistory: (history: HistoryType) => void;
}

export function ChildSidebar({
    child,
    parent,
    age,
    historyData,
    selectedHistory,
    handleSelectHistory,
}: ChildSidebarProps) {
    return (
        <div className="flex w-full flex-col gap-4 md:w-1/3">
            <Card className="w-full rounded-none md:rounded-lg">
                <CardContent className="flex flex-col gap-4"></CardContent>
            </Card>
        </div>
    );
}
