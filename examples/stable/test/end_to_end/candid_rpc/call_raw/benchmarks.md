# Benchmarks for call_raw

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | executeCallRaw | 1_635_309 | 6_635_309 | $0.0000090904 | $9.09 | <font color="red">+32_824</font> |
| 1 | executeCallRaw | 2_084_292 | 7_084_292 | $0.0000097055 | $9.70 | <font color="red">+36_666</font> |

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