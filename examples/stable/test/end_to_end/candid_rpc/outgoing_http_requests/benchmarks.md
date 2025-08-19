# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | xkcd | 24_056_170 | 29_056_170 | $0.0000398070 | $39.80 | <font color="green">-1_095_794</font> |
| 1 | xkcdRaw | 1_125_766 | 6_125_766 | $0.0000083923 | $8.39 | <font color="green">-46_169</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | xkcd | 25_151_964 | 30_151_964 | $0.0000413082 | $41.30 |
| 1 | xkcdRaw | 1_171_935 | 6_171_935 | $0.0000084556 | $8.45 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).