# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 5_094_218_308 | 4_038_277_323 | $0.0053695762 | $5_369.57         | <font color="green">-469_801_995</font> |
| 1   | ethGetBalance       | 181_641_628   | 73_246_651    | $0.0000973939 | $97.39            | <font color="green">-159_828</font>     |
| 2   | ethGetBalance       | 181_623_670   | 73_239_468    | $0.0000973843 | $97.38            | <font color="green">-27_954</font>      |
| 3   | ethGetBalance       | 181_421_967   | 73_158_786    | $0.0000972770 | $97.27            | <font color="green">-271_545</font>     |
| 4   | ethGetBlockByNumber | 180_485_568   | 72_784_227    | $0.0000967790 | $96.77            | <font color="green">-155_826</font>     |
| 5   | ethGetBlockByNumber | 180_512_144   | 72_794_857    | $0.0000967931 | $96.79            | <font color="red">+11_102</font>        |
| 6   | ethGetBlockByNumber | 180_420_088   | 72_758_035    | $0.0000967442 | $96.74            | <font color="green">-263_903</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_564_020_303 | 4_226_198_121 | $0.0056194489 | $5_619.44         |
| 1   | ethGetBalance       | 181_801_456   | 73_310_582    | $0.0000974789 | $97.47            |
| 2   | ethGetBalance       | 181_651_624   | 73_250_649    | $0.0000973992 | $97.39            |
| 3   | ethGetBalance       | 181_693_512   | 73_267_404    | $0.0000974215 | $97.42            |
| 4   | ethGetBlockByNumber | 180_641_394   | 72_846_557    | $0.0000968619 | $96.86            |
| 5   | ethGetBlockByNumber | 180_501_042   | 72_790_416    | $0.0000967872 | $96.78            |
| 6   | ethGetBlockByNumber | 180_683_991   | 72_863_596    | $0.0000968845 | $96.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
