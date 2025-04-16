# Benchmarks for cycles

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveCycles | 1_142_258    | 1_046_903 | $0.0000013920 | $1.39             | <font color="green">-1_840</font> |
| 1   | receiveCycles | 1_226_166    | 1_080_466 | $0.0000014367 | $1.43             | <font color="green">-2_912</font> |
| 2   | receiveCycles | 1_227_428    | 1_080_971 | $0.0000014373 | $1.43             | <font color="green">-2_422</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_144_098    | 1_047_639 | $0.0000013930 | $1.39             |
| 1   | receiveCycles | 1_229_078    | 1_081_631 | $0.0000014382 | $1.43             |
| 2   | receiveCycles | 1_229_850    | 1_081_940 | $0.0000014386 | $1.43             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | sendCycles       | 10_561_096   | 4_814_438 | $0.0000064016 | $6.40             | <font color="red">+9_160_413</font> |
| 1   | sendCyclesNotify | 1_718_275    | 1_277_310 | $0.0000016984 | $1.69             | <font color="green">-1_668</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_400_683    | 1_150_273 | $0.0000015295 | $1.52             |
| 1   | sendCyclesNotify | 1_719_943    | 1_277_977 | $0.0000016993 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
