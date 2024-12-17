# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | simpleUpdate | 1_702_618    | 1_271_047 | $0.0000016901 | $1.69             | <font color="green">-20_055</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | simpleUpdate | 1_722_673    | 1_279_069 | $0.0000017007 | $1.70             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
