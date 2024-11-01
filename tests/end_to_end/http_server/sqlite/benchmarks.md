# Benchmarks for sqlite

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 12_562_007_931 | 9_825_393_172 | $0.0130645305 | $13_064.53        | <font color="red">+3_353_583</font> |
| 1   | http_request_update | 148_407_713    | 59_953_085    | $0.0000797178 | $79.71            | <font color="green">-66_175</font>  |
| 2   | http_request_update | 75_585_661     | 30_824_264    | $0.0000409861 | $40.98            | <font color="green">-97_957</font>  |
| 3   | http_request_update | 150_324_156    | 60_719_662    | $0.0000807371 | $80.73            | <font color="red">+5_731_874</font> |
| 4   | http_request_update | 83_734_581     | 34_083_832    | $0.0000453202 | $45.32            | <font color="green">-13_044</font>  |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 12_558_654_348 | 9_824_051_739 | $0.0130627469 | $13_062.74        |
| 1   | http_request_update | 148_473_888    | 59_979_555    | $0.0000797530 | $79.75            |
| 2   | http_request_update | 75_683_618     | 30_863_447    | $0.0000410382 | $41.03            |
| 3   | http_request_update | 144_592_282    | 58_426_912    | $0.0000776885 | $77.68            |
| 4   | http_request_update | 83_747_625     | 34_089_050    | $0.0000453272 | $45.32            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
