import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Form } from '@inertiajs/react';
import { useState } from 'react';

export default function ResultForm() {
    const [name, setName] = useState<string>('');
    const [province, setProvince] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    return (
        // <Form action="">
        <Card>
            <CardHeader>
                <CardTitle>Data Diri</CardTitle>
                <CardDescription>
                    Lengkapi form ini untuk menyimpan data
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Orang Tua (Ibu / wali)</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Masukkan nama ibu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="province">Provinsi</Label>
                    <Input
                        id="province"
                        name="province"
                        type="text"
                        placeholder="Masukkan provinsi"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">Kabupaten / Kota</Label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Masukkan kabupaten / kota"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="district">Kecamatan / Desa</Label>
                    <Input
                        id="district"
                        name="district"
                        type="text"
                        placeholder="Masukkan kecamatan / desa"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                    Batal
                </Button>
                <Button className="flex-1">Simpan</Button>
            </CardFooter>
        </Card>
        // </Form>
    );
}
