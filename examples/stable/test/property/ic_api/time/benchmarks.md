# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | updateTime  | 1_653_670    | 6_653_670 | $0.0000091155 | $9.11             | <font color="green">-37_055</font> |
| 1   | updateTime  | 1_597_421    | 6_597_421 | $0.0000090385 | $9.03             | <font color="green">-46_658</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateTime  | 1_690_725    | 6_690_725 | $0.0000091663 | $9.16             |
| 1   | updateTime  | 1_644_079    | 6_644_079 | $0.0000091024 | $9.10             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
