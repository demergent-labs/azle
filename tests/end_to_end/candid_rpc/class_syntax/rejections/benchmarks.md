# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectionCodeNoError            | 1_672_561    | 1_259_024 | $0.0000016741 | $1.67             | <font color="green">-51_351</font> |
| 1   | getRejectionCodeDestinationInvalid | 1_617_696    | 1_237_078 | $0.0000016449 | $1.64             | <font color="green">-26_702</font> |
| 2   | getRejectionCodeCanisterReject     | 2_037_135    | 1_404_854 | $0.0000018680 | $1.86             | <font color="green">-24_672</font> |
| 3   | getRejectionCodeCanisterError      | 1_622_705    | 1_239_082 | $0.0000016476 | $1.64             | <font color="green">-26_050</font> |
| 4   | getRejectionMessage                | 2_794_148    | 1_707_659 | $0.0000022706 | $2.27             | <font color="red">+1_426</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_723_912    | 1_279_564 | $0.0000017014 | $1.70             |
| 1   | getRejectionCodeDestinationInvalid | 1_644_398    | 1_247_759 | $0.0000016591 | $1.65             |
| 2   | getRejectionCodeCanisterReject     | 2_061_807    | 1_414_722 | $0.0000018811 | $1.88             |
| 3   | getRejectionCodeCanisterError      | 1_648_755    | 1_249_502 | $0.0000016614 | $1.66             |
| 4   | getRejectionMessage                | 2_792_722    | 1_707_088 | $0.0000022699 | $2.26             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
