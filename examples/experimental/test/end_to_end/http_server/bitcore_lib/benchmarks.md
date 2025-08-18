# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 1_100_009_208 | 1_105_009_208 | $0.0015138626 | $1_513.86 | <font color="green">-7_626_112_200</font> |
| 1 | 1 | 11_556_745_903 | 11_561_745_903 | $0.0158395919 | $15_839.59 | <font color="red">+10_450_518_739</font> |
| 2 | 1 | 18_595_870_529 | 18_600_870_529 | $0.0254831926 | $25_483.19 | <font color="red">+11_971_890_327</font> |
| 3 | 1 | 17_323_982_609 | 17_328_982_609 | $0.0237407062 | $23_740.70 | <font color="green">-1_599_734_508</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 8_726_121_408 | 8_731_121_408 | $0.0119616363 | $11_961.63 |
| 1 | http_request_update | 1_106_227_164 | 1_111_227_164 | $0.0015223812 | $1_522.38 |
| 2 | http_request_update | 6_623_980_202 | 6_628_980_202 | $0.0090817029 | $9_081.70 |
| 3 | http_request_update | 18_923_717_117 | 18_928_717_117 | $0.0259323425 | $25_932.34 |
| 4 | http_request_update | 17_425_957_891 | 17_430_957_891 | $0.0238804123 | $23_880.41 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).