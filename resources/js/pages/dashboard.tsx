import { BMICalculator } from '@/components/bmi-calculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const weightByAge = [
    [2.1, 2.5, 2.9, 3.3, 3.9, 4.4, 5.0],
    [2.9, 3.4, 3.9, 4.5, 5.1, 5.8, 6.6],
    [3.8, 4.3, 4.9, 5.6, 6.3, 7.1, 8.0],
    [4.4, 5.0, 5.7, 6.4, 7.2, 8.0, 9.0],
];

const zScore = ['-3SD', '-2SD', '-1SD', 'Median', '+1SD', '+2SD', '+3SD'];
// const category = [
//     'Severely Underweight',
//     'Underweight',
//     'Normal',
//     'Risk of Obesity',
// ];
const zScoreCategory = [
    {
        zScore: ['<-3SD'],
        category: 'Severely Underweight',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Underweight',
    },
    {
        zScore: [
            '-2SD',
            '>-2SD',
            '<-1SD',
            '-1SD',
            '>-1SD',
            '<Median',
            'Median',
            '>Median',
            '<+1SD',
            '+1SD',
        ],
        category: 'Normal',
    },
    {
        zScore: ['>+1SD', '<+2SD', '+2SD', '>+2SD', '<+3SD', '+3SD'],
        category: 'Risk of Obesity',
    },
];

export default function Dashboard() {
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const getZScoreCategory = (zScore: string) => {
        const category = zScoreCategory.find((item) =>
            item.zScore.includes(zScore),
        );
        return category?.category || 'Unknown';
    };

    const getResult = () => {
        const weightList = weightByAge[Number(age)];
        const nearest = weightList.reduce((prev, curr) => {
            return Math.abs(curr - Number(weight)) <
                Math.abs(prev - Number(weight))
                ? curr
                : prev;
        });
        const zScoreIndex = zScore[weightList.indexOf(nearest)];
        console.log(nearest);
        let zScoreWithSign = '';
        if (Number(weight) < nearest) {
            zScoreWithSign = `<${zScoreIndex}`;
        } else if (Number(weight) > nearest) {
            zScoreWithSign = `>${zScoreIndex}`;
        } else {
            zScoreWithSign = zScoreIndex;
        }
        setResult(zScoreWithSign);
        setCategory(getZScoreCategory(zScoreWithSign));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:mx-auto md:w-5xl">
                <div className="flex flex-1 items-center justify-center p-8">
                    <BMICalculator />
                </div>
                <h1>BB/U</h1>
                <div className="flex flex-1 items-center justify-center p-8">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="1"
                            max="100"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="Enter weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            min="1"
                            max="100"
                        />
                    </div>
                    <Button onClick={getResult}>Calculate</Button>
                </div>
                <div className="">
                    <p>Result: {result}</p>
                    <p>Category: {category}</p>
                </div>
            </div>
        </AppLayout>
    );
}
