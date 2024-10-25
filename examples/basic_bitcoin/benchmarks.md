# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 6_332_318_645 | 4_933_517_458 | $0.0065599502 | $6_559.95         |
| 1   | http_request_update | 162_455_050   | 65_572_020    | $0.0000871891 | $87.18            |
| 2   | http_request_update | 162_316_533   | 65_516_613    | $0.0000871155 | $87.11            |
| 3   | http_request_update | 162_858_055   | 65_733_222    | $0.0000874035 | $87.40            |
| 4   | http_request_update | 162_441_070   | 65_566_428    | $0.0000871817 | $87.18            |
| 5   | http_request_update | 162_444_445   | 65_567_778    | $0.0000871835 | $87.18            |
| 6   | http_request_update | 162_782_305   | 65_702_922    | $0.0000873632 | $87.36            |
| 7   | http_request_update | 162_492_670   | 65_587_068    | $0.0000872092 | $87.20            |
| 8   | http_request_update | 164_760_165   | 66_494_066    | $0.0000884152 | $88.41            |
| 9   | http_request_update | 161_203_739   | 65_071_495    | $0.0000865236 | $86.52            |
| 10  | http_request_update | 162_829_448   | 65_721_779    | $0.0000873883 | $87.38            |
| 11  | http_request_update | 169_935_408   | 68_564_163    | $0.0000911677 | $91.16            |
| 12  | http_request_update | 162_757_819   | 65_693_127    | $0.0000873502 | $87.35            |
| 13  | http_request_update | 162_489_327   | 65_585_730    | $0.0000872074 | $87.20            |
| 14  | http_request_update | 162_936_302   | 65_764_520    | $0.0000874451 | $87.44            |
| 15  | http_request_update | 161_241_712   | 65_086_684    | $0.0000865438 | $86.54            |
| 16  | http_request_update | 195_042_136   | 78_606_854    | $0.0001045212 | $104.52           |
| 17  | http_request_update | 163_264_886   | 65_895_954    | $0.0000876199 | $87.61            |
| 18  | http_request_update | 162_809_801   | 65_713_920    | $0.0000873778 | $87.37            |
| 19  | http_request_update | 163_000_246   | 65_790_098    | $0.0000874791 | $87.47            |
| 20  | http_request_update | 161_520_169   | 65_198_067    | $0.0000866919 | $86.69            |
| 21  | http_request_update | 161_354_359   | 65_131_743    | $0.0000866037 | $86.60            |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
