# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 10_837_613_651 | 8_335_635_460  | $0.0110836444 | $11_083.64        | <font color="red">+15_450_352</font>      |
| 1   | http_request_update | 1_107_758_744  | 843_693_497    | $0.0011218339 | $1_121.83         | <font color="red">+33_361</font>          |
| 2   | http_request_update | 6_810_657_091  | 5_124_852_836  | $0.0068143631 | $6_814.36         | <font color="green">-4_760_886_957</font> |
| 3   | http_request_update | 13_965_255_391 | 10_786_692_156 | $0.0143427410 | $14_342.74        | <font color="red">+136_283_606</font>     |
| 4   | http_request_update | 17_381_518_605 | 13_753_197_442 | $0.0182872140 | $18_287.21        | <font color="red">+4_897_262_715</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 10_822_163_299 | 8_329_455_319  | $0.0110754269 | $11_075.42        |
| 1   | http_request_update | 1_107_725_383  | 843_680_153    | $0.0011218162 | $1_121.81         |
| 2   | http_request_update | 11_571_544_048 | 9_029_207_619  | $0.0120058665 | $12_005.86        |
| 3   | http_request_update | 13_828_971_785 | 10_732_178_714 | $0.0142702561 | $14_270.25        |
| 4   | http_request_update | 12_484_255_890 | 9_794_292_356  | $0.0130231767 | $13_023.17        |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
