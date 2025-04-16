# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 13_472_838_657 | 10_589_725_462 | $0.0140808403 | $14_080.84        | <font color="red">+92_907_989</font> |
| 1   | http_request_update | 101_757_157    | 41_292_862     | $0.0000549059 | $54.90            | <font color="red">+39_855</font>     |
| 2   | http_request_update | 141_209_638    | 57_073_855     | $0.0000758894 | $75.88            | <font color="red">+155_759</font>    |
| 3   | http_request_update | 156_930_638    | 63_362_255     | $0.0000842509 | $84.25            | <font color="red">+14_647_266</font> |
| 4   | http_request_update | 66_313_048     | 27_115_219     | $0.0000360543 | $36.05            | <font color="red">+62_343</font>     |

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
