⚠️ **WARNING: Benchmark process failed for version 0.31.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_598_430_841 | 5_839_962_336 | $0.0077652227 | $7_765.22         | <font color="red">+52_426_993</font> |
| 1   | http_request_update | 173_083_485   | 69_823_394    | $0.0000928421 | $92.84            | <font color="green">-96_479</font>   |
| 2   | http_request_update | 173_813_001   | 70_115_200    | $0.0000932301 | $93.23            | <font color="red">+41_775</font>     |
| 3   | http_request_update | 224_386_125   | 90_344_450    | $0.0001201283 | $120.12           | <font color="green">-102_622</font>  |
| 4   | http_request_update | 224_402_646   | 90_351_058    | $0.0001201371 | $120.13           | <font color="red">+85_619</font>     |
| 5   | http_request_update | 2_339_479_698 | 1_736_381_879 | $0.0023088149 | $2_308.81         | <font color="red">+1_090_976</font>  |
| 6   | http_request_update | 224_876_585   | 90_540_634    | $0.0001203892 | $120.38           | <font color="green">-79_277</font>   |
| 7   | http_request_update | 226_330_446   | 91_122_178    | $0.0001211624 | $121.16           | <font color="green">-168_494</font>  |
| 8   | http_request_update | 224_933_737   | 90_563_494    | $0.0001204196 | $120.41           | <font color="green">-157_664</font>  |
| 9   | http_request_update | 225_084_416   | 90_623_766    | $0.0001204997 | $120.49           | <font color="green">-31_755</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_546_003_848 | 5_818_991_539 | $0.0077373385 | $7_737.33         |
| 1   | http_request_update | 173_179_964   | 69_861_985    | $0.0000928934 | $92.89            |
| 2   | http_request_update | 173_771_226   | 70_098_490    | $0.0000932079 | $93.20            |
| 3   | http_request_update | 224_488_747   | 90_385_498    | $0.0001201829 | $120.18           |
| 4   | http_request_update | 224_317_027   | 90_316_810    | $0.0001200916 | $120.09           |
| 5   | http_request_update | 2_338_388_722 | 1_735_945_488 | $0.0023082346 | $2_308.23         |
| 6   | http_request_update | 224_955_862   | 90_572_344    | $0.0001204313 | $120.43           |
| 7   | http_request_update | 226_498_940   | 91_189_576    | $0.0001212520 | $121.25           |
| 8   | http_request_update | 225_091_401   | 90_626_560    | $0.0001205034 | $120.50           |
| 9   | http_request_update | 225_116_171   | 90_636_468    | $0.0001205166 | $120.51           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
