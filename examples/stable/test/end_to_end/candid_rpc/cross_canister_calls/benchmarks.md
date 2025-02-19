# Benchmarks for canister1

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | balance          | 2_480_246    | 1_582_098 | $0.0000021037 | $2.10             | <font color="green">-15_080</font>  |
| 1   | account          | 3_849_768    | 2_129_907 | $0.0000028321 | $2.83             | <font color="green">-61_626</font>  |
| 2   | balance          | 2_405_065    | 1_552_026 | $0.0000020637 | $2.06             | <font color="green">-23_109</font>  |
| 3   | account          | 3_834_796    | 2_123_918 | $0.0000028241 | $2.82             | <font color="green">-68_841</font>  |
| 4   | accounts         | 1_304_705    | 1_111_882 | $0.0000014784 | $1.47             | <font color="green">-519_484</font> |
| 5   | transfer         | 3_818_358    | 2_117_343 | $0.0000028154 | $2.81             | <font color="green">-35_262</font>  |
| 6   | balance          | 2_404_420    | 1_551_768 | $0.0000020633 | $2.06             | <font color="green">-17_480</font>  |
| 7   | account          | 3_837_030    | 2_124_812 | $0.0000028253 | $2.82             | <font color="green">-65_490</font>  |
| 8   | balance          | 2_402_438    | 1_550_975 | $0.0000020623 | $2.06             | <font color="green">-25_958</font>  |
| 9   | account          | 3_831_410    | 2_122_564 | $0.0000028223 | $2.82             | <font color="green">-69_451</font>  |
| 10  | accounts         | 1_306_795    | 1_112_718 | $0.0000014795 | $1.47             | <font color="green">-521_596</font> |
| 11  | trap             | 1_292_987    | 1_107_194 | $0.0000014722 | $1.47             | <font color="green">-507_607</font> |
| 12  | sendNotification | 2_931_469    | 1_762_587 | $0.0000023437 | $2.34             | <font color="red">+34_144</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_495_326    | 1_588_130 | $0.0000021117 | $2.11             |
| 1   | account          | 3_911_394    | 2_154_557 | $0.0000028648 | $2.86             |
| 2   | balance          | 2_428_174    | 1_561_269 | $0.0000020760 | $2.07             |
| 3   | account          | 3_903_637    | 2_151_454 | $0.0000028607 | $2.86             |
| 4   | accounts         | 1_824_189    | 1_319_675 | $0.0000017547 | $1.75             |
| 5   | transfer         | 3_853_620    | 2_131_448 | $0.0000028341 | $2.83             |
| 6   | balance          | 2_421_900    | 1_558_760 | $0.0000020726 | $2.07             |
| 7   | account          | 3_902_520    | 2_151_008 | $0.0000028601 | $2.86             |
| 8   | balance          | 2_428_396    | 1_561_358 | $0.0000020761 | $2.07             |
| 9   | account          | 3_900_861    | 2_150_344 | $0.0000028592 | $2.85             |
| 10  | accounts         | 1_828_391    | 1_321_356 | $0.0000017570 | $1.75             |
| 11  | trap             | 1_800_594    | 1_310_237 | $0.0000017422 | $1.74             |
| 12  | sendNotification | 2_897_325    | 1_748_930 | $0.0000023255 | $2.32             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | transfer            | 2_318_728    | 1_517_491 | $0.0000020178 | $2.01             | <font color="green">-17_848</font> |
| 1   | receiveNotification | 1_519_541    | 1_197_816 | $0.0000015927 | $1.59             | <font color="green">-6_887</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_336_576    | 1_524_630 | $0.0000020273 | $2.02             |
| 1   | receiveNotification | 1_526_428    | 1_200_571 | $0.0000015964 | $1.59             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
