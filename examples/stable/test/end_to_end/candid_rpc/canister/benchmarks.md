⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | canisterNestedReturnType  | 6_496_323    | 3_188_529 | $0.0000042397 | $4.23             | <font color="green">-3_660</font>  |
| 1   | canisterList              | 6_973_253    | 3_379_301 | $0.0000044934 | $4.49             | <font color="red">+13_685</font>   |
| 2   | canisterCrossCanisterCall | 2_129_710    | 1_441_884 | $0.0000019172 | $1.91             | <font color="green">-58_439</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_499_983    | 3_189_993 | $0.0000042416 | $4.24             |
| 1   | canisterList              | 6_959_568    | 3_373_827 | $0.0000044861 | $4.48             |
| 2   | canisterCrossCanisterCall | 2_188_149    | 1_465_259 | $0.0000019483 | $1.94             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | update1     | 1_626_168    | 1_240_467 | $0.0000016494 | $1.64             | <font color="green">-6_268</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | update1     | 1_632_436    | 1_242_974 | $0.0000016527 | $1.65             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
