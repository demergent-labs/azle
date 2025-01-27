# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | executeCreateCanister     | 165_804_924  | 66_911_969 | $0.0000889708 | $88.97            | <font color="red">+12_091_806</font> |
| 1   | executeUpdateSettings     | 167_234_353  | 67_483_741 | $0.0000897311 | $89.73            | <font color="red">+12_256_376</font> |
| 2   | getCanisterStatus         | 154_220_512  | 62_278_204 | $0.0000828095 | $82.80            | <font color="red">+11_161_840</font> |
| 3   | executeInstallCode        | 179_675_575  | 72_460_230 | $0.0000963482 | $96.34            | <font color="red">+11_288_269</font> |
| 4   | executeUninstallCode      | 154_881_049  | 62_542_419 | $0.0000831608 | $83.16            | <font color="red">+11_258_072</font> |
| 5   | getCanisterStatus         | 154_150_759  | 62_250_303 | $0.0000827724 | $82.77            | <font color="red">+11_120_085</font> |
| 6   | executeUploadChunk        | 168_718_767  | 68_077_506 | $0.0000905206 | $90.52            | <font color="red">+10_950_170</font> |
| 7   | getStoredChunks           | 153_229_988  | 61_881_995 | $0.0000822826 | $82.28            | <font color="red">+10_981_737</font> |
| 8   | getStoredChunks           | 153_323_645  | 61_919_458 | $0.0000823324 | $82.33            | <font color="red">+11_037_813</font> |
| 9   | executeInstallChunkedCode | 171_165_120  | 69_056_048 | $0.0000918218 | $91.82            | <font color="red">+10_812_466</font> |
| 10  | executeUninstallCode      | 154_843_889  | 62_527_555 | $0.0000831410 | $83.14            | <font color="red">+11_090_391</font> |
| 11  | executeClearChunkStore    | 153_677_763  | 62_061_105 | $0.0000825208 | $82.52            | <font color="red">+11_054_736</font> |
| 12  | getStoredChunks           | 153_400_828  | 61_950_331 | $0.0000823735 | $82.37            | <font color="red">+11_080_296</font> |
| 13  | getCanisterStatus         | 154_305_660  | 62_312_264 | $0.0000828547 | $82.85            | <font color="red">+11_068_504</font> |
| 14  | executeDepositCycles      | 153_351_575  | 61_930_630 | $0.0000823473 | $82.34            | <font color="red">+11_060_761</font> |
| 15  | getCanisterStatus         | 154_254_623  | 62_291_849 | $0.0000828276 | $82.82            | <font color="red">+10_984_453</font> |
| 16  | executeUninstallCode      | 154_697_898  | 62_469_159 | $0.0000830634 | $83.06            | <font color="red">+10_982_182</font> |
| 17  | getCanisterStatus         | 154_184_535  | 62_263_814 | $0.0000827903 | $82.79            | <font color="red">+10_976_926</font> |
| 18  | executeStopCanister       | 153_437_615  | 61_965_046 | $0.0000823931 | $82.39            | <font color="red">+11_163_861</font> |
| 19  | getCanisterStatus         | 154_294_292  | 62_307_716 | $0.0000828487 | $82.84            | <font color="red">+11_022_138</font> |
| 20  | getCanisterStatus         | 154_249_778  | 62_289_911 | $0.0000828250 | $82.82            | <font color="red">+11_005_360</font> |
| 21  | executeStartCanister      | 153_492_408  | 61_986_963 | $0.0000824222 | $82.42            | <font color="red">+11_055_749</font> |
| 22  | getCanisterStatus         | 154_363_981  | 62_335_592 | $0.0000828858 | $82.88            | <font color="red">+11_010_637</font> |
| 23  | getCanisterStatus         | 154_212_866  | 62_275_146 | $0.0000828054 | $82.80            | <font color="red">+11_048_330</font> |
| 24  | getCanisterInfo           | 157_694_698  | 63_667_879 | $0.0000846573 | $84.65            | <font color="red">+11_144_447</font> |
| 25  | executeStopCanister       | 153_354_098  | 61_931_639 | $0.0000823486 | $82.34            | <font color="red">+11_038_049</font> |
| 26  | executeDeleteCanister     | 153_563_474  | 62_015_389 | $0.0000824600 | $82.46            | <font color="red">+11_074_570</font> |
| 27  | getRawRand                | 151_249_029  | 61_089_611 | $0.0000812290 | $81.22            | <font color="red">+11_021_410</font> |

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
