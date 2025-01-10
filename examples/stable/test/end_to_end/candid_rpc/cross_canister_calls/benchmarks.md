# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | balance          | 2_495_326    | 1_588_130 | $0.0000021117 | $2.11             | <font color="red">+212_117</font> |
| 1   | account          | 3_911_394    | 2_154_557 | $0.0000028648 | $2.86             | <font color="red">+282_242</font> |
| 2   | balance          | 2_428_174    | 1_561_269 | $0.0000020760 | $2.07             | <font color="red">+196_902</font> |
| 3   | account          | 3_903_637    | 2_151_454 | $0.0000028607 | $2.86             | <font color="red">+281_786</font> |
| 4   | accounts         | 1_824_189    | 1_319_675 | $0.0000017547 | $1.75             | <font color="red">+159_570</font> |
| 5   | transfer         | 3_853_620    | 2_131_448 | $0.0000028341 | $2.83             | <font color="red">+252_639</font> |
| 6   | balance          | 2_421_900    | 1_558_760 | $0.0000020726 | $2.07             | <font color="red">+188_801</font> |
| 7   | account          | 3_902_520    | 2_151_008 | $0.0000028601 | $2.86             | <font color="red">+282_498</font> |
| 8   | balance          | 2_428_396    | 1_561_358 | $0.0000020761 | $2.07             | <font color="red">+199_336</font> |
| 9   | account          | 3_900_861    | 2_150_344 | $0.0000028592 | $2.85             | <font color="red">+280_987</font> |
| 10  | accounts         | 1_828_391    | 1_321_356 | $0.0000017570 | $1.75             | <font color="red">+164_511</font> |
| 11  | trap             | 1_800_594    | 1_310_237 | $0.0000017422 | $1.74             | <font color="red">+184_000</font> |
| 12  | sendNotification | 2_897_325    | 1_748_930 | $0.0000023255 | $2.32             | <font color="red">+243_667</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_283_209    | 1_503_283 | $0.0000019989 | $1.99             |
| 1   | account          | 3_629_152    | 2_041_660 | $0.0000027147 | $2.71             |
| 2   | balance          | 2_231_272    | 1_482_508 | $0.0000019712 | $1.97             |
| 3   | account          | 3_621_851    | 2_038_740 | $0.0000027109 | $2.71             |
| 4   | accounts         | 1_664_619    | 1_255_847 | $0.0000016699 | $1.66             |
| 5   | transfer         | 3_600_981    | 2_030_392 | $0.0000026998 | $2.69             |
| 6   | balance          | 2_233_099    | 1_483_239 | $0.0000019722 | $1.97             |
| 7   | account          | 3_620_022    | 2_038_008 | $0.0000027099 | $2.70             |
| 8   | balance          | 2_229_060    | 1_481_624 | $0.0000019701 | $1.97             |
| 9   | account          | 3_619_874    | 2_037_949 | $0.0000027098 | $2.70             |
| 10  | accounts         | 1_663_880    | 1_255_552 | $0.0000016695 | $1.66             |
| 11  | trap             | 1_616_594    | 1_236_637 | $0.0000016443 | $1.64             |
| 12  | sendNotification | 2_653_658    | 1_651_463 | $0.0000021959 | $2.19             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_336_576    | 1_524_630 | $0.0000020273 | $2.02             | <font color="red">+147_164</font> |
| 1   | receiveNotification | 1_526_428    | 1_200_571 | $0.0000015964 | $1.59             | <font color="red">+78_927</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_189_412    | 1_465_764 | $0.0000019490 | $1.94             |
| 1   | receiveNotification | 1_447_501    | 1_169_000 | $0.0000015544 | $1.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
