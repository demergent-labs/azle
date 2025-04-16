# Benchmarks for randomness

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade  | 4_860_566_170 | 3_544_816_468 | $0.0047134361 | $4_713.43         | <font color="red">+36_592_166</font> |
| 1   | randomNumber | 1_040_351     | 1_006_140     | $0.0000013378 | $1.33             | <font color="green">-1_590</font>    |
| 2   | randomNumber | 1_027_782     | 1_001_112     | $0.0000013311 | $1.33             | <font color="green">-528</font>      |
| 3   | randomNumber | 1_027_782     | 1_001_112     | $0.0000013311 | $1.33             | <font color="green">-366</font>      |
| 4   | randomNumber | 1_027_782     | 1_001_112     | $0.0000013311 | $1.33             | <font color="green">-366</font>      |
| 5   | randomNumber | 1_027_782     | 1_001_112     | $0.0000013311 | $1.33             | <font color="green">-88</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 4_823_974_004 | 3_530_179_601 | $0.0046939739 | $4_693.97         |
| 1   | randomNumber | 1_041_941     | 1_006_776     | $0.0000013387 | $1.33             |
| 2   | randomNumber | 1_028_310     | 1_001_324     | $0.0000013314 | $1.33             |
| 3   | randomNumber | 1_028_148     | 1_001_259     | $0.0000013313 | $1.33             |
| 4   | randomNumber | 1_028_148     | 1_001_259     | $0.0000013313 | $1.33             |
| 5   | randomNumber | 1_027_870     | 1_001_148     | $0.0000013312 | $1.33             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
