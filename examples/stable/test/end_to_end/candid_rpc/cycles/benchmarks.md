# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveCycles | 1_512_270    | 1_194_908 | $0.0000015888 | $1.58             | <font color="green">-4_664</font> |
| 1   | receiveCycles | 1_530_887    | 1_202_354 | $0.0000015987 | $1.59             | <font color="red">+11_095</font>  |
| 2   | receiveCycles | 1_530_932    | 1_202_372 | $0.0000015988 | $1.59             | <font color="red">+8_551</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_516_934    | 1_196_773 | $0.0000015913 | $1.59             |
| 1   | receiveCycles | 1_519_792    | 1_197_916 | $0.0000015928 | $1.59             |
| 2   | receiveCycles | 1_522_381    | 1_198_952 | $0.0000015942 | $1.59             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendCycles       | 1_686_867    | 1_264_746 | $0.0000016817 | $1.68             | <font color="green">-19_844</font> |
| 1   | sendCyclesNotify | 2_017_271    | 1_396_908 | $0.0000018574 | $1.85             | <font color="green">-7_012</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_706_711    | 1_272_684 | $0.0000016922 | $1.69             |
| 1   | sendCyclesNotify | 2_024_283    | 1_399_713 | $0.0000018612 | $1.86             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
