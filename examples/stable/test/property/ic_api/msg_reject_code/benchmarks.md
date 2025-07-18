# Benchmarks for caller

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectCodeCanisterThrowError | 1_364_398    | 1_135_759 | $0.0000015102 | $1.51             | <font color="green">-66_502</font> |
| 1   | getRejectCodeCanisterReject     | 1_288_297    | 1_105_318 | $0.0000014697 | $1.46             | <font color="green">-74_089</font> |
| 2   | getRejectNoError                | 1_283_620    | 1_103_448 | $0.0000014672 | $1.46             | <font color="green">-73_448</font> |
| 3   | assertTypes                     | 1_271_897    | 1_098_758 | $0.0000014610 | $1.46             | <font color="green">-75_409</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeCanisterThrowError | 1_430_900    | 1_162_360 | $0.0000015456 | $1.54             |
| 1   | getRejectCodeCanisterReject     | 1_362_386    | 1_134_954 | $0.0000015091 | $1.50             |
| 2   | getRejectNoError                | 1_357_068    | 1_132_827 | $0.0000015063 | $1.50             |
| 3   | assertTypes                     | 1_347_306    | 1_128_922 | $0.0000015011 | $1.50             |

# Benchmarks for rejector

## Current benchmarks Azle version: 0.32.0

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
