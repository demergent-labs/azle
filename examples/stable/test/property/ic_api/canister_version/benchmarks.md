# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | postUpgrade | 1_014_931_993 | 1_019_931_993 | $0.0013973068 | $1_397.30 | <font color="red">+13_443_527</font> |
| 1 | setInspectMessageCanisterVersion | 937_709 | 5_937_709 | $0.0000081347 | $8.13 | <font color="green">-24_637</font> |
| 2 | getUpdateCanisterVersion | 1_539_408 | 6_539_408 | $0.0000089590 | $8.95 | <font color="green">-40_794</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 1_001_488_466 | 1_006_488_466 | $0.0013788892 | $1_378.88 |
| 1 | setInspectMessageCanisterVersion | 962_346 | 5_962_346 | $0.0000081684 | $8.16 |
| 2 | getUpdateCanisterVersion | 1_580_202 | 6_580_202 | $0.0000090149 | $9.01 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).