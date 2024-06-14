export function getAllDiceCombinations(dices: number[]) {
    const toCombine = new Array(dices.length).fill("").map((_, i) => i);
    let combinations: number[][] = [];
    let temp: number[] = [];
    let slent = Math.pow(2, toCombine.length) - 1;

    for (let i = 0; i < slent / 2; i++) {
        temp = [];
        for (var j = 0; j < toCombine.length; j++) {
            if (i & Math.pow(2, j)) {
                temp.push(toCombine[j]);
            }
        }

        if (temp.length > 0) {
            combinations.push(temp);
        }
    }

    return combinations.map((combi) => {
        const completion = toCombine.filter((index) => combi.indexOf(index) === -1);
        const diceCombi = combi.map((e) => dices[e]);
        const diceCompletion = completion.map((e) => dices[e]);
        return [diceCombi, diceCompletion];
    })
}

export function transformStringsIntoNumbers(dices: Array<Array<String>>) {
    return [];
}

export function isCombinationValid(combination: Array<Array<number>>) {
    // Check if the sum of the two arrays are equal
    const sumArrayA = combination[0].reduce((a, b) => a + b, 0);
    const sumArrayB = combination[1].reduce((a, b) => a + b, 0);

    return sumArrayA === sumArrayB;
}

export function getSolution(dices: number[]) {
    const combinations = getAllDiceCombinations(dices);

    // Find the first valid combination
    for (let i = 0; i < combinations.length; i++) {
        if (isCombinationValid(combinations[i])) {
            return combinations[i];
        }
    }

    return null;
}