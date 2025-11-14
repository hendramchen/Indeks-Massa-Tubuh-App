import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ImtResult } from '@/types/zscore';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface HistoryProps {
    imtResult: ImtResult[];
}

export default function History({ imtResult }: HistoryProps) {
    // Filter states
    const [cityFilter, setCityFilter] = useState<string>('all');
    const [ageFilter, setAgeFilter] = useState<string>('all');
    const [genderFilter, setGenderFilter] = useState<string>('all');

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // Get unique values for filter options
    const uniqueCities = useMemo(() => {
        const cities = [...new Set(imtResult.map((item) => item.city))].filter(
            Boolean,
        );
        return cities.sort();
    }, [imtResult]);

    const uniqueAges = useMemo(() => {
        const ages = [...new Set(imtResult.map((item) => item.age))].filter(
            Boolean,
        );
        return ages.sort((a, b) => a - b);
    }, [imtResult]);

    const uniqueGenders = useMemo(() => {
        const genders = [
            ...new Set(imtResult.map((item) => item.gender)),
        ].filter(Boolean);
        return genders.sort();
    }, [imtResult]);

    // Filter data based on selected filters
    const filteredData = useMemo(() => {
        return imtResult.filter((item) => {
            const matchesCity =
                cityFilter === 'all' || !cityFilter || item.city === cityFilter;
            const matchesAge =
                ageFilter === 'all' ||
                !ageFilter ||
                item.age.toString() === ageFilter;
            const matchesGender =
                genderFilter === 'all' ||
                !genderFilter ||
                item.gender === genderFilter;
            return matchesCity && matchesAge && matchesGender;
        });
    }, [imtResult, cityFilter, ageFilter, genderFilter]);

    // Paginate filtered data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, itemsPerPage]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Reset to first page when filters change
    const handleFilterChange = (filterType: string, value: string) => {
        setCurrentPage(1);
        switch (filterType) {
            case 'city':
                setCityFilter(value);
                break;
            case 'age':
                setAgeFilter(value);
                break;
            case 'gender':
                setGenderFilter(value);
                break;
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setCityFilter('all');
        setAgeFilter('all');
        setGenderFilter('all');
        setCurrentPage(1);
    };

    return (
        <div>
            <Head title="Riwayat Perhitungan" />
            <Header />
            <div className="px-1 py-4 md:px-4">
                <h1 className="mb-6 text-2xl font-bold">Riwayat Perhitungan</h1>

                {/* Filter Section */}
                <div className="mb-6 rounded-lg border bg-gray-50 p-4">
                    <h2 className="mb-4 text-lg font-semibold">Filter Data</h2>
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Kabupaten/Kota
                            </label>
                            <Select
                                value={cityFilter}
                                onValueChange={(value) =>
                                    handleFilterChange('city', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Kota" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Semua Kota
                                    </SelectItem>
                                    {uniqueCities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Umur
                            </label>
                            <Select
                                value={ageFilter}
                                onValueChange={(value) =>
                                    handleFilterChange('age', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Umur" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Semua Umur
                                    </SelectItem>
                                    {uniqueAges.map((age) => (
                                        <SelectItem
                                            key={age}
                                            value={age.toString()}
                                        >
                                            {age} bulan
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Gender
                            </label>
                            <Select
                                value={genderFilter}
                                onValueChange={(value) =>
                                    handleFilterChange('gender', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Semua Gender
                                    </SelectItem>
                                    {uniqueGenders.map((gender) => (
                                        <SelectItem key={gender} value={gender}>
                                            {gender}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Button
                                onClick={clearFilters}
                                variant="outline"
                                className="w-full"
                            >
                                Reset Filter
                            </Button>
                        </div>
                    </div>

                    {/* Results info */}
                    <div className="mt-4 text-sm text-gray-600">
                        Menampilkan {paginatedData.length} dari{' '}
                        {filteredData.length} data
                        {filteredData.length !== imtResult.length && (
                            <span>
                                {' '}
                                (difilter dari {imtResult.length} total data)
                            </span>
                        )}
                    </div>
                </div>

                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="border border-gray-300">
                                No
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Nama Anak
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Nama Orang Tua
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Umur
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Gender
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Berat Badan
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Tinggi Badan
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                BB / U
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                PB / U
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                BB / PB
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                IMT
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Provinsi
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Kabupaten / Kota
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Kecamatan / Desa
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Alamat
                            </TableHead>
                            <TableHead className="border border-gray-300">
                                Tanggal
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={13}
                                    className="border border-gray-300 py-8 text-center text-gray-500"
                                >
                                    {filteredData.length === 0 &&
                                    imtResult.length > 0
                                        ? 'Tidak ada data yang sesuai dengan filter yang dipilih'
                                        : 'Belum ada data riwayat perhitungan'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="border border-gray-300">
                                        {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        <Link
                                            href={`/imt-result/${item.id}`}
                                            className="cursor-pointer font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {item.child_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.parent_name}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.age}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.gender}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.weight}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.height}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.weight_zscore}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.height_zscore}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.wh_zscore}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.imt_zscore}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.province}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.city}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.district}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.address}
                                    </TableCell>
                                    <TableCell className="border border-gray-300">
                                        {item.created_at}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Halaman {currentPage} dari {totalPages}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                size="sm"
                            >
                                Pertama
                            </Button>
                            <Button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                size="sm"
                            >
                                Sebelumnya
                            </Button>

                            {/* Page numbers */}
                            <div className="flex items-center space-x-1">
                                {Array.from(
                                    { length: Math.min(5, totalPages) },
                                    (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (
                                            currentPage >=
                                            totalPages - 2
                                        ) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                onClick={() =>
                                                    setCurrentPage(pageNum)
                                                }
                                                variant={
                                                    currentPage === pageNum
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    },
                                )}
                            </div>

                            <Button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                size="sm"
                            >
                                Selanjutnya
                            </Button>
                            <Button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                size="sm"
                            >
                                Terakhir
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
