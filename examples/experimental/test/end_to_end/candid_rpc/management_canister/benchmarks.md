# Benchmarks for management_canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | executeCreateCanister     | 164_026_425  | 66_200_570 | $0.0000880249 | $88.02            | <font color="green">-1_686_390</font> |
| 1   | executeUpdateSettings     | 165_249_706  | 66_689_882 | $0.0000886755 | $88.67            | <font color="green">-1_811_483</font> |
| 2   | getCanisterStatus         | 152_481_849  | 61_582_739 | $0.0000818847 | $81.88            | <font color="green">-1_746_302</font> |
| 3   | executeInstallCode        | 177_748_529  | 71_689_411 | $0.0000953233 | $95.32            | <font color="green">-1_769_346</font> |
| 4   | executeUninstallCode      | 152_899_225  | 61_749_690 | $0.0000821067 | $82.10            | <font color="green">-1_814_276</font> |
| 5   | getCanisterStatus         | 152_383_189  | 61_543_275 | $0.0000818322 | $81.83            | <font color="green">-1_761_233</font> |
| 6   | executeUploadChunk        | 166_992_738  | 67_387_095 | $0.0000896026 | $89.60            | <font color="green">-1_808_693</font> |
| 7   | getStoredChunks           | 151_441_610  | 61_166_644 | $0.0000813315 | $81.33            | <font color="green">-1_811_648</font> |
| 8   | getStoredChunks           | 151_541_513  | 61_206_605 | $0.0000813846 | $81.38            | <font color="green">-1_810_643</font> |
| 9   | executeInstallChunkedCode | 169_474_812  | 68_379_924 | $0.0000909227 | $90.92            | <font color="green">-1_796_065</font> |
| 10  | executeUninstallCode      | 152_984_634  | 61_783_853 | $0.0000821521 | $82.15            | <font color="green">-1_701_158</font> |
| 11  | executeClearChunkStore    | 151_913_563  | 61_355_425 | $0.0000815825 | $81.58            | <font color="green">-1_821_765</font> |
| 12  | getStoredChunks           | 151_509_670  | 61_193_868 | $0.0000813677 | $81.36            | <font color="green">-1_714_514</font> |
| 13  | getCanisterStatus         | 152_412_166  | 61_554_866 | $0.0000818477 | $81.84            | <font color="green">-1_715_042</font> |
| 14  | executeDepositCycles      | 151_526_454  | 61_200_581 | $0.0000813766 | $81.37            | <font color="green">-1_767_722</font> |
| 15  | getCanisterStatus         | 152_507_333  | 61_592_933 | $0.0000818983 | $81.89            | <font color="green">-1_635_484</font> |
| 16  | executeUninstallCode      | 153_076_700  | 61_820_680 | $0.0000822011 | $82.20            | <font color="green">-1_657_090</font> |
| 17  | getCanisterStatus         | 152_448_932  | 61_569_572 | $0.0000818672 | $81.86            | <font color="green">-1_679_288</font> |
| 18  | executeStopCanister       | 151_611_548  | 61_234_619 | $0.0000814218 | $81.42            | <font color="green">-1_703_009</font> |
| 19  | getCanisterStatus         | 152_504_375  | 61_591_750 | $0.0000818967 | $81.89            | <font color="green">-1_653_850</font> |
| 20  | getCanisterStatus         | 152_451_619  | 61_570_647 | $0.0000818686 | $81.86            | <font color="green">-1_816_862</font> |
| 21  | executeStartCanister      | 151_713_613  | 61_275_445 | $0.0000814761 | $81.47            | <font color="green">-1_733_646</font> |
| 22  | getCanisterStatus         | 152_460_602  | 61_574_240 | $0.0000818734 | $81.87            | <font color="green">-1_587_092</font> |
| 23  | getCanisterStatus         | 152_474_193  | 61_579_677 | $0.0000818806 | $81.88            | <font color="green">-1_694_922</font> |
| 24  | getCanisterInfo           | 155_674_389  | 62_859_755 | $0.0000835827 | $83.58            | <font color="green">-1_885_966</font> |
| 25  | executeStopCanister       | 151_492_722  | 61_187_088 | $0.0000813586 | $81.35            | <font color="green">-1_720_376</font> |
| 26  | executeDeleteCanister     | 151_563_828  | 61_215_531 | $0.0000813965 | $81.39            | <font color="green">-1_871_370</font> |
| 27  | getRawRand                | 149_334_993  | 60_323_997 | $0.0000802110 | $80.21            | <font color="green">-1_861_953</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 165_712_815  | 66_875_126 | $0.0000889218 | $88.92            |
| 1   | executeUpdateSettings     | 167_061_189  | 67_414_475 | $0.0000896390 | $89.63            |
| 2   | getCanisterStatus         | 154_228_151  | 62_281_260 | $0.0000828135 | $82.81            |
| 3   | executeInstallCode        | 179_517_875  | 72_397_150 | $0.0000962643 | $96.26            |
| 4   | executeUninstallCode      | 154_713_501  | 62_475_400 | $0.0000830717 | $83.07            |
| 5   | getCanisterStatus         | 154_144_422  | 62_247_768 | $0.0000827690 | $82.76            |
| 6   | executeUploadChunk        | 168_801_431  | 68_110_572 | $0.0000905646 | $90.56            |
| 7   | getStoredChunks           | 153_253_258  | 61_891_303 | $0.0000822950 | $82.29            |
| 8   | getStoredChunks           | 153_352_156  | 61_930_862 | $0.0000823476 | $82.34            |
| 9   | executeInstallChunkedCode | 171_270_877  | 69_098_350 | $0.0000918780 | $91.87            |
| 10  | executeUninstallCode      | 154_685_792  | 62_464_316 | $0.0000830569 | $83.05            |
| 11  | executeClearChunkStore    | 153_735_328  | 62_084_131 | $0.0000825514 | $82.55            |
| 12  | getStoredChunks           | 153_224_184  | 61_879_673 | $0.0000822795 | $82.27            |
| 13  | getCanisterStatus         | 154_127_208  | 62_240_883 | $0.0000827598 | $82.75            |
| 14  | executeDepositCycles      | 153_294_176  | 61_907_670 | $0.0000823168 | $82.31            |
| 15  | getCanisterStatus         | 154_142_817  | 62_247_126 | $0.0000827681 | $82.76            |
| 16  | executeUninstallCode      | 154_733_790  | 62_483_516 | $0.0000830825 | $83.08            |
| 17  | getCanisterStatus         | 154_128_220  | 62_241_288 | $0.0000827604 | $82.76            |
| 18  | executeStopCanister       | 153_314_557  | 61_915_822 | $0.0000823276 | $82.32            |
| 19  | getCanisterStatus         | 154_158_225  | 62_253_290 | $0.0000827763 | $82.77            |
| 20  | getCanisterStatus         | 154_268_481  | 62_297_392 | $0.0000828350 | $82.83            |
| 21  | executeStartCanister      | 153_447_259  | 61_968_903 | $0.0000823982 | $82.39            |
| 22  | getCanisterStatus         | 154_047_694  | 62_209_077 | $0.0000827175 | $82.71            |
| 23  | getCanisterStatus         | 154_169_115  | 62_257_646 | $0.0000827821 | $82.78            |
| 24  | getCanisterInfo           | 157_560_355  | 63_614_142 | $0.0000845858 | $84.58            |
| 25  | executeStopCanister       | 153_213_098  | 61_875_239 | $0.0000822736 | $82.27            |
| 26  | executeDeleteCanister     | 153_435_198  | 61_964_079 | $0.0000823918 | $82.39            |
| 27  | getRawRand                | 151_196_946  | 61_068_778 | $0.0000812013 | $81.20            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
