# Benchmarks for randomness

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade  | 4_820_929_915 | 3_528_961_966 | $0.0046923549 | $4_692.35         | <font color="green">-642_832_324</font> |
| 1   | randomNumber | 1_045_435     | 1_008_174     | $0.0000013405 | $1.34             | <font color="red">+5_834</font>         |
| 2   | randomNumber | 1_030_277     | 1_002_110     | $0.0000013325 | $1.33             | <font color="red">+3_327</font>         |
| 3   | randomNumber | 1_031_507     | 1_002_602     | $0.0000013331 | $1.33             | <font color="red">+5_867</font>         |
| 4   | randomNumber | 1_030_277     | 1_002_110     | $0.0000013325 | $1.33             | <font color="red">+4_635</font>         |
| 5   | randomNumber | 1_031_068     | 1_002_427     | $0.0000013329 | $1.33             | <font color="red">+5_812</font>         |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 5_463_762_239 | 4_186_094_895 | $0.0055661248 | $5_566.12         |
| 1   | randomNumber | 1_039_601     | 1_005_840     | $0.0000013374 | $1.33             |
| 2   | randomNumber | 1_026_950     | 1_000_780     | $0.0000013307 | $1.33             |
| 3   | randomNumber | 1_025_640     | 1_000_256     | $0.0000013300 | $1.33             |
| 4   | randomNumber | 1_025_642     | 1_000_256     | $0.0000013300 | $1.33             |
| 5   | randomNumber | 1_025_256     | 1_000_102     | $0.0000013298 | $1.32             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
