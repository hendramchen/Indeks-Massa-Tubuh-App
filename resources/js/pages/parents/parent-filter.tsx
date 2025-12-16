import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import SelectCreate, { AutocompleteOption } from '@/components/select-create';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParentFilterType } from '@/types/parent-info';
import { useEffect, useState } from 'react';

interface Props {
    setFilters: (filters: ParentFilterType) => void;
}

export default function ParentFilter({ setFilters }: Props) {
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState<AutocompleteOption[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState<AutocompleteOption[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetch('/city')
            .then((response) => response.json())
            .then((data) => {
                const cityData = data.map((city: any) => {
                    return {
                        label: city.name,
                        value: city.name,
                    };
                });
                setCities(cityData);
            });
    }, []);

    useEffect(() => {
        fetch('/district')
            .then((response) => response.json())
            .then((data) => {
                const districtData = data.map((district: any) => {
                    return {
                        label: district.name,
                        value: district.name,
                    };
                });
                setDistricts(districtData);
            });
    }, []);

    const resetFilters = () => {
        setName('');
        setPhone('');
        setSelectedCity('');
        setSelectedDistrict('');
    };

    const handleFilter = () => {
        setFilters({
            name,
            phone,
            city: selectedCity,
            district: selectedDistrict,
        });
    };

    return (
        <Card className="rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle>Filter Daftar Orang Tua</CardTitle>
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
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Masukkan nomor telepon yang ingin difilter"
                    />
                </div>
                <SelectCreate
                    placeholder="Kabupaten/Kota"
                    options={cities}
                    setOptions={setCities}
                    selectedOption={selectedCity}
                    setSelectedOption={setSelectedCity}
                />
                <SelectCreate
                    placeholder="Kecamatan/Desa"
                    options={districts}
                    setOptions={setDistricts}
                    selectedOption={selectedDistrict}
                    setSelectedOption={setSelectedDistrict}
                />
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
