⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for rejections

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                                |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getRejectCodeNoError            | 1_395_770    | 1_148_308 | $0.0000015269 | $1.52             | <font color="green">-8_843_261</font> |
| 1   | getRejectCodeDestinationInvalid | 1_341_527    | 1_126_610 | $0.0000014980 | $1.49             | <font color="green">-8_055_705</font> |
| 2   | getRejectCodeCanisterReject     | 2_232_397    | 1_482_958 | $0.0000019718 | $1.97             | <font color="green">-8_329_928</font> |
| 3   | getRejectCodeCanisterError      | 1_349_665    | 1_129_866 | $0.0000015023 | $1.50             | <font color="green">-8_715_626</font> |
| 4   | getRejectMessage                | 2_927_694    | 1_761_077 | $0.0000023417 | $2.34             | <font color="green">-8_340_712</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 10_239_031   | 4_685_612 | $0.0000062303 | $6.23             |
| 1   | getRejectCodeDestinationInvalid | 9_397_232    | 4_348_892 | $0.0000057826 | $5.78             |
| 2   | getRejectCodeCanisterReject     | 10_562_325   | 4_814_930 | $0.0000064023 | $6.40             |
| 3   | getRejectCodeCanisterError      | 10_065_291   | 4_616_116 | $0.0000061379 | $6.13             |
| 4   | getRejectMessage                | 11_268_406   | 5_097_362 | $0.0000067778 | $6.77             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.30.0

No benchmarks reported

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
