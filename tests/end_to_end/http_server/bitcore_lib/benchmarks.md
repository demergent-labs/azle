# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 10_837_613_651 | 8_335_635_460  | $0.0110836444 | $11_083.64        | <font color="red">+15_450_352</font>    |
| 1   | http_request_update | 1_107_758_744  | 843_693_497    | $0.0011218339 | $1_121.83         | <font color="red">+33_361</font>        |
| 2   | http_request_update | 11_423_917_863 | 8_970_157_145  | $0.0119273489 | $11_927.34        | <font color="green">-147_626_185</font> |
| 3   | http_request_update | 18_356_050_424 | 14_543_010_169 | $0.0193374043 | $19_337.40        | <font color="red">+4_527_078_639</font> |
| 4   | http_request_update | 12_570_637_530 | 9_828_845_012  | $0.0130691203 | $13_069.12        | <font color="red">+86_381_640</font>    |

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
