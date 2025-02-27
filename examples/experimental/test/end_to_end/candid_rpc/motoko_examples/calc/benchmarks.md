# Benchmarks for calc

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_275_086    | 1_100_034 | $0.0000014627 | $1.46             | <font color="green">-1_370</font> |
| 1   | sub         | 1_252_457    | 1_090_982 | $0.0000014506 | $1.45             | <font color="green">-3_438</font> |
| 2   | mul         | 1_250_964    | 1_090_385 | $0.0000014499 | $1.44             | <font color="green">-4_495</font> |
| 3   | div         | 1_616_955    | 1_236_782 | $0.0000016445 | $1.64             | <font color="green">-4_170</font> |
| 4   | clearall    | 854_512      | 931_804   | $0.0000012390 | $1.23             | <font color="green">-1_089</font> |
| 5   | add         | 1_250_083    | 1_090_033 | $0.0000014494 | $1.44             | <font color="green">-1_967</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_276_456    | 1_100_582 | $0.0000014634 | $1.46             |
| 1   | sub         | 1_255_895    | 1_092_358 | $0.0000014525 | $1.45             |
| 2   | mul         | 1_255_459    | 1_092_183 | $0.0000014522 | $1.45             |
| 3   | div         | 1_621_125    | 1_238_450 | $0.0000016467 | $1.64             |
| 4   | clearall    | 855_601      | 932_240   | $0.0000012396 | $1.23             |
| 5   | add         | 1_252_050    | 1_090_820 | $0.0000014504 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
