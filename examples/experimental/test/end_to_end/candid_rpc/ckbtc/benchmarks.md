⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                                 |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------------- |
| 0   | getBalance        | 5_438_176    | 2_765_270 | $0.0000036769 | $3.67             | <font color="green">-74_691_020</font> |
| 1   | getBalance        | 5_385_125    | 2_744_050 | $0.0000036487 | $3.64             | <font color="green">-74_743_222</font> |
| 2   | getDepositAddress | 5_714_892    | 2_875_956 | $0.0000038241 | $3.82             | <font color="green">-97_916_353</font> |
| 3   | getDepositAddress | 5_716_034    | 2_876_413 | $0.0000038247 | $3.82             | <font color="green">-97_805_541</font> |
| 4   | updateBalance     | 5_710_854    | 2_874_341 | $0.0000038219 | $3.82             | <font color="green">-97_831_559</font> |
| 5   | updateBalance     | 5_707_610    | 2_873_044 | $0.0000038202 | $3.82             | <font color="green">-97_740_771</font> |
| 6   | getBalance        | 5_391_341    | 2_746_536 | $0.0000036520 | $3.65             | <font color="green">-74_716_925</font> |
| 7   | getBalance        | 5_390_218    | 2_746_087 | $0.0000036514 | $3.65             | <font color="green">-74_765_453</font> |
| 8   | transfer          | 13_896_709   | 6_148_683 | $0.0000081757 | $8.17             | <font color="green">-74_603_728</font> |
| 9   | getBalance        | 5_391_330    | 2_746_532 | $0.0000036520 | $3.65             | <font color="green">-74_800_157</font> |
| 10  | getBalance        | 5_393_900    | 2_747_560 | $0.0000036533 | $3.65             | <font color="green">-74_816_269</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance        | 80_129_196   | 32_641_678 | $0.0000434027 | $43.40            |
| 1   | getBalance        | 80_128_347   | 32_641_338 | $0.0000434022 | $43.40            |
| 2   | getDepositAddress | 103_631_245  | 42_042_498 | $0.0000559026 | $55.90            |
| 3   | getDepositAddress | 103_521_575  | 41_998_630 | $0.0000558443 | $55.84            |
| 4   | updateBalance     | 103_542_413  | 42_006_965 | $0.0000558554 | $55.85            |
| 5   | updateBalance     | 103_448_381  | 41_969_352 | $0.0000558054 | $55.80            |
| 6   | getBalance        | 80_108_266   | 32_633_306 | $0.0000433915 | $43.39            |
| 7   | getBalance        | 80_155_671   | 32_652_268 | $0.0000434167 | $43.41            |
| 8   | transfer          | 88_500_437   | 35_990_174 | $0.0000478551 | $47.85            |
| 9   | getBalance        | 80_191_487   | 32_666_594 | $0.0000434358 | $43.43            |
| 10  | getBalance        | 80_210_169   | 32_674_067 | $0.0000434457 | $43.44            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
