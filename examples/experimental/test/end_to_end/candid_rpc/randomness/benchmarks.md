# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade  | 5_473_712_054 | 4_190_074_821 | $0.0055714168 | $5_571.41         | <font color="green">-401_848_690</font> |
| 1   | randomNumber | 1_037_017     | 1_004_806     | $0.0000013361 | $1.33             | <font color="green">-123</font>         |
| 2   | randomNumber | 1_025_437     | 1_000_174     | $0.0000013299 | $1.32             | <font color="red">+2_841</font>         |
| 3   | randomNumber | 1_024_615     | 999_846       | $0.0000013295 | $1.32             | <font color="red">+2_631</font>         |
| 4   | randomNumber | 1_025_784     | 1_000_313     | $0.0000013301 | $1.33             | <font color="red">+5_153</font>         |
| 5   | randomNumber | 1_022_835     | 999_134       | $0.0000013285 | $1.32             | <font color="green">-278</font>         |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 5_875_560_744 | 4_350_814_297 | $0.0057851472 | $5_785.14         |
| 1   | randomNumber | 1_037_140     | 1_004_856     | $0.0000013361 | $1.33             |
| 2   | randomNumber | 1_022_596     | 999_038       | $0.0000013284 | $1.32             |
| 3   | randomNumber | 1_021_984     | 998_793       | $0.0000013281 | $1.32             |
| 4   | randomNumber | 1_020_631     | 998_252       | $0.0000013273 | $1.32             |
| 5   | randomNumber | 1_023_113     | 999_245       | $0.0000013287 | $1.32             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
