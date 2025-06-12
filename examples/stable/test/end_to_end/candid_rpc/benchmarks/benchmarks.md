# Benchmarks for benchmarks

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name   | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | blobInitStack | 1_174_071      | 1_059_628      | $0.0000014090 | $1.40             |
| 1   | blobInitStack | 1_345_650      | 1_128_260      | $0.0000015002 | $1.50             |
| 2   | blobInitStack | 3_541_042      | 2_006_416      | $0.0000026679 | $2.66             |
| 3   | blobInitStack | 25_374_823     | 10_739_929     | $0.0000142806 | $14.28            |
| 4   | blobInitStack | 249_970_448    | 100_578_179    | $0.0001337358 | $133.73           |
| 5   | blobInitStack | 2_429_557_560  | 1_772_413_024  | $0.0023567244 | $2_356.72         |
| 6   | blobInitStack | 24_335_621_420 | 19_334_838_568 | $0.0257089548 | $25_708.95        |
| 7   | blobInitHeap  | 1_135_998      | 1_044_399      | $0.0000013887 | $1.38             |
| 8   | blobInitHeap  | 1_370_444      | 1_138_177      | $0.0000015134 | $1.51             |
| 9   | blobInitHeap  | 3_746_280      | 2_088_512      | $0.0000027770 | $2.77             |
| 10  | blobInitHeap  | 27_321_234     | 11_518_493     | $0.0000153158 | $15.31            |
| 11  | blobInitHeap  | 292_982_446    | 117_782_978    | $0.0001566125 | $156.61           |
| 12  | blobInitHeap  | 2_806_564_752  | 1_923_215_900  | $0.0025572425 | $2_557.24         |
| 13  | blobInitHeap  | 28_107_311_198 | 22_443_514_479 | $0.0298424679 | $29_842.46        |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
