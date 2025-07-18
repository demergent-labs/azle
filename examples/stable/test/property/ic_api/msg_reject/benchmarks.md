# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | alwaysRejectUpdate | 805_959      | 912_383   | $0.0000012132 | $1.21             | <font color="red">+84_760</font>  |
| 1   | evenOrRejectUpdate | 1_398_425    | 1_149_370 | $0.0000015283 | $1.52             | <font color="red">+845_652</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | ------- | ------------- | ----------------- |
| 0   | alwaysRejectUpdate | 721_199      | 878_479 | $0.0000011681 | $1.16             |
| 1   | evenOrRejectUpdate | 552_773      | 811_109 | $0.0000010785 | $1.07             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
