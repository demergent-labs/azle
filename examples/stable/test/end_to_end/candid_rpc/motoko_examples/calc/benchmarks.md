# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | add         | 1_366_502    | 1_136_600 | $0.0000015113 | $1.51             | <font color="red">+75_008</font> |
| 1   | sub         | 1_334_037    | 1_123_614 | $0.0000014940 | $1.49             | <font color="red">+74_054</font> |
| 2   | mul         | 1_333_794    | 1_123_517 | $0.0000014939 | $1.49             | <font color="red">+74_450</font> |
| 3   | div         | 1_682_763    | 1_263_105 | $0.0000016795 | $1.67             | <font color="red">+95_968</font> |
| 4   | clearall    | 955_999      | 972_399   | $0.0000012930 | $1.29             | <font color="red">+53_794</font> |
| 5   | add         | 1_332_880    | 1_123_152 | $0.0000014934 | $1.49             | <font color="red">+76_563</font> |

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
