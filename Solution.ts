
function maxLength(ribbons: number[], targetNumberOfCuts: number): number {
    let maxPossibleCutSize = 0;
    let minLimitCutSize = 1;
    let maxLimitCutSize = roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts);

    while (minLimitCutSize <= maxLimitCutSize) {
        const cutSize = minLimitCutSize + Math.floor((maxLimitCutSize - minLimitCutSize) / 2);

        if (isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize)) {
            maxPossibleCutSize = cutSize;
            minLimitCutSize = cutSize + 1;
        } else {
            maxLimitCutSize = cutSize - 1;
        }
    }

    return maxPossibleCutSize;
};

function isPossibleToHaveTargetNumberOfCuts(ribbons: number[], targetNumberOfCuts: number, cutSize: number): boolean {
    let numberOfCuts = 0;
    for (let ribbon of ribbons) {
        numberOfCuts += Math.floor(ribbon / cutSize);
        if (numberOfCuts >= targetNumberOfCuts) {
            return true;
        }
    }
    return false;
}

function roundedDownMeanCutForSumOfAllRibbonSizes(ribbons: number[], targetNumberOfCuts: number): number {
    let sum = 0;
    for (let ribbon of ribbons) {
        sum += ribbon;
    }
    return Math.floor(sum / targetNumberOfCuts);
}
