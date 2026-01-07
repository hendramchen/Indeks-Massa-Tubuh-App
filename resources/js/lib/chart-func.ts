import { ZscoreField } from '../types/child-info';

export default function getChartBB(
    age: number,
    weight: number,
    zscores: ZscoreField[],
) {
    const ageList: number[] = [];
    let ageInc = age - 3;
    let weightInc = weight - 15;

    // const normalList = [11.5, 12, 13, 14, 15, 15.5];
    const actualList = [null, 12, 12.5, 13.8, null];
    // const normals: number[] = [];

    for (let i = 0; i < 5; i++) {
        ageList.push(ageInc);
        ageInc = ageInc + 1;
    }

    const data = ageList.map((age, index) => {
        weightInc = weightInc + 5;
        return {
            age,
            weight: weightInc,
            median: zscores[index].median,
            plus2SD: zscores[index].plus2SD,
            plus3SD: zscores[index].plus3SD,
            min2SD: zscores[index].min2SD,
            min3SD: zscores[index].min3SD,
            actual: actualList[index],
        };
    });
    return data;
}
