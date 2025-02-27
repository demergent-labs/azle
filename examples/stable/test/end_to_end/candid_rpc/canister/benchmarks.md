# Benchmarks for canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | canisterNestedReturnType  | 6_506_869    | 3_192_747 | $0.0000042453 | $4.24             | <font color="green">-21_074</font> |
| 1   | canisterList              | 6_949_737    | 3_369_894 | $0.0000044808 | $4.48             | <font color="green">-38_375</font> |
| 2   | canisterCrossCanisterCall | 2_136_559    | 1_444_623 | $0.0000019209 | $1.92             | <font color="green">-15_253</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_527_943    | 3_201_177 | $0.0000042565 | $4.25             |
| 1   | canisterList              | 6_988_112    | 3_385_244 | $0.0000045013 | $4.50             |
| 2   | canisterCrossCanisterCall | 2_151_812    | 1_450_724 | $0.0000019290 | $1.92             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
