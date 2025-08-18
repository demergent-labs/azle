# Benchmarks for backend

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 50_034_351 | 55_034_351 | $0.0000753971 | $75.39 | <font color="green">-7_694_223_969</font> |
| 1 | 1 | 43_634_250 | 48_634_250 | $0.0000666289 | $66.62 | <font color="green">-13_492_231</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 7_744_258_320 | 7_749_258_320 | $0.0106164839 | $10_616.48 |
| 1 | http_request_update | 57_126_481 | 62_126_481 | $0.0000851133 | $85.11 |
| 2 | http_request_update | 50_719_924 | 55_719_924 | $0.0000763363 | $76.33 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).