# Benchmarks for canister1

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                               |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------------ |
| 0   | balance          | 14_238_645   | 6_285_458 | $0.0000083576 | $8.35             | <font color="red">+11_753_519</font> |
| 1   | account          | 15_657_715   | 6_853_086 | $0.0000091123 | $9.11             | <font color="red">+11_284_537</font> |
| 2   | balance          | 14_197_058   | 6_268_823 | $0.0000083355 | $8.33             | <font color="red">+11_761_639</font> |
| 3   | account          | 15_653_608   | 6_851_443 | $0.0000091102 | $9.11             | <font color="red">+11_285_174</font> |
| 4   | accounts         | 13_678_133   | 6_061_253 | $0.0000080595 | $8.05             | <font color="red">+11_900_394</font> |
| 5   | transfer         | 15_691_827   | 6_866_730 | $0.0000091305 | $9.13             | <font color="red">+11_858_031</font> |
| 6   | balance          | 14_189_890   | 6_265_956 | $0.0000083317 | $8.33             | <font color="red">+11_754_572</font> |
| 7   | account          | 15_618_111   | 6_837_244 | $0.0000090913 | $9.09             | <font color="red">+11_248_461</font> |
| 8   | balance          | 14_177_264   | 6_260_905 | $0.0000083249 | $8.32             | <font color="red">+11_746_689</font> |
| 9   | account          | 15_649_501   | 6_849_800 | $0.0000091080 | $9.10             | <font color="red">+11_281_359</font> |
| 10  | accounts         | 13_673_690   | 6_059_476 | $0.0000080571 | $8.05             | <font color="red">+11_897_319</font> |
| 11  | trap             | 13_301_269   | 5_910_507 | $0.0000078590 | $7.85             | <font color="red">+11_949_507</font> |
| 12  | sendNotification | 2_827_642    | 1_721_056 | $0.0000022884 | $2.28             | <font color="red">+5_352</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_485_126    | 1_584_050 | $0.0000021063 | $2.10             |
| 1   | account          | 4_373_178    | 2_339_271 | $0.0000031105 | $3.11             |
| 2   | balance          | 2_435_419    | 1_564_167 | $0.0000020798 | $2.07             |
| 3   | account          | 4_368_434    | 2_337_373 | $0.0000031079 | $3.10             |
| 4   | accounts         | 1_777_739    | 1_301_095 | $0.0000017300 | $1.73             |
| 5   | transfer         | 3_833_796    | 2_123_518 | $0.0000028236 | $2.82             |
| 6   | balance          | 2_435_318    | 1_564_127 | $0.0000020798 | $2.07             |
| 7   | account          | 4_369_650    | 2_337_860 | $0.0000031086 | $3.10             |
| 8   | balance          | 2_430_575    | 1_562_230 | $0.0000020773 | $2.07             |
| 9   | account          | 4_368_142    | 2_337_256 | $0.0000031078 | $3.10             |
| 10  | accounts         | 1_776_371    | 1_300_548 | $0.0000017293 | $1.72             |
| 11  | trap             | 1_351_762    | 1_130_704 | $0.0000015035 | $1.50             |
| 12  | sendNotification | 2_822_290    | 1_718_916 | $0.0000022856 | $2.28             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_238_711    | 1_485_484 | $0.0000019752 | $1.97             | <font color="red">+1_833</font>   |
| 1   | receiveNotification | 1_398_813    | 1_149_525 | $0.0000015285 | $1.52             | <font color="green">-2_726</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_236_878    | 1_484_751 | $0.0000019742 | $1.97             |
| 1   | receiveNotification | 1_401_539    | 1_150_615 | $0.0000015299 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
