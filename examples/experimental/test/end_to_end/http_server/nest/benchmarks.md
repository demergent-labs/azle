# Benchmarks for api

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_457_633_502 | 9_783_643_400 | $0.0130090171 | $13_009.01        | <font color="red">+610_654_983</font> |
| 1   | http_request_update | 44_586_060     | 18_424_424    | $0.0000244984 | $24.49            | <font color="red">+35_833</font>      |
| 2   | http_request_update | 44_427_688     | 18_361_075    | $0.0000244142 | $24.41            | <font color="red">+53_592</font>      |
| 3   | http_request_update | 43_576_700     | 18_020_680    | $0.0000239616 | $23.96            | <font color="red">+87_754</font>      |
| 4   | http_request_update | 53_264_764     | 21_895_905    | $0.0000291143 | $29.11            | <font color="red">+82_306</font>      |
| 5   | http_request_update | 45_119_387     | 18_637_754    | $0.0000247821 | $24.78            | <font color="red">+49_905</font>      |
| 6   | http_request_update | 45_031_776     | 18_602_710    | $0.0000247355 | $24.73            | <font color="red">+38_592</font>      |
| 7   | http_request_update | 44_252_417     | 18_290_966    | $0.0000243209 | $24.32            | <font color="red">+110_060</font>     |
| 8   | http_request_update | 47_505_215     | 19_592_086    | $0.0000260510 | $26.05            | <font color="red">+122_599</font>     |
| 9   | http_request_update | 44_959_269     | 18_573_707    | $0.0000246969 | $24.69            | <font color="red">+86_938</font>      |
| 10  | http_request_update | 44_852_206     | 18_530_882    | $0.0000246400 | $24.63            | <font color="red">+82_937</font>      |
| 11  | http_request_update | 44_052_476     | 18_210_990    | $0.0000242146 | $24.21            | <font color="red">+133_530</font>     |
| 12  | http_request_update | 47_291_559     | 19_506_623    | $0.0000259374 | $25.93            | <font color="red">+140_797</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_846_978_519 | 9_139_381_407 | $0.0121523613 | $12_152.36        |
| 1   | http_request_update | 44_550_227     | 18_410_090    | $0.0000244793 | $24.47            |
| 2   | http_request_update | 44_374_096     | 18_339_638    | $0.0000243857 | $24.38            |
| 3   | http_request_update | 43_488_946     | 17_985_578    | $0.0000239149 | $23.91            |
| 4   | http_request_update | 53_182_458     | 21_862_983    | $0.0000290706 | $29.07            |
| 5   | http_request_update | 45_069_482     | 18_617_792    | $0.0000247555 | $24.75            |
| 6   | http_request_update | 44_993_184     | 18_587_273    | $0.0000247149 | $24.71            |
| 7   | http_request_update | 44_142_357     | 18_246_942    | $0.0000242624 | $24.26            |
| 8   | http_request_update | 47_382_616     | 19_543_046    | $0.0000259858 | $25.98            |
| 9   | http_request_update | 44_872_331     | 18_538_932    | $0.0000246507 | $24.65            |
| 10  | http_request_update | 44_769_269     | 18_497_707    | $0.0000245958 | $24.59            |
| 11  | http_request_update | 43_918_946     | 18_157_578    | $0.0000241436 | $24.14            |
| 12  | http_request_update | 47_150_762     | 19_450_304    | $0.0000258625 | $25.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
