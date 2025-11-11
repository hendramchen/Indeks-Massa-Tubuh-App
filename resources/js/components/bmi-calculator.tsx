import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

interface BMIResult {
    bmi: number;
    category: string;
    categoryColor: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function BMICalculator() {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [ageGroup, setAgeGroup] = useState<'toddler' | 'kid'>('toddler');
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [result, setResult] = useState<BMIResult | null>(null);

    // const calculateBMI = () => {
    //     const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
    //     const weightInKg = parseFloat(weight);

    //     if (heightInMeters > 0 && weightInKg > 0) {
    //         const bmi = weightInKg / (heightInMeters * heightInMeters);
    //         const roundedBMI = Math.round(bmi * 10) / 10;

    //         let category: string;
    //         let categoryColor:
    //             | 'default'
    //             | 'secondary'
    //             | 'destructive'
    //             | 'outline';

    //         if (bmi < 18.5) {
    //             category = 'Underweight';
    //             categoryColor = 'outline';
    //         } else if (bmi >= 18.5 && bmi < 25) {
    //             category = 'Normal weight';
    //             categoryColor = 'secondary';
    //         } else if (bmi >= 25 && bmi < 30) {
    //             category = 'Overweight';
    //             categoryColor = 'default';
    //         } else {
    //             category = 'Obese';
    //             categoryColor = 'destructive';
    //         }

    //         setResult({
    //             bmi: roundedBMI,
    //             category,
    //             categoryColor,
    //         });
    //     }
    // };

    const resetCalculator = () => {
        setHeight('');
        setWeight('');
        setResult(null);
    };

    const isValidInput =
        height && weight && parseFloat(height) > 0 && parseFloat(weight) > 0;

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Formulir Data Anak</CardTitle>
                <CardDescription>
                    Hitung Z-Score untuk mengetahui kategori berat badan, tinggi
                    badan dan Indeks Massa Tubuh (IMT)
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form
                    action="/result"
                    method="post"
                    className="flex flex-col gap-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Anak</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Masukkan nama anak"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">
                            Panjang / Tinggi Badan (cm)
                        </Label>
                        <Input
                            id="height"
                            name="height"
                            type="number"
                            placeholder="Masukkan tinggi badan dalam sentimeter"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            min="1"
                            max="200"
                            step="0.1"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="weight">Berat Badan (kg)</Label>
                        <Input
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder="Masukkan berat badan dalam kilogram"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            min="1"
                            max="100"
                            step="0.1"
                        />
                    </div>

                    <div className="space-y-2">
                        <RadioGroup
                            defaultValue="toddler"
                            value={ageGroup}
                            onValueChange={(value) =>
                                setAgeGroup(value as 'toddler' | 'kid')
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="toddler" id="toddler" />
                                <Label htmlFor="toddler">
                                    Anak umur 0 - 60 bulan
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="kid" id="kid" />
                                <Label htmlFor="kid">
                                    Anak umur 5 tahun - 18 tahun
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {ageGroup === 'toddler' && (
                        <div className="space-y-2">
                            <Label htmlFor="age">Umur (bulan) 0 - 60</Label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="Masukkan umur dalam bulan"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                min="0"
                                max="60"
                            />
                        </div>
                    )}

                    {ageGroup === 'kid' && (
                        <div className="flex gap-2 space-y-2">
                            <div className="flex-1">
                                <Label htmlFor="year">
                                    Umur (tahun) 5 - 18
                                </Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    min="5"
                                    max="18"
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="month">
                                    Umur (bulan) 0 - 11
                                </Label>
                                <Input
                                    id="month"
                                    name="month"
                                    type="number"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    min="0"
                                    max="11"
                                />
                            </div>
                        </div>
                    )}

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
                                <SelectItem value="female">
                                    Perempuan
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={!isValidInput}
                            className="flex-1"
                        >
                            Cek Hasil
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetCalculator}
                            disabled={!height && !weight && !result}
                        >
                            Ulangi
                        </Button>
                    </div>

                    {result && (
                        <div className="mt-6 space-y-3 rounded-lg bg-muted p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {result.bmi}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    BMI
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <Badge variant={result.categoryColor}>
                                    {result.category}
                                </Badge>
                            </div>

                            <div className="space-y-1 text-xs text-muted-foreground">
                                <div className="font-medium">
                                    BMI Categories:
                                </div>
                                <div>• Underweight: Below 18.5</div>
                                <div>• Normal weight: 18.5 - 24.9</div>
                                <div>• Overweight: 25.0 - 29.9</div>
                                <div>• Obese: 30.0 and above</div>
                            </div>
                        </div>
                    )}
                </Form>
            </CardContent>
        </Card>
    );
}
