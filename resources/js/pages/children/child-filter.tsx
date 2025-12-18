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
import { ChildFilterType } from '@/types/child-info';
import { useState } from 'react';

interface Props {
    setFilters: (filters: ChildFilterType) => void;
}

export default function ChildFilter({ setFilters }: Props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | 'all'>('all');

    const resetFilters = () => {
        setName('');
        setGender('all');
    };

    const handleFilter = () => {
        setFilters({
            name,
            gender,
        });
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
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama yang ingin difilter"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Select
                        name="gender"
                        value={gender}
                        onValueChange={(value) =>
                            setGender(value as 'male' | 'female' | 'all')
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                            <SelectItem value="all">Semua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetFilters}>
                    Reset Filter
                </Button>
                <Button onClick={handleFilter}>Terapkan Filter</Button>
            </CardFooter>
        </Card>
    );
}
