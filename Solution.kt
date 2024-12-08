
class Solution {

    fun maxLength(ribbons: IntArray, targetNumberOfCuts: Int): Int {
        var maxPossibleCutSize = 0
        var minLimitCutSize = 1
        var maxLimitCutSize = roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts)

        while (minLimitCutSize <= maxLimitCutSize) {
            val cutSize = minLimitCutSize + (maxLimitCutSize - minLimitCutSize) / 2

            if (isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize)) {
                maxPossibleCutSize = cutSize
                minLimitCutSize = cutSize + 1
            } else {
                maxLimitCutSize = cutSize - 1
            }
        }

        return maxPossibleCutSize
    }

    private fun isPossibleToHaveTargetNumberOfCuts(ribbons: IntArray, targetNumberOfCuts: Int, cutSize: Int): Boolean {
        var numberOfCuts = 0
        for (ribbon in ribbons) {
            numberOfCuts += ribbon / cutSize
            if (numberOfCuts >= targetNumberOfCuts) {
                return true
            }
        }
        return false
    }

    private fun roundedDownMeanCutForSumOfAllRibbonSizes(ribbons: IntArray, targetNumberOfCuts: Int): Int {
        var sum: Long = 0
        for (ribbon in ribbons) {
            sum += ribbon
        }
        return (sum / targetNumberOfCuts).toInt()
    }
}
