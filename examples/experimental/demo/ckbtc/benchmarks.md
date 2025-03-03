# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | 0           | 5_374_362    | 2_739_744 | $0.0000036430 | $3.64             | <font color="green">-4_401</font> |
| 1   | 0           | 5_322_293    | 2_718_917 | $0.0000036153 | $3.61             | <font color="green">-8_795</font> |
| 2   | 2           | 5_655_328    | 2_852_131 | $0.0000037924 | $3.79             | <font color="red">+2_656</font>   |
| 3   | 2           | 5_659_716    | 2_853_886 | $0.0000037947 | $3.79             | <font color="green">-2_222</font> |
| 4   | 1           | 5_655_783    | 2_852_313 | $0.0000037926 | $3.79             | <font color="green">-5_701</font> |
| 5   | 1           | 5_655_235    | 2_852_094 | $0.0000037923 | $3.79             | <font color="red">+9_749</font>   |
| 6   | 0           | 5_332_246    | 2_722_898 | $0.0000036206 | $3.62             | <font color="red">+5_306</font>   |
| 7   | 0           | 5_319_180    | 2_717_672 | $0.0000036136 | $3.61             | <font color="green">-3_686</font> |
| 8   | 3           | 13_752_348   | 6_090_939 | $0.0000080989 | $8.09             | <font color="red">+16_973</font>  |
| 9   | 0           | 5_331_560    | 2_722_624 | $0.0000036202 | $3.62             | <font color="red">+5_857</font>   |
| 10  | 0           | 5_329_810    | 2_721_924 | $0.0000036193 | $3.61             | <font color="red">+4_366</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_378_763    | 2_741_505 | $0.0000036453 | $3.64             |
| 1   | 0           | 5_331_088    | 2_722_435 | $0.0000036199 | $3.61             |
| 2   | 2           | 5_652_672    | 2_851_068 | $0.0000037910 | $3.79             |
| 3   | 2           | 5_661_938    | 2_854_775 | $0.0000037959 | $3.79             |
| 4   | 1           | 5_661_484    | 2_854_593 | $0.0000037957 | $3.79             |
| 5   | 1           | 5_645_486    | 2_848_194 | $0.0000037872 | $3.78             |
| 6   | 0           | 5_326_940    | 2_720_776 | $0.0000036177 | $3.61             |
| 7   | 0           | 5_322_866    | 2_719_146 | $0.0000036156 | $3.61             |
| 8   | 3           | 13_735_375   | 6_084_150 | $0.0000080899 | $8.08             |
| 9   | 0           | 5_325_703    | 2_720_281 | $0.0000036171 | $3.61             |
| 10  | 0           | 5_325_444    | 2_720_177 | $0.0000036169 | $3.61             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
