# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | addRandomBytes | 1_085_405 | 6_085_405 | $0.0000083370 | $8.33 | <font color="green">-56_176</font> |
| 1 | addRandomBytes | 1_013_274 | 6_013_274 | $0.0000082382 | $8.23 | <font color="green">-50_733</font> |
| 2 | addRandomBytes | 1_015_783 | 6_015_783 | $0.0000082416 | $8.24 | <font color="green">-49_765</font> |
| 3 | addRandomBytes | 1_017_501 | 6_017_501 | $0.0000082440 | $8.24 | <font color="green">-50_879</font> |
| 4 | addRandomBytes | 1_018_884 | 6_018_884 | $0.0000082459 | $8.24 | <font color="red">+917_046</font> |
| 5 | addRandomBytes | 1_011_857 | 6_011_857 | $0.0000082362 | $8.23 |  |
| 6 | addRandomBytes | 1_016_248 | 6_016_248 | $0.0000082423 | $8.24 |  |
| 7 | addRandomBytes | 1_013_745 | 6_013_745 | $0.0000082388 | $8.23 |  |
| 8 | addRandomBytes | 1_012_534 | 6_012_534 | $0.0000082372 | $8.23 |  |
| 9 | addRandomBytes | 1_013_517 | 6_013_517 | $0.0000082385 | $8.23 |  |
| 10 | addRandomBytes | 1_012_822 | 6_012_822 | $0.0000082376 | $8.23 |  |
| 11 | addRandomBytes | 1_016_438 | 6_016_438 | $0.0000082425 | $8.24 |  |
| 12 | addRandomBytes | 1_016_553 | 6_016_553 | $0.0000082427 | $8.24 |  |
| 13 | onLowWasmMemory | 99_703 | 5_099_703 | $0.0000069866 | $6.98 |  |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | addRandomBytes | 1_141_581 | 6_141_581 | $0.0000084140 | $8.41 |
| 1 | addRandomBytes | 1_064_007 | 6_064_007 | $0.0000083077 | $8.30 |
| 2 | addRandomBytes | 1_065_548 | 6_065_548 | $0.0000083098 | $8.30 |
| 3 | addRandomBytes | 1_068_380 | 6_068_380 | $0.0000083137 | $8.31 |
| 4 | onLowWasmMemory | 101_838 | 5_101_838 | $0.0000069895 | $6.98 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).