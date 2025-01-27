# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_266_613    | 1_096_645 | $0.0000014582 | $1.45             | <font color="green">-8_379</font> |
| 1   | sub         | 1_251_345    | 1_090_538 | $0.0000014501 | $1.45             | <font color="green">-2_573</font> |
| 2   | mul         | 1_250_182    | 1_090_072 | $0.0000014494 | $1.44             | <font color="green">-2_020</font> |
| 3   | div         | 1_611_290    | 1_234_516 | $0.0000016415 | $1.64             | <font color="green">-2_792</font> |
| 4   | clearall    | 851_562      | 930_624   | $0.0000012374 | $1.23             | <font color="red">+1_974</font>   |
| 5   | add         | 1_249_129    | 1_089_651 | $0.0000014489 | $1.44             | <font color="green">-3_605</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_274_992    | 1_099_996 | $0.0000014626 | $1.46             |
| 1   | sub         | 1_253_918    | 1_091_567 | $0.0000014514 | $1.45             |
| 2   | mul         | 1_252_202    | 1_090_880 | $0.0000014505 | $1.45             |
| 3   | div         | 1_614_082    | 1_235_632 | $0.0000016430 | $1.64             |
| 4   | clearall    | 849_588      | 929_835   | $0.0000012364 | $1.23             |
| 5   | add         | 1_252_734    | 1_091_093 | $0.0000014508 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
