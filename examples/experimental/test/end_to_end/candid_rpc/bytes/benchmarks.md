# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBytes    | 1_963_381    | 1_375_352  | $0.0000018288 | $1.82             | <font color="green">-10_564</font> |
| 1   | getBytes    | 2_649_130    | 1_649_652  | $0.0000021935 | $2.19             | <font color="red">+3_664</font>    |
| 2   | getBytes    | 9_732_413    | 4_482_965  | $0.0000059609 | $5.96             | <font color="red">+997</font>      |
| 3   | getBytes    | 79_931_561   | 32_562_624 | $0.0000432975 | $43.29            | <font color="red">+350</font>      |
| 4   | getBytes    | 157_925_151  | 63_760_060 | $0.0000847798 | $84.77            | <font color="red">+256</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_973_945    | 1_379_578  | $0.0000018344 | $1.83             |
| 1   | getBytes    | 2_645_466    | 1_648_186  | $0.0000021915 | $2.19             |
| 2   | getBytes    | 9_731_416    | 4_482_566  | $0.0000059603 | $5.96             |
| 3   | getBytes    | 79_931_211   | 32_562_484 | $0.0000432974 | $43.29            |
| 4   | getBytes    | 157_924_895  | 63_759_958 | $0.0000847797 | $84.77            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
