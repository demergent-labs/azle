⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                                  |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------------- |
| 0   | getAccountBalance | 5_230_391    | 2_682_156 | $0.0000035664 | $3.56             | <font color="green">-100_580_065</font> |
| 1   | getTransferFee    | 2_355_080    | 1_532_032 | $0.0000020371 | $2.03             | <font color="green">-100_294_479</font> |
| 2   | executeTransfer   | 13_935_562   | 6_164_224 | $0.0000081964 | $8.19             | <font color="green">-100_027_677</font> |
| 3   | executeTransfer   | 13_934_556   | 6_163_822 | $0.0000081958 | $8.19             | <font color="green">-99_973_502</font>  |
| 4   | getBlocks         | 6_500_538    | 3_190_215 | $0.0000042419 | $4.24             | <font color="green">-100_393_457</font> |
| 5   | getSymbol         | 1_341_209    | 1_126_483 | $0.0000014979 | $1.49             | <font color="green">-100_294_579</font> |
| 6   | getName           | 1_346_945    | 1_128_778 | $0.0000015009 | $1.50             | <font color="green">-100_107_573</font> |
| 7   | getDecimals       | 1_344_308    | 1_127_723 | $0.0000014995 | $1.49             | <font color="green">-100_321_431</font> |
| 8   | getArchives       | 1_343_882    | 1_127_552 | $0.0000014993 | $1.49             | <font color="green">-100_360_509</font> |
| 9   | executeTransfer   | 13_925_179   | 6_160_071 | $0.0000081909 | $8.19             | <font color="green">-100_108_719</font> |
| 10  | getAccountBalance | 5_180_617    | 2_662_246 | $0.0000035399 | $3.53             | <font color="green">-100_777_044</font> |
| 11  | executeTransfer   | 13_924_424   | 6_159_769 | $0.0000081905 | $8.19             | <font color="green">-100_057_106</font> |
| 12  | executeTransfer   | 13_927_599   | 6_161_039 | $0.0000081921 | $8.19             | <font color="green">-100_096_105</font> |
| 13  | executeTransfer   | 14_718_708   | 6_477_483 | $0.0000086129 | $8.61             | <font color="green">-100_054_547</font> |
| 14  | executeTransfer   | 14_739_467   | 6_485_786 | $0.0000086240 | $8.62             | <font color="green">-100_084_652</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getAccountBalance | 105_810_456  | 42_914_182 | $0.0000570617 | $57.06            |
| 1   | getTransferFee    | 102_649_559  | 41_649_823 | $0.0000553805 | $55.38            |
| 2   | executeTransfer   | 113_963_239  | 46_175_295 | $0.0000613979 | $61.39            |
| 3   | executeTransfer   | 113_908_058  | 46_153_223 | $0.0000613686 | $61.36            |
| 4   | getBlocks         | 106_893_995  | 43_347_598 | $0.0000576380 | $57.63            |
| 5   | getSymbol         | 101_635_788  | 41_244_315 | $0.0000548413 | $54.84            |
| 6   | getName           | 101_454_518  | 41_171_807 | $0.0000547449 | $54.74            |
| 7   | getDecimals       | 101_665_739  | 41_256_295 | $0.0000548573 | $54.85            |
| 8   | getArchives       | 101_704_391  | 41_271_756 | $0.0000548778 | $54.87            |
| 9   | executeTransfer   | 114_033_898  | 46_203_559 | $0.0000614355 | $61.43            |
| 10  | getAccountBalance | 105_957_661  | 42_973_064 | $0.0000571400 | $57.13            |
| 11  | executeTransfer   | 113_981_530  | 46_182_612 | $0.0000614076 | $61.40            |
| 12  | executeTransfer   | 114_023_704  | 46_199_481 | $0.0000614301 | $61.43            |
| 13  | executeTransfer   | 114_773_255  | 46_499_302 | $0.0000618287 | $61.82            |
| 14  | executeTransfer   | 114_824_119  | 46_519_647 | $0.0000618558 | $61.85            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
