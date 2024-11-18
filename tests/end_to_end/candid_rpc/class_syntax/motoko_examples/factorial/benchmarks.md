# Benchmarks for factorial

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | fac         | 1_271_031    | 1_098_412 | $0.0000014605 | $1.46             | <font color="red">+31_882</font> |
| 1   | fac         | 1_263_832    | 1_095_532 | $0.0000014567 | $1.45             | <font color="red">+48_683</font> |
| 2   | fac         | 1_732_199    | 1_282_879 | $0.0000017058 | $1.70             | <font color="red">+61_834</font> |
| 3   | fac         | 2_983_509    | 1_783_403 | $0.0000023713 | $2.37             | <font color="red">+71_610</font> |
| 4   | fac         | 5_525_486    | 2_800_194 | $0.0000037233 | $3.72             | <font color="red">+76_851</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_239_149    | 1_085_659 | $0.0000014436 | $1.44             |
| 1   | fac         | 1_215_149    | 1_076_059 | $0.0000014308 | $1.43             |
| 2   | fac         | 1_670_365    | 1_258_146 | $0.0000016729 | $1.67             |
| 3   | fac         | 2_911_899    | 1_754_759 | $0.0000023333 | $2.33             |
| 4   | fac         | 5_448_635    | 2_769_454 | $0.0000036825 | $3.68             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
