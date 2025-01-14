# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | add         | 1_365_522    | 1_136_208 | $0.0000015108 | $1.51             | <font color="red">+74_028</font> |
| 1   | sub         | 1_331_925    | 1_122_770 | $0.0000014929 | $1.49             | <font color="red">+71_942</font> |
| 2   | mul         | 1_331_430    | 1_122_572 | $0.0000014927 | $1.49             | <font color="red">+72_086</font> |
| 3   | div         | 1_684_801    | 1_263_920 | $0.0000016806 | $1.68             | <font color="red">+98_006</font> |
| 4   | clearall    | 955_944      | 972_377   | $0.0000012929 | $1.29             | <font color="red">+53_739</font> |
| 5   | add         | 1_328_094    | 1_121_237 | $0.0000014909 | $1.49             | <font color="red">+71_777</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_291_494    | 1_106_597 | $0.0000014714 | $1.47             |
| 1   | sub         | 1_259_983    | 1_093_993 | $0.0000014546 | $1.45             |
| 2   | mul         | 1_259_344    | 1_093_737 | $0.0000014543 | $1.45             |
| 3   | div         | 1_586_795    | 1_224_718 | $0.0000016285 | $1.62             |
| 4   | clearall    | 902_205      | 950_882   | $0.0000012644 | $1.26             |
| 5   | add         | 1_256_317    | 1_092_526 | $0.0000014527 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
