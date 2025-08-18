# Benchmarks for calc

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | add | 1_323_766 | 6_323_766 | $0.0000086636 | $8.66 | <font color="green">-35_822</font> |
| 1 | sub | 1_278_590 | 6_278_590 | $0.0000086017 | $8.60 | <font color="green">-38_396</font> |
| 2 | mul | 1_282_940 | 6_282_940 | $0.0000086076 | $8.60 | <font color="green">-35_345</font> |
| 3 | div | 1_600_632 | 6_600_632 | $0.0000090429 | $9.04 | <font color="green">-64_579</font> |
| 4 | clearall | 928_378 | 5_928_378 | $0.0000081219 | $8.12 | <font color="green">-16_848</font> |
| 5 | add | 1_275_443 | 6_275_443 | $0.0000085974 | $8.59 | <font color="green">-38_170</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | add | 1_359_588 | 6_359_588 | $0.0000087126 | $8.71 |
| 1 | sub | 1_316_986 | 6_316_986 | $0.0000086543 | $8.65 |
| 2 | mul | 1_318_285 | 6_318_285 | $0.0000086561 | $8.65 |
| 3 | div | 1_665_211 | 6_665_211 | $0.0000091313 | $9.13 |
| 4 | clearall | 945_226 | 5_945_226 | $0.0000081450 | $8.14 |
| 5 | add | 1_313_613 | 6_313_613 | $0.0000086496 | $8.64 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).