# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_274_992    | 1_099_996 | $0.0000014626 | $1.46             | <font color="green">-1_299</font> |
| 1   | sub         | 1_253_918    | 1_091_567 | $0.0000014514 | $1.45             | <font color="green">-985</font>   |
| 2   | mul         | 1_252_202    | 1_090_880 | $0.0000014505 | $1.45             | <font color="green">-954</font>   |
| 3   | div         | 1_614_082    | 1_235_632 | $0.0000016430 | $1.64             | <font color="green">-3_081</font> |
| 4   | clearall    | 849_588      | 929_835   | $0.0000012364 | $1.23             | <font color="green">-587</font>   |
| 5   | add         | 1_252_734    | 1_091_093 | $0.0000014508 | $1.45             | <font color="red">+2_115</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_276_291    | 1_100_516 | $0.0000014633 | $1.46             |
| 1   | sub         | 1_254_903    | 1_091_961 | $0.0000014519 | $1.45             |
| 2   | mul         | 1_253_156    | 1_091_262 | $0.0000014510 | $1.45             |
| 3   | div         | 1_617_163    | 1_236_865 | $0.0000016446 | $1.64             |
| 4   | clearall    | 850_175      | 930_070   | $0.0000012367 | $1.23             |
| 5   | add         | 1_250_619    | 1_090_247 | $0.0000014497 | $1.44             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
