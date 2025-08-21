# Benchmarks for ic_api

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | dataCertificateNull | 1_684_973 | 6_684_973 | $0.0000091584 | $9.15 | <font color="green">-70_446</font> |
| 1 | certifiedDataSet | 1_222_752 | 6_222_752 | $0.0000085252 | $8.52 | <font color="green">-18_673</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | dataCertificateNull | 1_755_419 | 6_755_419 | $0.0000092549 | $9.25 |
| 1 | certifiedDataSet | 1_241_425 | 6_241_425 | $0.0000085508 | $8.55 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).