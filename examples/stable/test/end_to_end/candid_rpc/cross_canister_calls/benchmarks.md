# Benchmarks for canister1

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | balance          | 2_515_599    | 1_596_239 | $0.0000021225 | $2.12             | <font color="red">+54_356</font> |
| 1   | account          | 3_884_987    | 2_143_994 | $0.0000028508 | $2.85             | <font color="red">+55_222</font> |
| 2   | balance          | 2_442_035    | 1_566_814 | $0.0000020833 | $2.08             | <font color="red">+52_352</font> |
| 3   | account          | 3_866_297    | 2_136_518 | $0.0000028409 | $2.84             | <font color="red">+57_442</font> |
| 4   | accounts         | 1_349_244    | 1_129_697 | $0.0000015021 | $1.50             | <font color="red">+53_239</font> |
| 5   | transfer         | 3_851_233    | 2_130_493 | $0.0000028329 | $2.83             | <font color="red">+55_145</font> |
| 6   | balance          | 2_443_690    | 1_567_476 | $0.0000020842 | $2.08             | <font color="red">+52_690</font> |
| 7   | account          | 3_865_650    | 2_136_260 | $0.0000028405 | $2.84             | <font color="red">+53_382</font> |
| 8   | balance          | 2_441_199    | 1_566_479 | $0.0000020829 | $2.08             | <font color="red">+47_523</font> |
| 9   | account          | 3_867_058    | 2_136_823 | $0.0000028413 | $2.84             | <font color="red">+51_546</font> |
| 10  | accounts         | 1_344_742    | 1_127_896 | $0.0000014997 | $1.49             | <font color="red">+48_518</font> |
| 11  | trap             | 1_334_310    | 1_123_724 | $0.0000014942 | $1.49             | <font color="red">+54_197</font> |
| 12  | sendNotification | 2_917_147    | 1_756_858 | $0.0000023360 | $2.33             | <font color="red">+6_358</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_461_243    | 1_574_497 | $0.0000020936 | $2.09             |
| 1   | account          | 3_829_765    | 2_121_906 | $0.0000028214 | $2.82             |
| 2   | balance          | 2_389_683    | 1_545_873 | $0.0000020555 | $2.05             |
| 3   | account          | 3_808_855    | 2_113_542 | $0.0000028103 | $2.81             |
| 4   | accounts         | 1_296_005    | 1_108_402 | $0.0000014738 | $1.47             |
| 5   | transfer         | 3_796_088    | 2_108_435 | $0.0000028035 | $2.80             |
| 6   | balance          | 2_391_000    | 1_546_400 | $0.0000020562 | $2.05             |
| 7   | account          | 3_812_268    | 2_114_907 | $0.0000028121 | $2.81             |
| 8   | balance          | 2_393_676    | 1_547_470 | $0.0000020576 | $2.05             |
| 9   | account          | 3_815_512    | 2_116_204 | $0.0000028139 | $2.81             |
| 10  | accounts         | 1_296_224    | 1_108_489 | $0.0000014739 | $1.47             |
| 11  | trap             | 1_280_113    | 1_102_045 | $0.0000014654 | $1.46             |
| 12  | sendNotification | 2_910_789    | 1_754_315 | $0.0000023327 | $2.33             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | transfer            | 2_310_484    | 1_514_193 | $0.0000020134 | $2.01             | <font color="green">-32</font>  |
| 1   | receiveNotification | 1_510_685    | 1_194_274 | $0.0000015880 | $1.58             | <font color="red">+5_719</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_310_516    | 1_514_206 | $0.0000020134 | $2.01             |
| 1   | receiveNotification | 1_504_966    | 1_191_986 | $0.0000015849 | $1.58             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
