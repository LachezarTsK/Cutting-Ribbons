
using System;

public class Solution
{
    public int MaxLength(int[] ribbons, int targetNumberOfCuts)
    {
        int maxPossibleCutSize = 0;
        int minLimitCutSize = 1;
        int maxLimitCutSize = RoundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts);

        while (minLimitCutSize <= maxLimitCutSize)
        {
            int cutSize = minLimitCutSize + (maxLimitCutSize - minLimitCutSize) / 2;

            if (IsPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize))
            {
                maxPossibleCutSize = cutSize;
                minLimitCutSize = cutSize + 1;
            }
            else
            {
                maxLimitCutSize = cutSize - 1;
            }
        }

        return maxPossibleCutSize;
    }

    private bool IsPossibleToHaveTargetNumberOfCuts(int[] ribbons, int targetNumberOfCuts, int cutSize)
    {
        int numberOfCuts = 0;
        foreach (int ribbon in ribbons)
        {
            numberOfCuts += ribbon / cutSize;
            if (numberOfCuts >= targetNumberOfCuts)
            {
                return true;
            }
        }
        return false;
    }

    private int RoundedDownMeanCutForSumOfAllRibbonSizes(int[] ribbons, int targetNumberOfCuts)
    {
        long sum = 0;
        foreach (int ribbon in ribbons)
        {
            sum += ribbon;
        }
        return (int)(sum / targetNumberOfCuts);
    }
}
