# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 8_636_407    | 4_044_562 | $0.0000053779 | $5.37             |
| 1   | getUtxos                 | 10_702_455   | 4_870_982 | $0.0000064768 | $6.47             |
| 2   | getCurrentFeePercentiles | 5_152_425    | 2_650_970 | $0.0000035249 | $3.52             |
| 3   | sendTransaction          | 6_739_138    | 3_285_655 | $0.0000043688 | $4.36             |
| 4   | getCurrentFeePercentiles | 5_143_209    | 2_647_283 | $0.0000035200 | $3.52             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
