# Benchmarks for caller

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectCodeCanisterThrowError | 1_293_512    | 6_293_512 | $0.0000086221 | $8.62             | <font color="green">-70_886</font> |
| 1   | getRejectCodeCanisterReject     | 1_223_291    | 6_223_291 | $0.0000085259 | $8.52             | <font color="green">-65_006</font> |
| 2   | getRejectNoError                | 1_219_429    | 6_219_429 | $0.0000085206 | $8.52             | <font color="green">-64_191</font> |
| 3   | assertTypes                     | 1_206_351    | 6_206_351 | $0.0000085027 | $8.50             | <font color="green">-65_546</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeCanisterThrowError | 1_364_398    | 6_364_398 | $0.0000087192 | $8.71             |
| 1   | getRejectCodeCanisterReject     | 1_288_297    | 6_288_297 | $0.0000086150 | $8.61             |
| 2   | getRejectNoError                | 1_283_620    | 6_283_620 | $0.0000086086 | $8.60             |
| 3   | assertTypes                     | 1_271_897    | 6_271_897 | $0.0000085925 | $8.59             |

# Benchmarks for rejector

## Current benchmarks Azle version: 0.33.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.32.0

No benchmarks reported

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
