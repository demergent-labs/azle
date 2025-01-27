# Benchmarks for fs

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_287_995_033 | 6_515_788_013 | $0.0086638478 | $8_663.84         |
| 1   | http_request_update | 55_567_489    | 22_816_995    | $0.0000303391 | $30.33            |
| 2   | http_request_update | 49_807_184    | 20_512_873    | $0.0000272754 | $27.27            |
| 3   | http_request_update | 48_564_029    | 20_015_611    | $0.0000266142 | $26.61            |
| 4   | http_request_update | 47_781_440    | 19_702_576    | $0.0000261979 | $26.19            |
| 5   | http_request_update | 48_091_561    | 19_826_624    | $0.0000263629 | $26.36            |
| 6   | http_request_update | 47_788_126    | 19_705_250    | $0.0000262015 | $26.20            |
| 7   | http_request_update | 47_622_959    | 19_639_183    | $0.0000261136 | $26.11            |
| 8   | http_request_update | 46_951_736    | 19_370_694    | $0.0000257566 | $25.75            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
