# Benchmarks for canister1

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 14_242_168   | 6_286_867 | $0.0000083595 | $8.35             | <font color="green">-31_635</font> |
| 1   | account          | 15_658_217   | 6_853_286 | $0.0000091126 | $9.11             | <font color="red">+18_208</font>   |
| 2   | balance          | 14_197_179   | 6_268_871 | $0.0000083355 | $8.33             | <font color="red">+12_999</font>   |
| 3   | account          | 15_639_566   | 6_845_826 | $0.0000091027 | $9.10             | <font color="green">-3_550</font>  |
| 4   | accounts         | 13_671_358   | 6_058_543 | $0.0000080559 | $8.05             | <font color="green">-2_422</font>  |
| 5   | transfer         | 15_714_242   | 6_875_696 | $0.0000091424 | $9.14             | <font color="red">+28_281</font>   |
| 6   | balance          | 14_197_541   | 6_269_016 | $0.0000083357 | $8.33             | <font color="red">+6_426</font>    |
| 7   | account          | 15_648_158   | 6_849_263 | $0.0000091073 | $9.10             | <font color="red">+3_214</font>    |
| 8   | balance          | 14_202_914   | 6_271_165 | $0.0000083386 | $8.33             | <font color="red">+24_230</font>   |
| 9   | account          | 15_639_880   | 6_845_952 | $0.0000091029 | $9.10             | <font color="red">+10_895</font>   |
| 10  | accounts         | 13_678_295   | 6_061_318 | $0.0000080596 | $8.05             | <font color="green">-4_583</font>  |
| 11  | trap             | 13_305_085   | 5_912_034 | $0.0000078611 | $7.86             | <font color="red">+3_967</font>    |
| 12  | sendNotification | 2_827_720    | 1_721_088 | $0.0000022885 | $2.28             | <font color="red">+1_419</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 14_273_803   | 6_299_521 | $0.0000083763 | $8.37             |
| 1   | account          | 15_640_009   | 6_846_003 | $0.0000091029 | $9.10             |
| 2   | balance          | 14_184_180   | 6_263_672 | $0.0000083286 | $8.32             |
| 3   | account          | 15_643_116   | 6_847_246 | $0.0000091046 | $9.10             |
| 4   | accounts         | 13_673_780   | 6_059_512 | $0.0000080572 | $8.05             |
| 5   | transfer         | 15_685_961   | 6_864_384 | $0.0000091274 | $9.12             |
| 6   | balance          | 14_191_115   | 6_266_446 | $0.0000083323 | $8.33             |
| 7   | account          | 15_644_944   | 6_847_977 | $0.0000091055 | $9.10             |
| 8   | balance          | 14_178_684   | 6_261_473 | $0.0000083257 | $8.32             |
| 9   | account          | 15_628_985   | 6_841_594 | $0.0000090971 | $9.09             |
| 10  | accounts         | 13_682_878   | 6_063_151 | $0.0000080620 | $8.06             |
| 11  | trap             | 13_301_118   | 5_910_447 | $0.0000078589 | $7.85             |
| 12  | sendNotification | 2_826_301    | 1_720_520 | $0.0000022877 | $2.28             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | transfer            | 2_234_430    | 1_483_772 | $0.0000019729 | $1.97             | <font color="green">-514</font> |
| 1   | receiveNotification | 1_399_608    | 1_149_843 | $0.0000015289 | $1.52             | <font color="red">+25</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_234_944    | 1_483_977 | $0.0000019732 | $1.97             |
| 1   | receiveNotification | 1_399_583    | 1_149_833 | $0.0000015289 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
