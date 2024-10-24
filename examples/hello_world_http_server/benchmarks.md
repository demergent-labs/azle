# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 8_135_586_611 | 6_454_824_644 | $0.0085827867 | $8582.7867        | <font color="green">-678663</font> |
| 1   | http_request_update | 53_785_299    | 22_104_119    | $0.0000293912 | $29.3912          | <font color="green">-13428</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_136_265_274 | 6_455_096_109 | $0.0085831476 | $8583.1476        |
| 1   | http_request_update | 53_798_727    | 22_109_490    | $0.0000293983 | $29.3983          |
| 2   | http_request_update | 47_468_265    | 19_577_306    | $0.0000260314 | $26.0314          |
| 3   | http_request_update | 47_474_297    | 19_579_718    | $0.0000260346 | $26.0346          |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base*fee + (per_instruction_fee * number*of_instructions) + (additional_fee_per_billion * floor(number_of_instructions / 1_billion))
-   Base fee: 590_000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
