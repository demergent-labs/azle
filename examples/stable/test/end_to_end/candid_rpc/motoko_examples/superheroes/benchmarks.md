# Benchmarks for superheroes

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | create | 3_707_216 | 8_707_216 | $0.0000119289 | $11.92 | <font color="green">-43_071</font> |
| 1 | create | 4_842_559 | 9_842_559 | $0.0000134843 | $13.48 | <font color="red">+15_939</font> |
| 2 | update | 5_208_900 | 10_208_900 | $0.0000139862 | $13.98 | <font color="red">+35_336</font> |
| 3 | update | 3_569_048 | 8_569_048 | $0.0000117396 | $11.73 | <font color="green">-41_006</font> |
| 4 | deleteHero | 1_257_161 | 6_257_161 | $0.0000085723 | $8.57 | <font color="green">-24_882</font> |
| 5 | deleteHero | 1_242_501 | 6_242_501 | $0.0000085522 | $8.55 | <font color="green">-27_160</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | create | 3_750_287 | 8_750_287 | $0.0000119879 | $11.98 |
| 1 | create | 4_826_620 | 9_826_620 | $0.0000134625 | $13.46 |
| 2 | update | 5_173_564 | 10_173_564 | $0.0000139378 | $13.93 |
| 3 | update | 3_610_054 | 8_610_054 | $0.0000117958 | $11.79 |
| 4 | deleteHero | 1_282_043 | 6_282_043 | $0.0000086064 | $8.60 |
| 5 | deleteHero | 1_269_661 | 6_269_661 | $0.0000085894 | $8.58 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).