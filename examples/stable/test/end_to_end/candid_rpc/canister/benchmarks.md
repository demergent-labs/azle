# Benchmarks for canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | canisterNestedReturnType  | 6_527_943    | 3_201_177 | $0.0000042565 | $4.25             | <font color="green">-46_005</font>  |
| 1   | canisterList              | 6_988_112    | 3_385_244 | $0.0000045013 | $4.50             | <font color="green">-153_747</font> |
| 2   | canisterCrossCanisterCall | 2_151_812    | 1_450_724 | $0.0000019290 | $1.92             | <font color="green">-572_723</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_573_948    | 3_219_579 | $0.0000042810 | $4.28             |
| 1   | canisterList              | 7_141_859    | 3_446_743 | $0.0000045830 | $4.58             |
| 2   | canisterCrossCanisterCall | 2_724_535    | 1_679_814 | $0.0000022336 | $2.23             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
