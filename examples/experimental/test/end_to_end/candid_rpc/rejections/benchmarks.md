# Benchmarks for rejections

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRejectCodeNoError            | 10_222_514   | 4_679_005 | $0.0000062215 | $6.22             | <font color="red">+8_826_744</font> |
| 1   | getRejectCodeDestinationInvalid | 9_389_185    | 4_345_674 | $0.0000057783 | $5.77             | <font color="red">+8_047_658</font> |
| 2   | getRejectCodeCanisterReject     | 10_578_729   | 4_821_491 | $0.0000064110 | $6.41             | <font color="red">+8_346_332</font> |
| 3   | getRejectCodeCanisterError      | 10_064_542   | 4_615_816 | $0.0000061375 | $6.13             | <font color="red">+8_714_877</font> |
| 4   | getRejectMessage                | 11_263_900   | 5_095_560 | $0.0000067754 | $6.77             | <font color="red">+8_336_206</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_395_770    | 1_148_308 | $0.0000015269 | $1.52             |
| 1   | getRejectCodeDestinationInvalid | 1_341_527    | 1_126_610 | $0.0000014980 | $1.49             |
| 2   | getRejectCodeCanisterReject     | 2_232_397    | 1_482_958 | $0.0000019718 | $1.97             |
| 3   | getRejectCodeCanisterError      | 1_349_665    | 1_129_866 | $0.0000015023 | $1.50             |
| 4   | getRejectMessage                | 2_927_694    | 1_761_077 | $0.0000023417 | $2.34             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.31.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

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
