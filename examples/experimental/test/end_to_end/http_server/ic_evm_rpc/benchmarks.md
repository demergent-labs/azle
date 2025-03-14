⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_546_003_848 | 5_818_991_539 | $0.0077373385 | $7_737.33         | <font color="red">+4_962_495</font> |
| 1   | http_request_update | 173_179_964   | 69_861_985    | $0.0000928934 | $92.89            | <font color="green">-91_992</font>  |
| 2   | http_request_update | 173_771_226   | 70_098_490    | $0.0000932079 | $93.20            | <font color="green">-78_840</font>  |
| 3   | http_request_update | 224_488_747   | 90_385_498    | $0.0001201829 | $120.18           | <font color="green">-76_081</font>  |
| 4   | http_request_update | 224_317_027   | 90_316_810    | $0.0001200916 | $120.09           | <font color="green">-191_963</font> |
| 5   | http_request_update | 2_338_388_722 | 1_735_945_488 | $0.0023082346 | $2_308.23         | <font color="green">-840_732</font> |
| 6   | http_request_update | 224_955_862   | 90_572_344    | $0.0001204313 | $120.43           | <font color="red">+1_011</font>     |
| 7   | http_request_update | 226_498_940   | 91_189_576    | $0.0001212520 | $121.25           | <font color="green">-20_000</font>  |
| 8   | http_request_update | 225_091_401   | 90_626_560    | $0.0001205034 | $120.50           | <font color="red">+5_246</font>     |
| 9   | http_request_update | 225_116_171   | 90_636_468    | $0.0001205166 | $120.51           | <font color="green">-49_202</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_541_041_353 | 5_817_006_541 | $0.0077346991 | $7_734.69         |
| 1   | http_request_update | 173_271_956   | 69_898_782    | $0.0000929423 | $92.94            |
| 2   | http_request_update | 173_850_066   | 70_130_026    | $0.0000932498 | $93.24            |
| 3   | http_request_update | 224_564_828   | 90_415_931    | $0.0001202234 | $120.22           |
| 4   | http_request_update | 224_508_990   | 90_393_596    | $0.0001201937 | $120.19           |
| 5   | http_request_update | 2_339_229_454 | 1_736_281_781 | $0.0023086818 | $2_308.68         |
| 6   | http_request_update | 224_954_851   | 90_571_940    | $0.0001204308 | $120.43           |
| 7   | http_request_update | 226_518_940   | 91_197_576    | $0.0001212627 | $121.26           |
| 8   | http_request_update | 225_086_155   | 90_624_462    | $0.0001205006 | $120.50           |
| 9   | http_request_update | 225_165_373   | 90_656_149    | $0.0001205428 | $120.54           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
