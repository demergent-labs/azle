# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 6_332_318_645 | 4_933_517_458 | $0.0065599502 | $6_559.95         |
| 1   | http_request_update | 162_455_085   | 65_572_034    | $0.0000871892 | $87.18            |
| 2   | http_request_update | 162_316_441   | 65_516_576    | $0.0000871154 | $87.11            |
| 3   | http_request_update | 162_858_067   | 65_733_226    | $0.0000874035 | $87.40            |
| 4   | http_request_update | 162_441_081   | 65_566_432    | $0.0000871817 | $87.18            |
| 5   | http_request_update | 162_444_329   | 65_567_731    | $0.0000871834 | $87.18            |
| 6   | http_request_update | 162_782_305   | 65_702_922    | $0.0000873632 | $87.36            |
| 7   | http_request_update | 162_492_774   | 65_587_109    | $0.0000872092 | $87.20            |
| 8   | http_request_update | 164_760_095   | 66_494_038    | $0.0000884151 | $88.41            |
| 9   | http_request_update | 161_115_592   | 65_036_236    | $0.0000864767 | $86.47            |
| 10  | http_request_update | 162_844_568   | 65_727_827    | $0.0000873963 | $87.39            |
| 11  | http_request_update | 170_054_113   | 68_611_645    | $0.0000912308 | $91.23            |
| 12  | http_request_update | 162_864_024   | 65_735_609    | $0.0000874067 | $87.40            |
| 13  | http_request_update | 162_524_467   | 65_599_786    | $0.0000872261 | $87.22            |
| 14  | http_request_update | 162_897_597   | 65_749_038    | $0.0000874245 | $87.42            |
| 15  | http_request_update | 161_233_635   | 65_083_454    | $0.0000865395 | $86.53            |
| 16  | http_request_update | 195_032_355   | 78_602_942    | $0.0001045160 | $104.51           |
| 17  | http_request_update | 163_236_677   | 65_884_670    | $0.0000876049 | $87.60            |
| 18  | http_request_update | 162_799_089   | 65_709_635    | $0.0000873721 | $87.37            |
| 19  | http_request_update | 163_081_641   | 65_822_656    | $0.0000875224 | $87.52            |
| 20  | http_request_update | 161_359_860   | 65_133_944    | $0.0000866067 | $86.60            |
| 21  | http_request_update | 161_409_582   | 65_153_832    | $0.0000866331 | $86.63            |

## Baseline benchmarks Azle version: 0.24.2-rc.61

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
