# Benchmarks for calc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_272_747    | 1_099_098 | $0.0000014614 | $1.46             | <font color="green">-2_944</font> |
| 1   | sub         | 1_248_557    | 1_089_422 | $0.0000014486 | $1.44             | <font color="green">-5_530</font> |
| 2   | mul         | 1_248_087    | 1_089_234 | $0.0000014483 | $1.44             | <font color="green">-5_530</font> |
| 3   | div         | 1_608_894    | 1_233_557 | $0.0000016402 | $1.64             | <font color="green">-4_650</font> |
| 4   | clearall    | 853_323      | 931_329   | $0.0000012384 | $1.23             | <font color="green">-1_664</font> |
| 5   | add         | 1_247_564    | 1_089_025 | $0.0000014480 | $1.44             | <font color="green">-6_294</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_275_691    | 1_100_276 | $0.0000014630 | $1.46             |
| 1   | sub         | 1_254_087    | 1_091_634 | $0.0000014515 | $1.45             |
| 2   | mul         | 1_253_617    | 1_091_446 | $0.0000014513 | $1.45             |
| 3   | div         | 1_613_544    | 1_235_417 | $0.0000016427 | $1.64             |
| 4   | clearall    | 854_987      | 931_994   | $0.0000012392 | $1.23             |
| 5   | add         | 1_253_858    | 1_091_543 | $0.0000014514 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
