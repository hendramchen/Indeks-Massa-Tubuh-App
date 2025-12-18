import {
    type ZscoreCategory as ZscoreCategoryType,
    ZscoreData,
} from '@/types/zscore';
import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { zScoreCode } from './constant';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export const getComparedValue = (
    zScoreType: string,
    weight: number,
    height: number,
): number => {
    switch (zScoreType) {
        case 'BB':
            return weight;
        case 'PB':
            return height;
        case 'TB':
            return height;
        case 'BBPB':
            return weight;
        case 'BBTB':
            return weight;
        case 'IMT': {
            const heightInMeters = height / 100;
            return weight / (heightInMeters * heightInMeters);
        }
        case 'IMT5Plus': {
            const heightInMeters = height / 100;
            return weight / (heightInMeters * heightInMeters);
        }
    }
    return 0;
};

export const findNearest = (zscore: ZscoreData, wh: number): number => {
    if (!zscore) return 0;
    const scores = Object.values(zscore);
    const nearest: number = scores.reduce((prev, curr) => {
        return Math.abs(curr - wh) < Math.abs(prev - wh) ? curr : prev;
    });
    return nearest;
};

export const getZScoreCategory = (
    zScore: string,
    zScoreCategory: ZscoreCategoryType[],
) => {
    const category = zScoreCategory.find((item) =>
        item.zScore.includes(zScore),
    );
    return category?.category || 'Unknown';
};

export const getZscoreWithSign = (
    nearest: number,
    wh: number,
    zscoreData: ZscoreData,
) => {
    let zScoreWithSign = '';
    const index = Object.values(zscoreData).indexOf(nearest);

    const zScoreIndex = zScoreCode[index];
    if (Number(wh) < nearest) {
        zScoreWithSign = `<${zScoreIndex}`;
    } else if (Number(wh) > nearest) {
        zScoreWithSign = `>${zScoreIndex}`;
    } else {
        zScoreWithSign = zScoreIndex;
    }
    return zScoreWithSign;
};

export function formatDateToReadable(dateString: string) {
    // Split the date string into components
    const [year, month, day] = dateString.split('-').map(Number);

    // Create a date object (uses UTC to avoid timezone issues)
    const date = new Date(Date.UTC(year, month - 1, day));

    // Month names array
    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    // Get the day without leading zero, month name, and year
    const formattedDay = date.getUTCDate();
    const formattedMonth = monthNames[date.getUTCMonth()];
    const formattedYear = date.getUTCFullYear();

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
}
