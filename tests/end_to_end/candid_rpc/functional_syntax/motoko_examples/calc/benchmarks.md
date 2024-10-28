# Benchmarks for calc

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_281_024    | 1_102_409 | $0.0000014658 | $1.46             |
| 1   | sub         | 1_259_391    | 1_093_756 | $0.0000014543 | $1.45             |
| 2   | mul         | 1_258_907    | 1_093_562 | $0.0000014541 | $1.45             |
| 3   | div         | 1_626_454    | 1_240_581 | $0.0000016496 | $1.64             |
| 4   | clearall    | 855_325      | 932_130   | $0.0000012394 | $1.23             |
| 5   | add         | 1_254_977    | 1_091_990 | $0.0000014520 | $1.45             |

## Baseline benchmarks Azle version: 0.24.2-rc.85

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
