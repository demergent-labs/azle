# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | processJsonUpdate | 3_206_237 | 8_206_237 | $0.0000112425 | $11.24 |
| 1 | processJsonUpdate | 49_578_411 | 54_578_411 | $0.0000747724 | $74.77 |
| 2 | processJsonUpdate | 1_600_559 | 6_600_559 | $0.0000090428 | $9.04 |
| 3 | processJsonUpdate | 14_315_101 | 19_315_101 | $0.0000264617 | $26.46 |
| 4 | processJsonUpdate | 1_599_756 | 6_599_756 | $0.0000090417 | $9.04 |
| 5 | processJsonUpdate | 19_364_989 | 24_364_989 | $0.0000333800 | $33.38 |
| 6 | processJsonUpdate | 24_228_686 | 29_228_686 | $0.0000400433 | $40.04 |
| 7 | processJsonUpdate | 33_260_164 | 38_260_164 | $0.0000524164 | $52.41 |
| 8 | processJsonUpdate | 60_722_018 | 65_722_018 | $0.0000900392 | $90.03 |
| 9 | processJsonUpdate | 37_512_359 | 42_512_359 | $0.0000582419 | $58.24 |
| 10 | processJsonUpdate | 14_815_020 | 19_815_020 | $0.0000271466 | $27.14 |
| 11 | processJsonUpdate | 1_599_498 | 6_599_498 | $0.0000090413 | $9.04 |
| 12 | processJsonUpdate | 53_570_102 | 58_570_102 | $0.0000802410 | $80.24 |
| 13 | processJsonUpdate | 5_800_406 | 10_800_406 | $0.0000147966 | $14.79 |
| 14 | processJsonUpdate | 4_955_640 | 9_955_640 | $0.0000136392 | $13.63 |
| 15 | processJsonUpdate | 1_600_452 | 6_600_452 | $0.0000090426 | $9.04 |
| 16 | processJsonUpdate | 15_926_203 | 20_926_203 | $0.0000286689 | $28.66 |
| 17 | processJsonUpdate | 75_964_670 | 80_964_670 | $0.0001109216 | $110.92 |
| 18 | processJsonUpdate | 3_873_515 | 8_873_515 | $0.0000121567 | $12.15 |
| 19 | processJsonUpdate | 46_071_401 | 51_071_401 | $0.0000699678 | $69.96 |

## Baseline benchmarks Azle version: No previous benchmarks
No benchmarks reported



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).