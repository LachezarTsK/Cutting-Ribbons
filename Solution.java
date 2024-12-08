
public class Solution {

    public int maxLength(int[] ribbons, int targetNumberOfCuts) {
        int maxPossibleCutSize = 0;
        int minLimitCutSize = 1;
        int maxLimitCutSize = roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts);

        while (minLimitCutSize <= maxLimitCutSize) {
            int cutSize = minLimitCutSize + (maxLimitCutSize - minLimitCutSize) / 2;

            if (isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize)) {
                maxPossibleCutSize = cutSize;
                minLimitCutSize = cutSize + 1;
            } else {
                maxLimitCutSize = cutSize - 1;
            }
        }

        return maxPossibleCutSize;
    }

    private boolean isPossibleToHaveTargetNumberOfCuts(int[] ribbons, int targetNumberOfCuts, int cutSize) {
        int numberOfCuts = 0;
        for (int ribbon : ribbons) {
            numberOfCuts += ribbon / cutSize;
            if (numberOfCuts >= targetNumberOfCuts) {
                return true;
            }
        }
        return false;
    }

    private int roundedDownMeanCutForSumOfAllRibbonSizes(int[] ribbons, int targetNumberOfCuts) {
        long sum = 0;
        for (int ribbon : ribbons) {
            sum += ribbon;
        }
        return (int) (sum / targetNumberOfCuts);
    }
}
