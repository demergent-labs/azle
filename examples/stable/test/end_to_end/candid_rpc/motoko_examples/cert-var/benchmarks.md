# Benchmarks for cert-var

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 2_072_835    | 1_419_134 | $0.0000018870 | $1.88             | <font color="green">-6_243</font> |
| 1   | inc         | 2_306_512    | 1_512_604 | $0.0000020113 | $2.01             | <font color="green">-3_448</font> |
| 2   | set         | 2_048_937    | 1_409_574 | $0.0000018743 | $1.87             | <font color="red">+436</font>     |
| 3   | inc         | 2_305_137    | 1_512_054 | $0.0000020105 | $2.01             | <font color="green">-3_403</font> |
| 4   | set         | 2_048_640    | 1_409_456 | $0.0000018741 | $1.87             | <font color="green">-3_629</font> |
| 5   | inc         | 2_308_378    | 1_513_351 | $0.0000020123 | $2.01             | <font color="green">-4_169</font> |
| 6   | set         | 2_047_337    | 1_408_934 | $0.0000018734 | $1.87             | <font color="red">+949</font>     |
| 7   | inc         | 2_310_084    | 1_514_033 | $0.0000020132 | $2.01             | <font color="red">+2_738</font>   |
| 8   | set         | 2_049_240    | 1_409_696 | $0.0000018744 | $1.87             | <font color="red">+1_021</font>   |
| 9   | inc         | 2_308_937    | 1_513_574 | $0.0000020126 | $2.01             | <font color="green">-997</font>   |
| 10  | set         | 2_047_686    | 1_409_074 | $0.0000018736 | $1.87             | <font color="green">-2_468</font> |
| 11  | inc         | 2_307_199    | 1_512_879 | $0.0000020116 | $2.01             | <font color="green">-2_022</font> |
| 12  | set         | 2_088_690    | 1_425_476 | $0.0000018954 | $1.89             | <font color="red">+41_932</font>  |

## Baseline benchmarks Azle version: 0.27.0

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
| 12  | set         | 2_046_758    | 1_408_703 | $0.0000018731 | $1.87             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
