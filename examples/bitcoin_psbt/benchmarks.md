# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 13_927_457_832 | 10_771_573_132 | $0.0143226376 | $14_322.63        |
| 1   | http_request_update | 164_261_627    | 66_294_650     | $0.0000881500 | $88.15            |
| 2   | http_request_update | 164_225_808    | 66_280_323     | $0.0000881310 | $88.13            |
| 3   | http_request_update | 164_864_217    | 66_535_686     | $0.0000884705 | $88.47            |
| 4   | http_request_update | 164_286_669    | 66_304_667     | $0.0000881633 | $88.16            |
| 5   | http_request_update | 164_317_717    | 66_317_086     | $0.0000881798 | $88.17            |
| 6   | http_request_update | 165_157_142    | 66_652_856     | $0.0000886263 | $88.62            |
| 7   | http_request_update | 164_360_028    | 66_334_011     | $0.0000882023 | $88.20            |
| 8   | http_request_update | 167_112_663    | 67_435_065     | $0.0000896664 | $89.66            |
| 9   | http_request_update | 163_107_709    | 65_833_083     | $0.0000875363 | $87.53            |
| 10  | http_request_update | 164_761_922    | 66_494_768     | $0.0000884161 | $88.41            |
| 11  | http_request_update | 172_443_515    | 69_567_406     | $0.0000925017 | $92.50            |
| 12  | http_request_update | 164_648_128    | 66_449_251     | $0.0000883556 | $88.35            |
| 13  | http_request_update | 164_328_253    | 66_321_301     | $0.0000881854 | $88.18            |
| 14  | http_request_update | 165_136_865    | 66_644_746     | $0.0000886155 | $88.61            |
| 15  | http_request_update | 163_138_468    | 65_845_387     | $0.0000875526 | $87.55            |
| 16  | http_request_update | 165_523_674    | 66_799_469     | $0.0000888212 | $88.82            |
| 17  | http_request_update | 164_767_980    | 66_497_192     | $0.0000884193 | $88.41            |
| 18  | http_request_update | 164_364_666    | 66_335_866     | $0.0000882048 | $88.20            |
| 19  | http_request_update | 165_143_099    | 66_647_239     | $0.0000886188 | $88.61            |
| 20  | http_request_update | 163_097_932    | 65_829_172     | $0.0000875311 | $87.53            |
| 21  | http_request_update | 163_108_473    | 65_833_389     | $0.0000875367 | $87.53            |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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
