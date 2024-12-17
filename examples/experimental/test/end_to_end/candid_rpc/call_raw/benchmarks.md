# Benchmarks for call_raw

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | executeCallRaw | 1_459_645    | 1_173_858 | $0.0000015608 | $1.56             | <font color="green">-3_051</font> |
| 1   | executeCallRaw | 1_974_692    | 1_379_876 | $0.0000018348 | $1.83             | <font color="red">+8_324</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | executeCallRaw | 1_462_696    | 1_175_078 | $0.0000015625 | $1.56             |
| 1   | executeCallRaw | 1_966_368    | 1_376_547 | $0.0000018304 | $1.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
