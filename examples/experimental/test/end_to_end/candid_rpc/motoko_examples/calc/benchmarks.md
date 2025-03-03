# Benchmarks for calc

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | add         | 1_275_491    | 1_100_196 | $0.0000014629 | $1.46             | <font color="red">+405</font>   |
| 1   | sub         | 1_252_203    | 1_090_881 | $0.0000014505 | $1.45             | <font color="green">-254</font> |
| 2   | mul         | 1_251_733    | 1_090_693 | $0.0000014503 | $1.45             | <font color="red">+769</font>   |
| 3   | div         | 1_618_358    | 1_237_343 | $0.0000016453 | $1.64             | <font color="red">+1_403</font> |
| 4   | clearall    | 853_576      | 931_430   | $0.0000012385 | $1.23             | <font color="green">-936</font> |
| 5   | add         | 1_249_229    | 1_089_691 | $0.0000014489 | $1.44             | <font color="green">-854</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_275_086    | 1_100_034 | $0.0000014627 | $1.46             |
| 1   | sub         | 1_252_457    | 1_090_982 | $0.0000014506 | $1.45             |
| 2   | mul         | 1_250_964    | 1_090_385 | $0.0000014499 | $1.44             |
| 3   | div         | 1_616_955    | 1_236_782 | $0.0000016445 | $1.64             |
| 4   | clearall    | 854_512      | 931_804   | $0.0000012390 | $1.23             |
| 5   | add         | 1_250_083    | 1_090_033 | $0.0000014494 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
