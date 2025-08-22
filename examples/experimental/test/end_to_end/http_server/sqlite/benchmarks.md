# Benchmarks for sqlite

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 4 | 12_397_919_726 | 12_402_919_726 | $0.0169920000 | $16_992.00 | <font color="red">+671_218_585</font> |
| 1 | 1 | 144_219_168 | 149_219_168 | $0.0002044303 | $204.43 | <font color="green">-7_220_228</font> |
| 2 | 1 | 67_994_839 | 72_994_839 | $0.0001000029 | $100.00 | <font color="green">-7_173_466</font> |
| 3 | 1 | 137_045_252 | 142_045_252 | $0.0001946020 | $194.60 | <font color="green">-7_120_252</font> |
| 4 | 1 | 76_138_269 | 81_138_269 | $0.0001111594 | $111.15 | <font color="green">-7_150_146</font> |

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