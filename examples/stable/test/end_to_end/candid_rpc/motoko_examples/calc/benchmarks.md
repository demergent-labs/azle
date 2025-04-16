# Benchmarks for calc

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add         | 1_358_564    | 1_133_425 | $0.0000015071 | $1.50             | <font color="green">-845</font>   |
| 1   | sub         | 1_313_205    | 1_115_282 | $0.0000014830 | $1.48             | <font color="green">-3_456</font> |
| 2   | mul         | 1_311_185    | 1_114_474 | $0.0000014819 | $1.48             | <font color="green">-6_189</font> |
| 3   | div         | 1_659_008    | 1_253_603 | $0.0000016669 | $1.66             | <font color="green">-3_333</font> |
| 4   | clearall    | 938_988      | 965_595   | $0.0000012839 | $1.28             | <font color="green">-2_123</font> |
| 5   | add         | 1_310_221    | 1_114_088 | $0.0000014814 | $1.48             | <font color="green">-1_735</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_359_409    | 1_133_763 | $0.0000015075 | $1.50             |
| 1   | sub         | 1_316_661    | 1_116_664 | $0.0000014848 | $1.48             |
| 2   | mul         | 1_317_374    | 1_116_949 | $0.0000014852 | $1.48             |
| 3   | div         | 1_662_341    | 1_254_936 | $0.0000016687 | $1.66             |
| 4   | clearall    | 941_111      | 966_444   | $0.0000012851 | $1.28             |
| 5   | add         | 1_311_956    | 1_114_782 | $0.0000014823 | $1.48             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
