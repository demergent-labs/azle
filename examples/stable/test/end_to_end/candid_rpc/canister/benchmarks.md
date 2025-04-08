# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | canisterNestedReturnType  | 6_501_056    | 3_190_422 | $0.0000042422 | $4.24             | <font color="green">-5_813</font> |
| 1   | canisterList              | 6_956_451    | 3_372_580 | $0.0000044844 | $4.48             | <font color="red">+6_714</font>   |
| 2   | canisterCrossCanisterCall | 2_190_532    | 1_466_212 | $0.0000019496 | $1.94             | <font color="red">+53_938</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_506_869    | 3_192_747 | $0.0000042453 | $4.24             |
| 1   | canisterList              | 6_949_737    | 3_369_894 | $0.0000044808 | $4.48             |
| 2   | canisterCrossCanisterCall | 2_136_594    | 1_444_637 | $0.0000019209 | $1.92             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | update1     | 1_626_995    | 1_240_798 | $0.0000016499 | $1.64             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
