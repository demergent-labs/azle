# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | add         | 1_263_633    | 1_095_453 | $0.0000014566 | $1.45             | <font color="green">-11_359</font> |
| 1   | sub         | 1_251_130    | 1_090_452 | $0.0000014499 | $1.44             | <font color="green">-2_788</font>  |
| 2   | mul         | 1_251_423    | 1_090_569 | $0.0000014501 | $1.45             | <font color="green">-779</font>    |
| 3   | div         | 1_609_771    | 1_233_908 | $0.0000016407 | $1.64             | <font color="green">-4_311</font>  |
| 4   | clearall    | 847_716      | 929_086   | $0.0000012354 | $1.23             | <font color="green">-1_872</font>  |
| 5   | add         | 1_248_755    | 1_089_502 | $0.0000014487 | $1.44             | <font color="green">-3_979</font>  |

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
