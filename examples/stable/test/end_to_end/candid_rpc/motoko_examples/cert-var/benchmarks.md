# Benchmarks for cert-var

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 2_077_207    | 1_420_882 | $0.0000018893 | $1.88             | <font color="green">-1_871</font> |
| 1   | inc         | 2_309_713    | 1_513_885 | $0.0000020130 | $2.01             | <font color="green">-247</font>   |
| 2   | set         | 2_049_267    | 1_409_706 | $0.0000018744 | $1.87             | <font color="red">+766</font>     |
| 3   | inc         | 2_309_512    | 1_513_804 | $0.0000020129 | $2.01             | <font color="red">+972</font>     |
| 4   | set         | 2_046_177    | 1_408_470 | $0.0000018728 | $1.87             | <font color="green">-6_092</font> |
| 5   | inc         | 2_309_723    | 1_513_889 | $0.0000020130 | $2.01             | <font color="green">-2_824</font> |
| 6   | set         | 2_048_837    | 1_409_534 | $0.0000018742 | $1.87             | <font color="red">+2_449</font>   |
| 7   | inc         | 2_311_185    | 1_514_474 | $0.0000020138 | $2.01             | <font color="red">+3_839</font>   |
| 8   | set         | 2_045_683    | 1_408_273 | $0.0000018725 | $1.87             | <font color="green">-2_536</font> |
| 9   | inc         | 2_308_085    | 1_513_234 | $0.0000020121 | $2.01             | <font color="green">-1_849</font> |
| 10  | set         | 2_052_004    | 1_410_801 | $0.0000018759 | $1.87             | <font color="red">+1_850</font>   |
| 11  | inc         | 2_307_075    | 1_512_830 | $0.0000020116 | $2.01             | <font color="green">-2_146</font> |
| 12  | set         | 2_091_679    | 1_426_671 | $0.0000018970 | $1.89             | <font color="red">+901</font>     |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_079_078    | 1_421_631 | $0.0000018903 | $1.89             |
| 1   | inc         | 2_309_960    | 1_513_984 | $0.0000020131 | $2.01             |
| 2   | set         | 2_048_501    | 1_409_400 | $0.0000018740 | $1.87             |
| 3   | inc         | 2_308_540    | 1_513_416 | $0.0000020123 | $2.01             |
| 4   | set         | 2_052_269    | 1_410_907 | $0.0000018760 | $1.87             |
| 5   | inc         | 2_312_547    | 1_515_018 | $0.0000020145 | $2.01             |
| 6   | set         | 2_046_388    | 1_408_555 | $0.0000018729 | $1.87             |
| 7   | inc         | 2_307_346    | 1_512_938 | $0.0000020117 | $2.01             |
| 8   | set         | 2_048_219    | 1_409_287 | $0.0000018739 | $1.87             |
| 9   | inc         | 2_309_934    | 1_513_973 | $0.0000020131 | $2.01             |
| 10  | set         | 2_050_154    | 1_410_061 | $0.0000018749 | $1.87             |
| 11  | inc         | 2_309_221    | 1_513_688 | $0.0000020127 | $2.01             |
| 12  | set         | 2_090_778    | 1_426_311 | $0.0000018965 | $1.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
