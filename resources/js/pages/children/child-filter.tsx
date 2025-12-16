import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export default function ChildFilter() {
    const [nama, setNama] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');

    const resetFilters = () => {
        setNama('');
    };

    const handleFilter = () => {
        // setFilters({
        //     name: nama,
        //     phone: phone,
        //     city: selectedCity,
        //     district: selectedDistrict,
        // });
    };

    return (
        <Card className="rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle>Filter Daftar Anak</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        id="nama"
                        name="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama yang ingin difilter"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Select
                        name="gender"
                        value={gender}
                        onValueChange={(value) =>
                            setGender(value as 'male' | 'female')
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
                <Button onClick={handleFilter}>Filter</Button>
            </CardFooter>
        </Card>
    );
}
