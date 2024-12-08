
package main

import "fmt"

func maxLength(ribbons []int, targetNumberOfCuts int) int {
    maxPossibleCutSize := 0
    minLimitCutSize := 1
    maxLimitCutSize := roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts)

    for minLimitCutSize <= maxLimitCutSize {
        cutSize := minLimitCutSize + (maxLimitCutSize-minLimitCutSize)/2

        if isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize) {
            maxPossibleCutSize = cutSize
            minLimitCutSize = cutSize + 1
        } else {
            maxLimitCutSize = cutSize - 1
        }
    }

    return maxPossibleCutSize
}

func isPossibleToHaveTargetNumberOfCuts(ribbons []int, targetNumberOfCuts int, cutSize int) bool {
    var numberOfCuts = 0
    for _, ribbon := range ribbons {
        numberOfCuts += ribbon / cutSize
        if numberOfCuts >= targetNumberOfCuts {
            return true
        }
    }
    return false
}

func roundedDownMeanCutForSumOfAllRibbonSizes(ribbons []int, targetNumberOfCuts int) int {
    var sum int64 = 0
    for _, ribbon := range ribbons {
        sum += int64(ribbon)
    }
    return int(sum / int64(targetNumberOfCuts))
}
