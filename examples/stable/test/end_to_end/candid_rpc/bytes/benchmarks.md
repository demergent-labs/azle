# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | getBytes    | 2_012_202    | 1_394_880  | $0.0000018547 | $1.85             | <font color="green">-6_767</font> |
| 1   | getBytes    | 2_607_143    | 1_632_857  | $0.0000021712 | $2.17             | <font color="green">-1_485</font> |
| 2   | getBytes    | 9_253_456    | 4_291_382  | $0.0000057061 | $5.70             | <font color="red">+2_843</font>   |
| 3   | getBytes    | 74_945_429   | 30_568_171 | $0.0000406456 | $40.64            | <font color="green">-2_355</font> |
| 4   | getBytes    | 147_942_969  | 59_767_187 | $0.0000794706 | $79.47            | <font color="red">+1_736</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 2_018_969    | 1_397_587  | $0.0000018583 | $1.85             |
| 1   | getBytes    | 2_608_628    | 1_633_451  | $0.0000021720 | $2.17             |
| 2   | getBytes    | 9_250_613    | 4_290_245  | $0.0000057046 | $5.70             |
| 3   | getBytes    | 74_947_784   | 30_569_113 | $0.0000406468 | $40.64            |
| 4   | getBytes    | 147_941_233  | 59_766_493 | $0.0000794697 | $79.46            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
