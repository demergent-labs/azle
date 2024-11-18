# Benchmarks for sqlite

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 12_562_331_161 | 9_825_522_464 | $0.0130647025 | $13_064.70        | <font color="red">+3_676_813</font> |
| 1   | http_request_update | 148_573_124    | 60_019_249    | $0.0000798058 | $79.80            | <font color="red">+99_236</font>    |
| 2   | http_request_update | 75_688_519     | 30_865_407    | $0.0000410408 | $41.04            | <font color="red">+4_901</font>     |
| 3   | http_request_update | 144_603_118    | 58_431_247    | $0.0000776943 | $77.69            | <font color="red">+10_836</font>    |
| 4   | http_request_update | 83_761_937     | 34_094_774    | $0.0000453348 | $45.33            | <font color="red">+14_312</font>    |

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
