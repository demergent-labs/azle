# Benchmarks for management_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | executeCreateCanister     | 165_712_815  | 66_875_126 | $0.0000889218 | $88.92            | <font color="red">+11_999_697</font> |
| 1   | executeUpdateSettings     | 167_061_189  | 67_414_475 | $0.0000896390 | $89.63            | <font color="red">+12_083_212</font> |
| 2   | getCanisterStatus         | 154_228_151  | 62_281_260 | $0.0000828135 | $82.81            | <font color="red">+11_169_479</font> |
| 3   | executeInstallCode        | 179_517_875  | 72_397_150 | $0.0000962643 | $96.26            | <font color="red">+11_130_569</font> |
| 4   | executeUninstallCode      | 154_713_501  | 62_475_400 | $0.0000830717 | $83.07            | <font color="red">+11_090_524</font> |
| 5   | getCanisterStatus         | 154_144_422  | 62_247_768 | $0.0000827690 | $82.76            | <font color="red">+11_113_748</font> |
| 6   | executeUploadChunk        | 168_801_431  | 68_110_572 | $0.0000905646 | $90.56            | <font color="red">+11_032_834</font> |
| 7   | getStoredChunks           | 153_253_258  | 61_891_303 | $0.0000822950 | $82.29            | <font color="red">+11_005_007</font> |
| 8   | getStoredChunks           | 153_352_156  | 61_930_862 | $0.0000823476 | $82.34            | <font color="red">+11_066_324</font> |
| 9   | executeInstallChunkedCode | 171_270_877  | 69_098_350 | $0.0000918780 | $91.87            | <font color="red">+10_918_223</font> |
| 10  | executeUninstallCode      | 154_685_792  | 62_464_316 | $0.0000830569 | $83.05            | <font color="red">+10_932_294</font> |
| 11  | executeClearChunkStore    | 153_735_328  | 62_084_131 | $0.0000825514 | $82.55            | <font color="red">+11_112_301</font> |
| 12  | getStoredChunks           | 153_224_184  | 61_879_673 | $0.0000822795 | $82.27            | <font color="red">+10_903_652</font> |
| 13  | getCanisterStatus         | 154_127_208  | 62_240_883 | $0.0000827598 | $82.75            | <font color="red">+10_890_052</font> |
| 14  | executeDepositCycles      | 153_294_176  | 61_907_670 | $0.0000823168 | $82.31            | <font color="red">+11_003_362</font> |
| 15  | getCanisterStatus         | 154_142_817  | 62_247_126 | $0.0000827681 | $82.76            | <font color="red">+10_872_647</font> |
| 16  | executeUninstallCode      | 154_733_790  | 62_483_516 | $0.0000830825 | $83.08            | <font color="red">+11_018_074</font> |
| 17  | getCanisterStatus         | 154_128_220  | 62_241_288 | $0.0000827604 | $82.76            | <font color="red">+10_920_611</font> |
| 18  | executeStopCanister       | 153_314_557  | 61_915_822 | $0.0000823276 | $82.32            | <font color="red">+11_040_803</font> |
| 19  | getCanisterStatus         | 154_158_225  | 62_253_290 | $0.0000827763 | $82.77            | <font color="red">+10_886_071</font> |
| 20  | getCanisterStatus         | 154_268_481  | 62_297_392 | $0.0000828350 | $82.83            | <font color="red">+11_024_063</font> |
| 21  | executeStartCanister      | 153_447_259  | 61_968_903 | $0.0000823982 | $82.39            | <font color="red">+11_010_600</font> |
| 22  | getCanisterStatus         | 154_047_694  | 62_209_077 | $0.0000827175 | $82.71            | <font color="red">+10_694_350</font> |
| 23  | getCanisterStatus         | 154_169_115  | 62_257_646 | $0.0000827821 | $82.78            | <font color="red">+11_004_579</font> |
| 24  | getCanisterInfo           | 157_560_355  | 63_614_142 | $0.0000845858 | $84.58            | <font color="red">+11_010_104</font> |
| 25  | executeStopCanister       | 153_213_098  | 61_875_239 | $0.0000822736 | $82.27            | <font color="red">+10_897_049</font> |
| 26  | executeDeleteCanister     | 153_435_198  | 61_964_079 | $0.0000823918 | $82.39            | <font color="red">+10_946_294</font> |
| 27  | getRawRand                | 151_196_946  | 61_068_778 | $0.0000812013 | $81.20            | <font color="red">+10_969_327</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 153_713_118  | 62_075_247 | $0.0000825396 | $82.53            |
| 1   | executeUpdateSettings     | 154_977_977  | 62_581_190 | $0.0000832123 | $83.21            |
| 2   | getCanisterStatus         | 143_058_672  | 57_813_468 | $0.0000768728 | $76.87            |
| 3   | executeInstallCode        | 168_387_306  | 67_944_922 | $0.0000903443 | $90.34            |
| 4   | executeUninstallCode      | 143_622_977  | 58_039_190 | $0.0000771730 | $77.17            |
| 5   | getCanisterStatus         | 143_030_674  | 57_802_269 | $0.0000768579 | $76.85            |
| 6   | executeUploadChunk        | 157_768_597  | 63_697_438 | $0.0000846966 | $84.69            |
| 7   | getStoredChunks           | 142_248_251  | 57_489_300 | $0.0000764418 | $76.44            |
| 8   | getStoredChunks           | 142_285_832  | 57_504_332 | $0.0000764618 | $76.46            |
| 9   | executeInstallChunkedCode | 160_352_654  | 64_731_061 | $0.0000860709 | $86.07            |
| 10  | executeUninstallCode      | 143_753_498  | 58_091_399 | $0.0000772424 | $77.24            |
| 11  | executeClearChunkStore    | 142_623_027  | 57_639_210 | $0.0000766411 | $76.64            |
| 12  | getStoredChunks           | 142_320_532  | 57_518_212 | $0.0000764802 | $76.48            |
| 13  | getCanisterStatus         | 143_237_156  | 57_884_862 | $0.0000769678 | $76.96            |
| 14  | executeDepositCycles      | 142_290_814  | 57_506_325 | $0.0000764644 | $76.46            |
| 15  | getCanisterStatus         | 143_270_170  | 57_898_068 | $0.0000769853 | $76.98            |
| 16  | executeUninstallCode      | 143_715_716  | 58_076_286 | $0.0000772223 | $77.22            |
| 17  | getCanisterStatus         | 143_207_609  | 57_873_043 | $0.0000769520 | $76.95            |
| 18  | executeStopCanister       | 142_273_754  | 57_499_501 | $0.0000764554 | $76.45            |
| 19  | getCanisterStatus         | 143_272_154  | 57_898_861 | $0.0000769864 | $76.98            |
| 20  | getCanisterStatus         | 143_244_418  | 57_887_767 | $0.0000769716 | $76.97            |
| 21  | executeStartCanister      | 142_436_659  | 57_564_663 | $0.0000765420 | $76.54            |
| 22  | getCanisterStatus         | 143_353_344  | 57_931_337 | $0.0000770296 | $77.02            |
| 23  | getCanisterStatus         | 143_164_536  | 57_855_814 | $0.0000769291 | $76.92            |
| 24  | getCanisterInfo           | 146_550_251  | 59_210_100 | $0.0000787299 | $78.72            |
| 25  | executeStopCanister       | 142_316_049  | 57_516_419 | $0.0000764779 | $76.47            |
| 26  | executeDeleteCanister     | 142_488_904  | 57_585_561 | $0.0000765698 | $76.56            |
| 27  | getRawRand                | 140_227_619  | 56_681_047 | $0.0000753671 | $75.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
