# Benchmarks for express

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | 1           | 46_991_828   | 51_991_828 | $0.0000712288 | $71.22            | <font color="green">-7_487_995_113</font> |
| 1   | 1           | 40_535_296   | 45_535_296 | $0.0000623834 | $62.38            | <font color="green">-13_092_079</font>    |
| 2   | 1           | 37_715_328   | 42_715_328 | $0.0000585200 | $58.51            | <font color="green">-9_443_827</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_534_986_941 | 7_539_986_941 | $0.0103297821 | $10_329.78        |
| 1   | http_request_update | 53_627_375    | 58_627_375    | $0.0000803195 | $80.31            |
| 2   | http_request_update | 47_159_155    | 52_159_155    | $0.0000714580 | $71.45            |
| 3   | http_request_update | 44_190_864    | 49_190_864    | $0.0000673915 | $67.39            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
