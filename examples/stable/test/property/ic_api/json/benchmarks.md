# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | processJsonUpdate | 3_278_426 | 8_278_426 | $0.0000113414 | $11.34 |
| 1 | processJsonUpdate | 13_267_581 | 18_267_581 | $0.0000250266 | $25.02 |
| 2 | processJsonUpdate | 111_385_830 | 116_385_830 | $0.0001594486 | $159.44 |
| 3 | processJsonUpdate | 22_636_393 | 27_636_393 | $0.0000378619 | $37.86 |
| 4 | processJsonUpdate | 7_019_531 | 12_019_531 | $0.0000164668 | $16.46 |
| 5 | processJsonUpdate | 90_314_728 | 95_314_728 | $0.0001305812 | $130.58 |
| 6 | processJsonUpdate | 2_848_912 | 7_848_912 | $0.0000107530 | $10.75 |
| 7 | processJsonUpdate | 26_170_670 | 31_170_670 | $0.0000427038 | $42.70 |
| 8 | processJsonUpdate | 22_918_601 | 27_918_601 | $0.0000382485 | $38.24 |
| 9 | processJsonUpdate | 3_112_361 | 8_112_361 | $0.0000111139 | $11.11 |
| 10 | processJsonUpdate | 91_196_341 | 96_196_341 | $0.0001317890 | $131.78 |
| 11 | processJsonUpdate | 1_600_643 | 6_600_643 | $0.0000090429 | $9.04 |
| 12 | processJsonUpdate | 12_957_079 | 17_957_079 | $0.0000246012 | $24.60 |
| 13 | processJsonUpdate | 118_251_111 | 123_251_111 | $0.0001688540 | $168.85 |
| 14 | processJsonUpdate | 1_600_900 | 6_600_900 | $0.0000090432 | $9.04 |
| 15 | processJsonUpdate | 25_421_916 | 30_421_916 | $0.0000416780 | $41.67 |
| 16 | processJsonUpdate | 20_215_599 | 25_215_599 | $0.0000345454 | $34.54 |
| 17 | processJsonUpdate | 2_883_392 | 7_883_392 | $0.0000108002 | $10.80 |
| 18 | processJsonUpdate | 39_584_352 | 44_584_352 | $0.0000610806 | $61.08 |
| 19 | processJsonUpdate | 2_133_799 | 7_133_799 | $0.0000097733 | $9.77 |

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