⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 13_379_930_668 | 10_552_562_267 | $0.0140314255 | $14_031.42        | <font color="red">+3_386_185</font> |
| 1   | http_request_update | 101_717_302    | 41_276_920     | $0.0000548847 | $54.88            | <font color="green">-127_763</font> |
| 2   | http_request_update | 141_053_879    | 57_011_551     | $0.0000758065 | $75.80            | <font color="green">-95_848</font>  |
| 3   | http_request_update | 142_283_372    | 57_503_348     | $0.0000764605 | $76.46            | <font color="red">+19_968</font>    |
| 4   | http_request_update | 66_250_705     | 27_090_282     | $0.0000360211 | $36.02            | <font color="green">-30_202</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_376_544_483 | 10_551_207_793 | $0.0140296245 | $14_029.62        |
| 1   | http_request_update | 101_845_065    | 41_328_026     | $0.0000549526 | $54.95            |
| 2   | http_request_update | 141_149_727    | 57_049_890     | $0.0000758575 | $75.85            |
| 3   | http_request_update | 142_263_404    | 57_495_361     | $0.0000764499 | $76.44            |
| 4   | http_request_update | 66_280_907     | 27_102_362     | $0.0000360372 | $36.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
