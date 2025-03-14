⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for calc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_273_338    | 1_099_335 | $0.0000014618 | $1.46             | <font color="green">-2_353</font> |
| 1   | sub         | 1_249_748    | 1_089_899 | $0.0000014492 | $1.44             | <font color="green">-4_339</font> |
| 2   | mul         | 1_249_278    | 1_089_711 | $0.0000014490 | $1.44             | <font color="green">-4_339</font> |
| 3   | div         | 1_614_239    | 1_235_695 | $0.0000016431 | $1.64             | <font color="red">+695</font>     |
| 4   | clearall    | 853_238      | 931_295   | $0.0000012383 | $1.23             | <font color="green">-1_749</font> |
| 5   | add         | 1_249_214    | 1_089_685 | $0.0000014489 | $1.44             | <font color="green">-4_644</font> |

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
