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
import { Form } from '@inertiajs/react';
import { useState } from 'react';

interface ResultFormProps {
    childName: string;
    gender: string;
    age: number;
    year: number;
    weight: number;
    height: number;
    weightNearest: string;
    weightZscore: string;
    weightCategory: string;
    heightNearest: string;
    heightZscore: string;
    heightCategory: string;
    whNearest: string;
    whZscore: string;
    whCategory: string;
    imtNearest: string;
    imtZscore: string;
    imtCategory: string;
}

export default function ResultForm({
    childName,
    gender,
    age,
    year,
    weight,
    height,
    weightNearest,
    weightZscore,
    weightCategory,
    heightNearest,
    heightZscore,
    heightCategory,
    whNearest,
    whZscore,
    whCategory,
    imtNearest,
    imtZscore,
    imtCategory,
}: ResultFormProps) {
    const [name, setName] = useState<string>('');
    const [province, setProvince] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    return (
        <Form action="/imt-result" method="post">
            <Card>
                <CardHeader>
                    <CardTitle>Data Diri</CardTitle>
                    <CardDescription>
                        Lengkapi form ini untuk menyimpan data
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <input type="hidden" name="child_name" value={childName} />
                    <input type="hidden" name="gender" value={gender} />
                    <input type="hidden" name="age" value={age} />
                    <input type="hidden" name="year" value={year} />
                    <input type="hidden" name="weight" value={weight} />
                    <input type="hidden" name="height" value={height} />
                    <input
                        type="hidden"
                        name="weight_nearest"
                        value={weightNearest}
                    />
                    <input
                        type="hidden"
                        name="weight_zscore"
                        value={weightZscore}
                    />
                    <input
                        type="hidden"
                        name="weight_category"
                        value={weightCategory}
                    />
                    <input
                        type="hidden"
                        name="height_nearest"
                        value={heightNearest}
                    />
                    <input
                        type="hidden"
                        name="height_zscore"
                        value={heightZscore}
                    />
                    <input
                        type="hidden"
                        name="height_category"
                        value={heightCategory}
                    />

                    <input type="hidden" name="wh_nearest" value={whNearest} />
                    <input type="hidden" name="wh_zscore" value={whZscore} />
                    <input
                        type="hidden"
                        name="wh_category"
                        value={whCategory}
                    />

                    <input
                        type="hidden"
                        name="imt_nearest"
                        value={imtNearest}
                    />
                    <input type="hidden" name="imt_zscore" value={imtZscore} />
                    <input
                        type="hidden"
                        name="imt_category"
                        value={imtCategory}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="parent_name">
                            Nama Orang Tua (Ibu / wali)
                        </Label>
                        <Input
                            id="parent_name"
                            name="parent_name"
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
                    <div className="space-y-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Contoh: Jl. Raya No. 1"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                        Batal
                    </Button>
                    <Button className="flex-1" type="submit">
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </Form>
    );
}
