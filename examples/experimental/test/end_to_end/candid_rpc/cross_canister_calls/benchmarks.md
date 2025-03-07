# Benchmarks for canister1

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 14_270_785   | 6_298_314 | $0.0000083747 | $8.37             | <font color="red">+28_617</font>   |
| 1   | account          | 15_650_793   | 6_850_317 | $0.0000091087 | $9.10             | <font color="green">-7_424</font>  |
| 2   | balance          | 14_193_112   | 6_267_244 | $0.0000083334 | $8.33             | <font color="green">-4_067</font>  |
| 3   | account          | 15_636_719   | 6_844_687 | $0.0000091012 | $9.10             | <font color="green">-2_847</font>  |
| 4   | accounts         | 13_683_405   | 6_063_362 | $0.0000080623 | $8.06             | <font color="red">+12_047</font>   |
| 5   | transfer         | 15_703_652   | 6_871_460 | $0.0000091368 | $9.13             | <font color="green">-10_590</font> |
| 6   | balance          | 14_188_673   | 6_265_469 | $0.0000083310 | $8.33             | <font color="green">-8_868</font>  |
| 7   | account          | 15_640_784   | 6_846_313 | $0.0000091033 | $9.10             | <font color="green">-7_374</font>  |
| 8   | balance          | 14_195_504   | 6_268_201 | $0.0000083346 | $8.33             | <font color="green">-7_410</font>  |
| 9   | account          | 15_663_121   | 6_855_248 | $0.0000091152 | $9.11             | <font color="red">+23_241</font>   |
| 10  | accounts         | 13_678_260   | 6_061_304 | $0.0000080595 | $8.05             | <font color="green">-35</font>     |
| 11  | trap             | 13_318_958   | 5_917_583 | $0.0000078684 | $7.86             | <font color="red">+13_873</font>   |
| 12  | sendNotification | 2_824_383    | 1_719_753 | $0.0000022867 | $2.28             | <font color="green">-3_337</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 14_242_168   | 6_286_867 | $0.0000083595 | $8.35             |
| 1   | account          | 15_658_217   | 6_853_286 | $0.0000091126 | $9.11             |
| 2   | balance          | 14_197_179   | 6_268_871 | $0.0000083355 | $8.33             |
| 3   | account          | 15_639_566   | 6_845_826 | $0.0000091027 | $9.10             |
| 4   | accounts         | 13_671_358   | 6_058_543 | $0.0000080559 | $8.05             |
| 5   | transfer         | 15_714_242   | 6_875_696 | $0.0000091424 | $9.14             |
| 6   | balance          | 14_197_541   | 6_269_016 | $0.0000083357 | $8.33             |
| 7   | account          | 15_648_158   | 6_849_263 | $0.0000091073 | $9.10             |
| 8   | balance          | 14_202_914   | 6_271_165 | $0.0000083386 | $8.33             |
| 9   | account          | 15_639_880   | 6_845_952 | $0.0000091029 | $9.10             |
| 10  | accounts         | 13_678_295   | 6_061_318 | $0.0000080596 | $8.05             |
| 11  | trap             | 13_305_085   | 5_912_034 | $0.0000078611 | $7.86             |
| 12  | sendNotification | 2_827_720    | 1_721_088 | $0.0000022885 | $2.28             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | transfer            | 2_241_400    | 1_486_560 | $0.0000019766 | $1.97             | <font color="red">+6_970</font> |
| 1   | receiveNotification | 1_399_912    | 1_149_964 | $0.0000015291 | $1.52             | <font color="red">+304</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_234_430    | 1_483_772 | $0.0000019729 | $1.97             |
| 1   | receiveNotification | 1_399_608    | 1_149_843 | $0.0000015289 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
