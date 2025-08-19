# Benchmarks for sqlite

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 4 | 12_412_965_357 | 12_417_965_357 | $0.0170126125 | $17_012.61 | <font color="red">+686_264_216</font> |
| 1 | 1 | 144_259_589 | 149_259_589 | $0.0002044856 | $204.48 | <font color="green">-7_179_807</font> |
| 2 | 1 | 68_005_161 | 73_005_161 | $0.0001000171 | $100.01 | <font color="green">-7_163_144</font> |
| 3 | 1 | 136_969_271 | 141_969_271 | $0.0001944979 | $194.49 | <font color="green">-7_196_233</font> |
| 4 | 1 | 76_117_137 | 81_117_137 | $0.0001111305 | $111.13 | <font color="green">-7_171_278</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | postUpgrade | 11_726_701_141 | 11_731_701_141 | $0.0160724306 | $16_072.43 |
| 1 | http_request_update | 151_439_396 | 156_439_396 | $0.0002143220 | $214.32 |
| 2 | http_request_update | 75_168_305 | 80_168_305 | $0.0001098306 | $109.83 |
| 3 | http_request_update | 144_165_504 | 149_165_504 | $0.0002043567 | $204.35 |
| 4 | http_request_update | 83_288_415 | 88_288_415 | $0.0001209551 | $120.95 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).