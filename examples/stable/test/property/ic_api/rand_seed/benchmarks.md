# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name           | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | cryptoGetRandomValues | 1_771_666    | 1_298_666 | $0.0000017268 | $1.72             |
| 1   | cryptoGetRandomValues | 1_703_751    | 1_271_500 | $0.0000016907 | $1.69             |
| 2   | cryptoGetRandomValues | 1_714_826    | 1_275_930 | $0.0000016966 | $1.69             |
| 3   | cryptoGetRandomValues | 1_701_023    | 1_270_409 | $0.0000016892 | $1.68             |
| 4   | seed                  | 1_243_519    | 1_087_407 | $0.0000014459 | $1.44             |
| 5   | cryptoGetRandomValues | 1_713_543    | 1_275_417 | $0.0000016959 | $1.69             |
| 6   | cryptoGetRandomValues | 1_703_231    | 1_271_292 | $0.0000016904 | $1.69             |
| 7   | seed                  | 1_240_835    | 1_086_334 | $0.0000014445 | $1.44             |
| 8   | cryptoGetRandomValues | 1_715_402    | 1_276_160 | $0.0000016969 | $1.69             |
| 9   | cryptoGetRandomValues | 1_704_915    | 1_271_966 | $0.0000016913 | $1.69             |
| 10  | seed                  | 1_240_957    | 1_086_382 | $0.0000014445 | $1.44             |
| 11  | cryptoGetRandomValues | 1_713_115    | 1_275_246 | $0.0000016957 | $1.69             |
| 12  | cryptoGetRandomValues | 1_700_739    | 1_270_295 | $0.0000016891 | $1.68             |
| 13  | cryptoGetRandomValues | 1_698_881    | 1_269_552 | $0.0000016881 | $1.68             |
| 14  | cryptoGetRandomValues | 1_698_251    | 1_269_300 | $0.0000016878 | $1.68             |
| 15  | cryptoGetRandomValues | 1_713_824    | 1_275_529 | $0.0000016960 | $1.69             |
| 16  | cryptoGetRandomValues | 1_700_953    | 1_270_381 | $0.0000016892 | $1.68             |
| 17  | cryptoGetRandomValues | 1_699_943    | 1_269_977 | $0.0000016887 | $1.68             |
| 18  | seed                  | 1_244_860    | 1_087_944 | $0.0000014466 | $1.44             |
| 19  | cryptoGetRandomValues | 1_714_480    | 1_275_792 | $0.0000016964 | $1.69             |
| 20  | cryptoGetRandomValues | 1_701_930    | 1_270_772 | $0.0000016897 | $1.68             |
| 21  | cryptoGetRandomValues | 1_698_782    | 1_269_512 | $0.0000016880 | $1.68             |
| 22  | cryptoGetRandomValues | 1_701_535    | 1_270_614 | $0.0000016895 | $1.68             |
| 23  | cryptoGetRandomValues | 1_713_006    | 1_275_202 | $0.0000016956 | $1.69             |
| 24  | cryptoGetRandomValues | 1_701_913    | 1_270_765 | $0.0000016897 | $1.68             |
| 25  | cryptoGetRandomValues | 1_700_172    | 1_270_068 | $0.0000016888 | $1.68             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
