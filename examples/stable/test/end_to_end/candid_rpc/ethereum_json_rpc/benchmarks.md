# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | init | 1_127_140_575 | 1_132_140_575 | $0.0015510326 | $1_551.03 | <font color="red">+12_698_132</font> |
| 1 | ethGetBalance | 27_627_223 | 32_627_223 | $0.0000446993 | $44.69 | <font color="green">-1_083_134</font> |
| 2 | ethGetBalance | 27_519_410 | 32_519_410 | $0.0000445516 | $44.55 | <font color="green">-1_140_198</font> |
| 3 | ethGetBalance | 27_543_521 | 32_543_521 | $0.0000445846 | $44.58 | <font color="green">-1_120_565</font> |
| 4 | ethGetBlockByNumber | 26_333_594 | 31_333_594 | $0.0000429270 | $42.92 | <font color="green">-1_102_084</font> |
| 5 | ethGetBlockByNumber | 26_343_718 | 31_343_718 | $0.0000429409 | $42.94 | <font color="green">-1_090_645</font> |
| 6 | ethGetBlockByNumber | 26_339_354 | 31_339_354 | $0.0000429349 | $42.93 | <font color="green">-1_085_944</font> |

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