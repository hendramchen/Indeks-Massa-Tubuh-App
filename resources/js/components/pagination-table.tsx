import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationTableProps {
    links: Array<{ url: string | null; label: string; active: boolean }>;
    onPageChange: (url: string) => void;
}

export default function PaginationTable({
    links,
    onPageChange,
}: PaginationTableProps) {
    const handlePageClick = (url: string) => {
        if (url) onPageChange(url);
    };
    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageClick(links[0].url || '')}
                        isActive={links[0].active}
                        className="cursor-pointer"
                    />
                </PaginationItem>
                {links.map((link, index) => {
                    if (index === 0 || index === links.length - 1) return null;
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                isActive={link.active}
                                onClick={() => handlePageClick(link.url || '')}
                                className="cursor-pointer"
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            handlePageClick(links[links.length - 1].url || '')
                        }
                        isActive={links[links.length - 1].active}
                        className="cursor-pointer"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
