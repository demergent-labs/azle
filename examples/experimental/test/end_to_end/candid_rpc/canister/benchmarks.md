# Benchmarks for canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | canisterNestedReturnType  | 6_919_085    | 3_357_634 | $0.0000044645 | $4.46             | <font color="green">-12_903</font> |
| 1   | canisterList              | 7_997_427    | 3_788_970 | $0.0000050381 | $5.03             | <font color="green">-17_500</font> |
| 2   | canisterCrossCanisterCall | 12_063_787   | 5_415_514 | $0.0000072008 | $7.20             | <font color="green">-67_251</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_931_988    | 3_362_795 | $0.0000044714 | $4.47             |
| 1   | canisterList              | 8_014_927    | 3_795_970 | $0.0000050474 | $5.04             |
| 2   | canisterCrossCanisterCall | 12_131_038   | 5_442_415 | $0.0000072366 | $7.23             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
