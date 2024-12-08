
#include <span>
#include <vector>
using namespace std;

class Solution {

public:
    int maxLength(vector<int>& ribbons, int targetNumberOfCuts) const {
        int maxPossibleCutSize = 0;
        int minLimitCutSize = 1;
        int maxLimitCutSize = roundedDownMeanCutForSumOfAllRibbonSizes(ribbons, targetNumberOfCuts);

        while (minLimitCutSize <= maxLimitCutSize) {
            int cutSize = minLimitCutSize + (maxLimitCutSize - minLimitCutSize) / 2;

            if (isPossibleToHaveTargetNumberOfCuts(ribbons, targetNumberOfCuts, cutSize)) {
                maxPossibleCutSize = cutSize;
                minLimitCutSize = cutSize + 1;
            }
            else {
                maxLimitCutSize = cutSize - 1;
            }
        }

        return maxPossibleCutSize;
    }

private:
    bool isPossibleToHaveTargetNumberOfCuts(span<const int> ribbons, int targetNumberOfCuts, int cutSize) const {
        int numberOfCuts = 0;
        for (const auto& ribbon : ribbons) {
            numberOfCuts += ribbon / cutSize;
            if (numberOfCuts >= targetNumberOfCuts) {
                return true;
            }
        }
        return false;
    }

    int roundedDownMeanCutForSumOfAllRibbonSizes(span<const int> ribbons, int targetNumberOfCuts) const {
        long long sum = 0;
        for (const auto& ribbon : ribbons) {
            sum += ribbon;
        }
        return sum / targetNumberOfCuts;
    }
};
