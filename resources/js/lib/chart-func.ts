export default function getChartBB(age: number, weight: number) {
    const ageList = [];
    let ageInc = age;
    let ageDec = age;
    for (let i = 0; i <= 2; i++) {
        ageInc = ageInc + 2;
        ageList.push(ageInc);
    }
    for (let i = 0; i <= 2; i++) {
        ageDec = ageDec - 2;
        ageList.push(ageDec);
    }
    const weightList: number[] = [];
    let weightInc = weight;
    let weightDec = weight;
    for (let i = 0; i <= 2; i++) {
        weightInc = weightInc + 2;
        weightList.push(weightInc);
    }
    for (let i = 0; i <= 2; i++) {
        weightDec = weightDec - 2;
        weightList.push(weightDec);
    }

    ageList.sort((a, b) => a - b);
    weightList.sort((a, b) => a - b);

    const data = ageList.map((age, index) => {
        return {
            age,
            weight: weightList[index],
        };
    });
    return data;
}
