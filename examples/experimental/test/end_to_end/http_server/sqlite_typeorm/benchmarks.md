# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 13_209_919_590 | 10_484_557_836 | $0.0139410020 | $13_941.00        | <font color="green">-170_011_078</font> |
| 1   | http_request_update | 105_324_986    | 42_719_994     | $0.0000568035 | $56.80            | <font color="red">+3_607_684</font>     |
| 2   | http_request_update | 141_192_675    | 57_067_070     | $0.0000758804 | $75.88            | <font color="red">+138_796</font>       |
| 3   | http_request_update | 142_941_612    | 57_766_644     | $0.0000768106 | $76.81            | <font color="red">+658_240</font>       |
| 4   | http_request_update | 66_332_941     | 27_123_176     | $0.0000360649 | $36.06            | <font color="red">+82_236</font>        |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_379_930_668 | 10_552_562_267 | $0.0140314255 | $14_031.42        |
| 1   | http_request_update | 101_717_302    | 41_276_920     | $0.0000548847 | $54.88            |
| 2   | http_request_update | 141_053_879    | 57_011_551     | $0.0000758065 | $75.80            |
| 3   | http_request_update | 142_283_372    | 57_503_348     | $0.0000764605 | $76.46            |
| 4   | http_request_update | 66_250_705     | 27_090_282     | $0.0000360211 | $36.02            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
