# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBytes    | 2_008_804    | 1_393_521  | $0.0000018529 | $1.85             | <font color="green">-12_833</font> |
| 1   | getBytes    | 2_608_509    | 1_633_403  | $0.0000021719 | $2.17             | <font color="green">-8_152</font>  |
| 2   | getBytes    | 9_246_599    | 4_288_639  | $0.0000057025 | $5.70             | <font color="green">-9_024</font>  |
| 3   | getBytes    | 74_947_645   | 30_569_058 | $0.0000406468 | $40.64            | <font color="green">-1_500</font>  |
| 4   | getBytes    | 147_945_613  | 59_768_245 | $0.0000794720 | $79.47            | <font color="red">+3_673</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 2_021_637    | 1_398_654  | $0.0000018597 | $1.85             |
| 1   | getBytes    | 2_616_661    | 1_636_664  | $0.0000021762 | $2.17             |
| 2   | getBytes    | 9_255_623    | 4_292_249  | $0.0000057073 | $5.70             |
| 3   | getBytes    | 74_949_145   | 30_569_658 | $0.0000406476 | $40.64            |
| 4   | getBytes    | 147_941_940  | 59_766_776 | $0.0000794701 | $79.47            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
