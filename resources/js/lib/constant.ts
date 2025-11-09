import type { ZscoreCategory } from '@/types/zscore';

export const zScoreCode = [
    '-3SD',
    '-2SD',
    '-1SD',
    'Median',
    '+1SD',
    '+2SD',
    '+3SD',
];
export const zScoreBBCategory: ZscoreCategory[] = [
    {
        zScore: ['<-3SD'],
        category: 'Berat badan sangat kurang (severely underweight)',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Berat badan kurang (underweight)',
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
        category: 'Risiko Berat badan lebih',
    },
];

export const zScorePTBCategory: ZscoreCategory[] = [
    {
        zScore: ['<-3SD'],
        category: 'Sangat pendek (severely stunted)',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Pendek (stunted)',
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
            '>+1SD',
            '<+2SD',
            '+2SD',
            '>+2SD',
            '<+3SD',
            '+3SD',
        ],
        category: 'Normal',
    },
    {
        zScore: ['>+3SD'],
        category: 'Tinggi',
    },
];

export const zScoreBBPBCategory: ZscoreCategory[] = [
    {
        zScore: ['<-3SD'],
        category: 'Gizi buruk (severely wasted)',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Gizi kurang (wasted)',
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
        category: 'Gizi baik (normal)',
    },
    {
        zScore: ['>+1SD', '<+2SD', '+2SD'],
        category: 'Berisiko gizi lebih (possible risk of overweight)',
    },
    {
        zScore: ['>+2SD', '<+3SD', '+3SD'],
        category: 'Gizi lebih (overweight) ',
    },
    {
        zScore: ['>+3SD'],
        category: 'Obesitas (obese) ',
    },
];
export const zScoreIMTCategory: ZscoreCategory[] = [
    {
        zScore: ['<-3SD'],
        category: 'Gizi buruk (severely wasted)',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Gizi kurang (wasted)',
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
        category: 'Gizi baik (normal)',
    },
    {
        zScore: ['>+1SD', '<+2SD', '+2SD'],
        category: 'Berisiko gizi lebih (possible risk of overweight)',
    },
    {
        zScore: ['>+2SD', '<+3SD', '+3SD'],
        category: 'Gizi lebih (overweight) ',
    },
    {
        zScore: ['>+3SD'],
        category: 'Obesitas (obese) ',
    },
];

export const zScoreIMT5PlusCategory: ZscoreCategory[] = [
    {
        zScore: ['<-3SD'],
        category: 'Gizi buruk (severely thinness)',
    },
    {
        zScore: ['-3SD', '>-3SD', '<-2SD'],
        category: 'Gizi kurang (thinness)',
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
        category: 'Gizi baik (normal) ',
    },
    {
        zScore: ['>+1SD', '<+2SD', '+2SD'],
        category: 'Gizi lebih (overweight) ',
    },
    {
        zScore: ['>+2SD', '<+3SD', '+3SD'],
        category: 'Obesitas (obese) ',
    },
];

export const genderOptions = {
    male: 'Laki-laki',
    female: 'Perempuan',
};
