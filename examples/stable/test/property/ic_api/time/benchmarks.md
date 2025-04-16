# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | updateTime  | 1_678_925    | 1_261_570 | $0.0000016775 | $1.67             | <font color="green">-9_599</font> |
| 1   | updateTime  | 1_637_047    | 1_244_818 | $0.0000016552 | $1.65             | <font color="red">+212</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateTime  | 1_688_524    | 1_265_409 | $0.0000016826 | $1.68             |
| 1   | updateTime  | 1_636_835    | 1_244_734 | $0.0000016551 | $1.65             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
