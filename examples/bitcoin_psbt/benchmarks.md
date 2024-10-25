# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 13_928_154_984 | 10_771_851_993 | $0.0143230084 | $14_323.00        |
| 1   | http_request_update | 164_249_652    | 66_289_860     | $0.0000881436 | $88.14            |
| 2   | http_request_update | 164_240_485    | 66_286_194     | $0.0000881388 | $88.13            |
| 3   | http_request_update | 164_899_683    | 66_549_873     | $0.0000884894 | $88.48            |
| 4   | http_request_update | 164_399_475    | 66_349_790     | $0.0000882233 | $88.22            |
| 5   | http_request_update | 164_240_515    | 66_286_206     | $0.0000881388 | $88.13            |
| 6   | http_request_update | 165_154_608    | 66_651_843     | $0.0000886250 | $88.62            |
| 7   | http_request_update | 164_345_817    | 66_328_326     | $0.0000881948 | $88.19            |
| 8   | http_request_update | 167_233_455    | 67_483_382     | $0.0000897306 | $89.73            |
| 9   | http_request_update | 163_038_746    | 65_805_498     | $0.0000874996 | $87.49            |
| 10  | http_request_update | 164_878_433    | 66_541_373     | $0.0000884781 | $88.47            |
| 11  | http_request_update | 172_289_033    | 69_505_613     | $0.0000924195 | $92.41            |
| 12  | http_request_update | 164_743_070    | 66_487_228     | $0.0000884061 | $88.40            |
| 13  | http_request_update | 164_484_803    | 66_383_921     | $0.0000882687 | $88.26            |
| 14  | http_request_update | 165_214_732    | 66_675_892     | $0.0000886569 | $88.65            |
| 15  | http_request_update | 163_124_407    | 65_839_762     | $0.0000875452 | $87.54            |
| 16  | http_request_update | 165_501_261    | 66_790_504     | $0.0000888093 | $88.80            |
| 17  | http_request_update | 164_690_705    | 66_466_282     | $0.0000883782 | $88.37            |
| 18  | http_request_update | 164_391_846    | 66_346_738     | $0.0000882193 | $88.21            |
| 19  | http_request_update | 165_104_781    | 66_631_912     | $0.0000885985 | $88.59            |
| 20  | http_request_update | 162_968_031    | 65_777_212     | $0.0000874620 | $87.46            |
| 21  | http_request_update | 163_114_108    | 65_835_643     | $0.0000875397 | $87.53            |

## Baseline benchmarks Azle version: 0.24.2-rc.61

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
