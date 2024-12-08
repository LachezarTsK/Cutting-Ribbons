
/**
 * @param {number[]} ribbons
 * @param {number} targetNumberOfCuts
 * @return {number}
 */
var maxLength = function (ribbons, targetNumberOfCuts) {
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


/**
 * @param {number[]} ribbons
 * @param {number} targetNumberOfCuts
 * @param {number} cutSize
 * @return {boolean}
 */
function isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize) {
    let numberOfCuts = 0;
    for (let ribbon of ribbons) {
        numberOfCuts += Math.floor(ribbon / cutSize);
        if (numberOfCuts >= targetNumberOfCuts) {
            return true;
        }
    }
    return false;
}

/**
 * @param {number[]} ribbons
 * @param {number} targetNumberOfCuts
 * @return {number}
 */
function roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts) {
    let sum = 0;
    for (let ribbon of ribbons) {
        sum += ribbon;
    }
    return Math.floor(sum / targetNumberOfCuts);
}
