# Benchmarks for factorial

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | fac         | 1_332_814    | 1_123_125 | $0.0000014934 | $1.49             | <font color="red">+9</font>       |
| 1   | fac         | 1_315_836    | 1_116_334 | $0.0000014844 | $1.48             | <font color="red">+2_526</font>   |
| 2   | fac         | 1_798_335    | 1_309_334 | $0.0000017410 | $1.74             | <font color="red">+6_928</font>   |
| 3   | fac         | 3_093_047    | 1_827_218 | $0.0000024296 | $2.42             | <font color="red">+15_167</font>  |
| 4   | fac         | 5_708_459    | 2_873_383 | $0.0000038207 | $3.82             | <font color="green">-8_747</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_332_805    | 1_123_122 | $0.0000014934 | $1.49             |
| 1   | fac         | 1_313_310    | 1_115_324 | $0.0000014830 | $1.48             |
| 2   | fac         | 1_791_407    | 1_306_562 | $0.0000017373 | $1.73             |
| 3   | fac         | 3_077_880    | 1_821_152 | $0.0000024215 | $2.42             |
| 4   | fac         | 5_717_206    | 2_876_882 | $0.0000038253 | $3.82             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
