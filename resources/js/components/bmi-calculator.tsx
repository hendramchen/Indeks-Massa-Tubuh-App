import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BMIResult {
    bmi: number;
    category: string;
    categoryColor: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function BMICalculator() {
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [result, setResult] = useState<BMIResult | null>(null);

    const calculateBMI = () => {
        const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
        const weightInKg = parseFloat(weight);

        if (heightInMeters > 0 && weightInKg > 0) {
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            const roundedBMI = Math.round(bmi * 10) / 10;

            let category: string;
            let categoryColor: 'default' | 'secondary' | 'destructive' | 'outline';

            if (bmi < 18.5) {
                category = 'Underweight';
                categoryColor = 'outline';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
                categoryColor = 'secondary';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
                categoryColor = 'default';
            } else {
                category = 'Obese';
                categoryColor = 'destructive';
            }

            setResult({
                bmi: roundedBMI,
                category,
                categoryColor
            });
        }
    };

    const resetCalculator = () => {
        setHeight('');
        setWeight('');
        setResult(null);
    };

    const isValidInput = height && weight && parseFloat(height) > 0 && parseFloat(weight) > 0;

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>
                    Calculate your Body Mass Index to assess your weight category
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                        id="height"
                        type="number"
                        placeholder="Enter height in centimeters"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        min="1"
                        max="300"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                        id="weight"
                        type="number"
                        placeholder="Enter weight in kilograms"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        min="1"
                        max="1000"
                        step="0.1"
                    />
                </div>

                <div className="flex gap-2">
                    <Button 
                        onClick={calculateBMI} 
                        disabled={!isValidInput}
                        className="flex-1"
                    >
                        Calculate BMI
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={resetCalculator}
                        disabled={!height && !weight && !result}
                    >
                        Reset
                    </Button>
                </div>

                {result && (
                    <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                                {result.bmi}
                            </div>
                            <div className="text-sm text-muted-foreground">BMI</div>
                        </div>
                        
                        <div className="flex justify-center">
                            <Badge variant={result.categoryColor}>
                                {result.category}
                            </Badge>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                            <div className="font-medium">BMI Categories:</div>
                            <div>• Underweight: Below 18.5</div>
                            <div>• Normal weight: 18.5 - 24.9</div>
                            <div>• Overweight: 25.0 - 29.9</div>
                            <div>• Obese: 30.0 and above</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
