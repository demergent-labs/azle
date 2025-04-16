# Benchmarks for calc

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | add         | 1_274_092    | 1_099_636 | $0.0000014622 | $1.46             | <font color="red">+754</font>   |
| 1   | sub         | 1_250_865    | 1_090_346 | $0.0000014498 | $1.44             | <font color="red">+1_117</font> |
| 2   | mul         | 1_250_395    | 1_090_158 | $0.0000014496 | $1.44             | <font color="red">+1_117</font> |
| 3   | div         | 1_613_392    | 1_235_356 | $0.0000016426 | $1.64             | <font color="green">-847</font> |
| 4   | clearall    | 852_942      | 931_176   | $0.0000012382 | $1.23             | <font color="green">-296</font> |
| 5   | add         | 1_248_890    | 1_089_556 | $0.0000014487 | $1.44             | <font color="green">-324</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_273_338    | 1_099_335 | $0.0000014618 | $1.46             |
| 1   | sub         | 1_249_748    | 1_089_899 | $0.0000014492 | $1.44             |
| 2   | mul         | 1_249_278    | 1_089_711 | $0.0000014490 | $1.44             |
| 3   | div         | 1_614_239    | 1_235_695 | $0.0000016431 | $1.64             |
| 4   | clearall    | 853_238      | 931_295   | $0.0000012383 | $1.23             |
| 5   | add         | 1_249_214    | 1_089_685 | $0.0000014489 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
