# Benchmarks for canister1

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                         |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------ |
| 0   | balance          | 2_461_194    | 1_574_477 | $0.0000020935 | $2.09             | <font color="green">-49</font> |
| 1   | account          | 3_829_744    | 2_121_897 | $0.0000028214 | $2.82             | <font color="green">-42</font> |
| 2   | balance          | 2_389_592    | 1_545_836 | $0.0000020555 | $2.05             | <font color="green">-70</font> |
| 3   | account          | 3_808_876    | 2_113_550 | $0.0000028103 | $2.81             | <font color="red">+21</font>   |
| 4   | accounts         | 1_295_935    | 1_108_374 | $0.0000014738 | $1.47             | <font color="green">-49</font> |
| 5   | transfer         | 3_796_109    | 2_108_443 | $0.0000028035 | $2.80             | <font color="green">-21</font> |
| 6   | balance          | 2_390_972    | 1_546_388 | $0.0000020562 | $2.05             | <font color="green">-91</font> |
| 7   | account          | 3_812_184    | 2_114_873 | $0.0000028121 | $2.81             | <font color="green">-14</font> |
| 8   | balance          | 2_393_648    | 1_547_459 | $0.0000020576 | $2.05             | <font color="red">+14</font>   |
| 9   | account          | 3_815_491    | 2_116_196 | $0.0000028138 | $2.81             | <font color="green">-63</font> |
| 10  | accounts         | 1_296_350    | 1_108_540 | $0.0000014740 | $1.47             | <font color="red">+154</font>  |
| 11  | trap             | 1_280_113    | 1_102_045 | $0.0000014654 | $1.46             | <font color="red">0</font>     |
| 12  | sendNotification | 2_910_789    | 1_754_315 | $0.0000023327 | $2.33             | <font color="red">0</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_461_243    | 1_574_497 | $0.0000020936 | $2.09             |
| 1   | account          | 3_829_786    | 2_121_914 | $0.0000028214 | $2.82             |
| 2   | balance          | 2_389_662    | 1_545_864 | $0.0000020555 | $2.05             |
| 3   | account          | 3_808_855    | 2_113_542 | $0.0000028103 | $2.81             |
| 4   | accounts         | 1_295_984    | 1_108_393 | $0.0000014738 | $1.47             |
| 5   | transfer         | 3_796_130    | 2_108_452 | $0.0000028035 | $2.80             |
| 6   | balance          | 2_391_063    | 1_546_425 | $0.0000020562 | $2.05             |
| 7   | account          | 3_812_198    | 2_114_879 | $0.0000028121 | $2.81             |
| 8   | balance          | 2_393_634    | 1_547_453 | $0.0000020576 | $2.05             |
| 9   | account          | 3_815_554    | 2_116_221 | $0.0000028139 | $2.81             |
| 10  | accounts         | 1_296_196    | 1_108_478 | $0.0000014739 | $1.47             |
| 11  | trap             | 1_280_113    | 1_102_045 | $0.0000014654 | $1.46             |
| 12  | sendNotification | 2_910_789    | 1_754_315 | $0.0000023327 | $2.33             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                     |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------- |
| 0   | transfer            | 2_310_516    | 1_514_206 | $0.0000020134 | $2.01             | <font color="red">0</font> |
| 1   | receiveNotification | 1_504_966    | 1_191_986 | $0.0000015849 | $1.58             | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.27.0

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
