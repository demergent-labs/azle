# Benchmarks for call_raw

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCallRaw | 1_575_646 | 6_575_646 | $0.0000090086 | $9.00 | <font color="green">-26_839</font> |
| 1 | executeCallRaw | 2_018_724 | 7_018_724 | $0.0000096157 | $9.61 | <font color="green">-28_902</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | executeCallRaw | 1_602_485 | 6_602_485 | $0.0000090454 | $9.04 |
| 1 | executeCallRaw | 2_047_626 | 7_047_626 | $0.0000096552 | $9.65 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).