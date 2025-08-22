# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | init | 1_123_929_051 | 1_128_929_051 | $0.0015466328 | $1_546.63 | <font color="red">+9_486_608</font> |
| 1 | ethGetBalance | 27_559_883 | 32_559_883 | $0.0000446070 | $44.60 | <font color="green">-1_150_474</font> |
| 2 | ethGetBalance | 27_445_966 | 32_445_966 | $0.0000444510 | $44.45 | <font color="green">-1_213_642</font> |
| 3 | ethGetBalance | 27_458_868 | 32_458_868 | $0.0000444686 | $44.46 | <font color="green">-1_205_218</font> |
| 4 | ethGetBlockByNumber | 26_278_281 | 31_278_281 | $0.0000428512 | $42.85 | <font color="green">-1_157_397</font> |
| 5 | ethGetBlockByNumber | 26_279_628 | 31_279_628 | $0.0000428531 | $42.85 | <font color="green">-1_154_735</font> |
| 6 | ethGetBlockByNumber | 26_299_639 | 31_299_639 | $0.0000428805 | $42.88 | <font color="green">-1_125_659</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 1_114_442_443 | 1_119_442_443 | $0.0015336361 | $1_533.63 |
| 1 | ethGetBalance | 28_710_357 | 33_710_357 | $0.0000461832 | $46.18 |
| 2 | ethGetBalance | 28_659_608 | 33_659_608 | $0.0000461137 | $46.11 |
| 3 | ethGetBalance | 28_664_086 | 33_664_086 | $0.0000461198 | $46.11 |
| 4 | ethGetBlockByNumber | 27_435_678 | 32_435_678 | $0.0000444369 | $44.43 |
| 5 | ethGetBlockByNumber | 27_434_363 | 32_434_363 | $0.0000444351 | $44.43 |
| 6 | ethGetBlockByNumber | 27_425_298 | 32_425_298 | $0.0000444227 | $44.42 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).