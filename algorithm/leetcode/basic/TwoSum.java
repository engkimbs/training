import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] twoSum(int[] nums, int target) {
        int[] ret = new int[2];
        Map<Integer, Integer> cache = new HashMap<>();

        for(int i=0; i<nums.length; ++i) {
            int diff = target - nums[i];
            if(cache.containsKey(diff)) {
                ret[0] = i;
                ret[1] = cache.get(diff);
                if(ret[0] > ret[1]) {
                    int temp = ret[0];
                    ret[0] = ret[1];
                    ret[1] = temp;
                }
                return ret;
            }
            else
                cache.put(nums[i], i);
        }

        return ret;
    }
}