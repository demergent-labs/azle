# Benchmarks for server

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_545_744_293 | 5_818_887_717 | $0.0077372004 | $7_737.20         |
| 1   | http_request_update | 173_904_715   | 70_151_886    | $0.0000932789 | $93.27            |
| 2   | http_request_update | 174_521_548   | 70_398_619    | $0.0000936069 | $93.60            |
| 3   | http_request_update | 229_196_059   | 92_268_423    | $0.0001226866 | $122.68           |
| 4   | http_request_update | 229_112_675   | 92_235_070    | $0.0001226422 | $122.64           |
| 5   | http_request_update | 2_346_269_779 | 1_739_097_911 | $0.0023124263 | $2_312.42         |
| 6   | http_request_update | 229_832_664   | 92_523_065    | $0.0001230251 | $123.02           |
| 7   | http_request_update | 231_445_934   | 93_168_373    | $0.0001238832 | $123.88           |
| 8   | http_request_update | 229_968_616   | 92_577_446    | $0.0001230975 | $123.09           |
| 9   | http_request_update | 230_026_862   | 92_600_744    | $0.0001231284 | $123.12           |

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
