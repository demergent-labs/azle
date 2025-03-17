⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | 0           | 5_429_095    | 2_761_638 | $0.0000036721 | $3.67             | <font color="red">+43_849</font> |
| 1   | 0           | 5_379_625    | 2_741_850 | $0.0000036458 | $3.64             | <font color="red">+50_202</font> |
| 2   | 2           | 5_714_310    | 2_875_724 | $0.0000038238 | $3.82             | <font color="red">+49_660</font> |
| 3   | 2           | 5_709_440    | 2_873_776 | $0.0000038212 | $3.82             | <font color="red">+44_135</font> |
| 4   | 1           | 5_709_271    | 2_873_708 | $0.0000038211 | $3.82             | <font color="red">+53_691</font> |
| 5   | 1           | 5_702_601    | 2_871_040 | $0.0000038175 | $3.81             | <font color="red">+56_110</font> |
| 6   | 0           | 5_374_133    | 2_739_653 | $0.0000036428 | $3.64             | <font color="red">+44_597</font> |
| 7   | 0           | 5_366_560    | 2_736_624 | $0.0000036388 | $3.63             | <font color="red">+40_864</font> |
| 8   | 3           | 13_793_965   | 6_107_586 | $0.0000081211 | $8.12             | <font color="red">+49_413</font> |
| 9   | 0           | 5_375_821    | 2_740_328 | $0.0000036437 | $3.64             | <font color="red">+57_897</font> |
| 10  | 0           | 5_385_033    | 2_744_013 | $0.0000036486 | $3.64             | <font color="red">+64_087</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_385_246    | 2_744_098 | $0.0000036487 | $3.64             |
| 1   | 0           | 5_329_423    | 2_721_769 | $0.0000036191 | $3.61             |
| 2   | 2           | 5_664_650    | 2_855_860 | $0.0000037974 | $3.79             |
| 3   | 2           | 5_665_305    | 2_856_122 | $0.0000037977 | $3.79             |
| 4   | 1           | 5_655_580    | 2_852_232 | $0.0000037925 | $3.79             |
| 5   | 1           | 5_646_491    | 2_848_596 | $0.0000037877 | $3.78             |
| 6   | 0           | 5_329_536    | 2_721_814 | $0.0000036191 | $3.61             |
| 7   | 0           | 5_325_696    | 2_720_278 | $0.0000036171 | $3.61             |
| 8   | 3           | 13_744_552   | 6_087_820 | $0.0000080948 | $8.09             |
| 9   | 0           | 5_317_924    | 2_717_169 | $0.0000036129 | $3.61             |
| 10  | 0           | 5_320_946    | 2_718_378 | $0.0000036145 | $3.61             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
