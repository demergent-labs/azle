# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 5_564_020_303 | 4_226_198_121 | $0.0056194489 | $5_619.44         | <font color="red">+90_431_579</font> |
| 1   | ethGetBalance       | 181_801_456   | 73_310_582    | $0.0000974789 | $97.47            | <font color="red">+11_137_832</font> |
| 2   | ethGetBalance       | 181_651_624   | 73_250_649    | $0.0000973992 | $97.39            | <font color="red">+11_077_162</font> |
| 3   | ethGetBalance       | 181_693_512   | 73_267_404    | $0.0000974215 | $97.42            | <font color="red">+11_160_441</font> |
| 4   | ethGetBlockByNumber | 180_641_394   | 72_846_557    | $0.0000968619 | $96.86            | <font color="red">+11_113_897</font> |
| 5   | ethGetBlockByNumber | 180_501_042   | 72_790_416    | $0.0000967872 | $96.78            | <font color="red">+11_006_572</font> |
| 6   | ethGetBlockByNumber | 180_683_991   | 72_863_596    | $0.0000968845 | $96.88            | <font color="red">+11_170_471</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_473_588_724 | 4_190_025_489 | $0.0055713512 | $5_571.35         |
| 1   | ethGetBalance       | 170_663_624   | 68_855_449    | $0.0000915550 | $91.55            |
| 2   | ethGetBalance       | 170_574_462   | 68_819_784    | $0.0000915076 | $91.50            |
| 3   | ethGetBalance       | 170_533_071   | 68_803_228    | $0.0000914856 | $91.48            |
| 4   | ethGetBlockByNumber | 169_527_497   | 68_400_998    | $0.0000909508 | $90.95            |
| 5   | ethGetBlockByNumber | 169_494_470   | 68_387_788    | $0.0000909332 | $90.93            |
| 6   | ethGetBlockByNumber | 169_513_520   | 68_395_408    | $0.0000909433 | $90.94            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
