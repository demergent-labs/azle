# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 14_093_851_996 | 11_238_130_798 | $0.0149430054 | $14_943.00        | <font color="red">+19_637_143</font>   |
| 1   | http_request_update | 102_340_340    | 41_526_136     | $0.0000552161 | $55.21            | <font color="green">-51_202</font>     |
| 2   | http_request_update | 141_810_972    | 57_314_388     | $0.0000762092 | $76.20            | <font color="green">-86_340</font>     |
| 3   | http_request_update | 142_883_077    | 57_743_230     | $0.0000767794 | $76.77            | <font color="green">-15_046_426</font> |
| 4   | http_request_update | 66_889_943     | 27_345_977     | $0.0000363611 | $36.36            | <font color="green">-43_596</font>     |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 14_074_214_853 | 11_230_275_941 | $0.0149325610 | $14_932.56        |
| 1   | http_request_update | 102_391_542    | 41_546_616     | $0.0000552433 | $55.24            |
| 2   | http_request_update | 141_897_312    | 57_348_924     | $0.0000762551 | $76.25            |
| 3   | http_request_update | 157_929_503    | 63_761_801     | $0.0000847822 | $84.78            |
| 4   | http_request_update | 66_933_539     | 27_363_415     | $0.0000363843 | $36.38            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
