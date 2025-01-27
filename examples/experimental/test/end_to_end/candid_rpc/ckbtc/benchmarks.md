# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init              | 5_570_898_274 | 4_228_949_309 | $0.0056231070 | $5_623.10         |
| 1   | getBalance        | 81_098_382    | 33_029_352    | $0.0000439181 | $43.91            |
| 2   | getBalance        | 81_044_631    | 33_007_852    | $0.0000438896 | $43.88            |
| 3   | getDepositAddress | 104_796_667   | 42_508_666    | $0.0000565225 | $56.52            |
| 4   | getDepositAddress | 104_840_702   | 42_526_280    | $0.0000565459 | $56.54            |
| 5   | updateBalance     | 104_785_624   | 42_504_249    | $0.0000565166 | $56.51            |
| 6   | updateBalance     | 104_658_660   | 42_453_464    | $0.0000564491 | $56.44            |
| 7   | getBalance        | 81_142_624    | 33_047_049    | $0.0000439417 | $43.94            |
| 8   | getBalance        | 81_178_604    | 33_061_441    | $0.0000439608 | $43.96            |
| 9   | transfer          | 89_435_125    | 36_364_050    | $0.0000483522 | $48.35            |
| 10  | getBalance        | 81_101_510    | 33_030_604    | $0.0000439198 | $43.91            |
| 11  | getBalance        | 81_147_961    | 33_049_184    | $0.0000439445 | $43.94            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
