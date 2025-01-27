# Benchmarks for factorial

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | fac         | 1_336_848    | 1_124_739 | $0.0000014955 | $1.49             | <font color="red">+65_660</font>  |
| 1   | fac         | 1_331_808    | 1_122_723 | $0.0000014929 | $1.49             | <font color="red">+67_819</font>  |
| 2   | fac         | 1_820_479    | 1_318_191 | $0.0000017528 | $1.75             | <font color="red">+88_123</font>  |
| 3   | fac         | 3_115_145    | 1_836_058 | $0.0000024414 | $2.44             | <font color="red">+131_479</font> |
| 4   | fac         | 5_752_293    | 2_890_917 | $0.0000038440 | $3.84             | <font color="red">+226_650</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_271_188    | 1_098_475 | $0.0000014606 | $1.46             |
| 1   | fac         | 1_263_989    | 1_095_595 | $0.0000014568 | $1.45             |
| 2   | fac         | 1_732_356    | 1_282_942 | $0.0000017059 | $1.70             |
| 3   | fac         | 2_983_666    | 1_783_466 | $0.0000023714 | $2.37             |
| 4   | fac         | 5_525_643    | 2_800_257 | $0.0000037234 | $3.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
