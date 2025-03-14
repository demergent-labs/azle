⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for canister1

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                                 |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------------- |
| 0   | balance          | 2_485_126    | 1_584_050 | $0.0000021063 | $2.10             | <font color="green">-11_785_659</font> |
| 1   | account          | 4_373_178    | 2_339_271 | $0.0000031105 | $3.11             | <font color="green">-11_277_615</font> |
| 2   | balance          | 2_435_419    | 1_564_167 | $0.0000020798 | $2.07             | <font color="green">-11_757_693</font> |
| 3   | account          | 4_368_434    | 2_337_373 | $0.0000031079 | $3.10             | <font color="green">-11_268_285</font> |
| 4   | accounts         | 1_777_739    | 1_301_095 | $0.0000017300 | $1.73             | <font color="green">-11_905_666</font> |
| 5   | transfer         | 3_833_796    | 2_123_518 | $0.0000028236 | $2.82             | <font color="green">-11_869_856</font> |
| 6   | balance          | 2_435_318    | 1_564_127 | $0.0000020798 | $2.07             | <font color="green">-11_753_355</font> |
| 7   | account          | 4_369_650    | 2_337_860 | $0.0000031086 | $3.10             | <font color="green">-11_271_134</font> |
| 8   | balance          | 2_430_575    | 1_562_230 | $0.0000020773 | $2.07             | <font color="green">-11_764_929</font> |
| 9   | account          | 4_368_142    | 2_337_256 | $0.0000031078 | $3.10             | <font color="green">-11_294_979</font> |
| 10  | accounts         | 1_776_371    | 1_300_548 | $0.0000017293 | $1.72             | <font color="green">-11_901_889</font> |
| 11  | trap             | 1_351_762    | 1_130_704 | $0.0000015035 | $1.50             | <font color="green">-11_967_196</font> |
| 12  | sendNotification | 2_822_290    | 1_718_916 | $0.0000022856 | $2.28             | <font color="green">-2_093</font>      |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 14_270_785   | 6_298_314 | $0.0000083747 | $8.37             |
| 1   | account          | 15_650_793   | 6_850_317 | $0.0000091087 | $9.10             |
| 2   | balance          | 14_193_112   | 6_267_244 | $0.0000083334 | $8.33             |
| 3   | account          | 15_636_719   | 6_844_687 | $0.0000091012 | $9.10             |
| 4   | accounts         | 13_683_405   | 6_063_362 | $0.0000080623 | $8.06             |
| 5   | transfer         | 15_703_652   | 6_871_460 | $0.0000091368 | $9.13             |
| 6   | balance          | 14_188_673   | 6_265_469 | $0.0000083310 | $8.33             |
| 7   | account          | 15_640_784   | 6_846_313 | $0.0000091033 | $9.10             |
| 8   | balance          | 14_195_504   | 6_268_201 | $0.0000083346 | $8.33             |
| 9   | account          | 15_663_121   | 6_855_248 | $0.0000091152 | $9.11             |
| 10  | accounts         | 13_678_260   | 6_061_304 | $0.0000080595 | $8.05             |
| 11  | trap             | 13_318_958   | 5_917_583 | $0.0000078684 | $7.86             |
| 12  | sendNotification | 2_824_383    | 1_719_753 | $0.0000022867 | $2.28             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_236_878    | 1_484_751 | $0.0000019742 | $1.97             | <font color="green">-4_522</font> |
| 1   | receiveNotification | 1_401_539    | 1_150_615 | $0.0000015299 | $1.52             | <font color="red">+1_627</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_241_400    | 1_486_560 | $0.0000019766 | $1.97             |
| 1   | receiveNotification | 1_399_912    | 1_149_964 | $0.0000015291 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
