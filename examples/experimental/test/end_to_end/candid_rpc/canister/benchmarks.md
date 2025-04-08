# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | canisterNestedReturnType  | 6_901_341    | 3_350_536 | $0.0000044551 | $4.45             | <font color="green">-1_773</font> |
| 1   | canisterList              | 8_002_864    | 3_791_145 | $0.0000050410 | $5.04             | <font color="red">+24_515</font>  |
| 2   | canisterCrossCanisterCall | 11_971_748   | 5_378_699 | $0.0000071519 | $7.15             | <font color="red">+10_974</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | canisterNestedReturnType  | 6_903_114    | 3_351_245 | $0.0000044560 | $4.45             |
| 1   | canisterList              | 7_978_349    | 3_781_339 | $0.0000050279 | $5.02             |
| 2   | canisterCrossCanisterCall | 11_960_774   | 5_374_309 | $0.0000071461 | $7.14             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | update1     | 1_483_739    | 1_183_495 | $0.0000015737 | $1.57             |

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
