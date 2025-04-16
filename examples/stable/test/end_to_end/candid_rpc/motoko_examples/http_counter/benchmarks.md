# Benchmarks for http_counter

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_015_184_377 | 806_663_750 | $0.0010725966 | $1_072.59         | <font color="red">+5_011_378</font> |
| 1   | http_request_update | 30_086_912    | 12_624_764  | $0.0000167868 | $16.78            | <font color="red">+40_839</font>    |
| 2   | http_request_update | 29_991_865    | 12_586_746  | $0.0000167362 | $16.73            | <font color="green">-25_305</font>  |
| 3   | http_request_update | 30_069_638    | 12_617_855  | $0.0000167776 | $16.77            | <font color="green">-11_487</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_010_172_999 | 804_659_199 | $0.0010699312 | $1_069.93         |
| 1   | http_request_update | 30_046_073    | 12_608_429  | $0.0000167650 | $16.76            |
| 2   | http_request_update | 30_017_170    | 12_596_868  | $0.0000167497 | $16.74            |
| 3   | http_request_update | 30_081_125    | 12_622_450  | $0.0000167837 | $16.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
