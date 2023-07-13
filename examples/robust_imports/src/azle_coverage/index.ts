import $kiwi, {
    banana,
    blackberry,
    Cherry,
    elderberry,
    fig32,
    fig64,
    Farkleberry,
    Grapes,
    $honeydew,
    $icaco,
    $ilama,
    iceApple,
    iceApple8,
    iceApple16,
    iceApple32,
    iceApple64,
    Mango,
    nectarine,
    nectarine8,
    nectarine16,
    nectarine32,
    nectarine64,
    nutmeg,
    Orange,
    Olive,
    $pomegranate,
    $pineapple,
    Peach,
    $quince,
    Quince,
    Raspberry,
    rambutan,
    Strawberry,
    santol,
    sapodilla,
    Soncoya,
    tangerine,
    Tamarind,
    $ugni,
    Ugni,
    Voavanga,
    Lime,
    vanilla
} from './fruit';

import { match as marionberry, ic as lemon, int16 as coconut } from 'azle';
import * as starFruit from './fruit';

class FruitDeliveryService extends Strawberry {
    @sapodilla
    deliver: () => Cherry<string>;

    @santol
    is_delivered: () => Cherry<boolean>;
}

export type PreparedFruit = Raspberry<{
    honeydewCount: nectarine16;
    areIcacosCollected: boysenberry;
    isPineappleCut: boysenberry;
    arePomegranateArilsSeparated: boysenberry;
    areGrapesGathered: boysenberry;
    isIlamaWashed: boysenberry;
    areRambutanSkinsRemoved: boysenberry;
    haveElderberriesBeenPicked: boysenberry;
}>;

type OrangeAndFarkleberry = Farkleberry<Orange<(param1: tangerine) => void>>;
type QuinceAndFarkleberry = Farkleberry<
    Quince<(param1: tangerine) => tangerine>
>;
type UgniAndFarkleberry = Farkleberry<Ugni<(param1: tangerine) => tangerine>>;

type TamarindAndFarkleberry = Tamarind<
    [UgniAndFarkleberry, OrangeAndFarkleberry, QuinceAndFarkleberry]
>;

export type NectarineBasket = Raspberry<{
    nat: nectarine;
    nat8: nectarine8;
    nat16: nectarine16;
    nat32: nectarine32;
    nat64: nectarine64;
    starNat: starFruit.nectarine;
}>;

export type IceAppleBasket = Raspberry<{
    int: iceApple;
    int8: iceApple8;
    int16: iceApple16;
    int32: iceApple32;
    int64: iceApple64;
    starInt: starFruit.iceApple;
}>;

export type boysenberry = boolean;

export type Watermelon = Voavanga<{
    Seeds: nutmeg;
    Seedless: nutmeg;
}>;

let soncoya = new Soncoya<nectarine8, PreparedFruit>(0, 10, 1_000);

function gatherGrapes(): Grapes {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                areGrapesGathered: true
            });
        },
        None: () => {}
    });
    return {
        Ok: null
    };
}

$icaco;
export function collectIcaco(): void {
    let preparedFruit: PreparedFruit = {
        honeydewCount: 0,
        areIcacosCollected: true,
        isPineappleCut: false,
        arePomegranateArilsSeparated: false,
        areGrapesGathered: false,
        isIlamaWashed: true,
        areRambutanSkinsRemoved: false,
        haveElderberriesBeenPicked: false
    };

    soncoya.insert(0, preparedFruit);
}

$pineapple;
export function cutPineapple(): void {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                isPineappleCut: true
            });
        },
        None: () => {}
    });
}

$pomegranate;
export function separateArilsFromPith(): void {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                arePomegranateArilsSeparated: true
            });
        },
        None: () => {}
    });
}

$honeydew;
export function buyHoneydew(): void {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                honeydewCount: preparedFruit.honeydewCount + 1
            });
        },
        None: () => {}
    });
}

$ilama;
export function keepIlamaClean(): void {
    console.log(`Method "${lemon.methodName()}" was called`);
    if (lemon.methodName() === 'dirtyIlama') {
        return;
    }
    lemon.acceptMessage();
}

$kiwi;
export function addSigFigs(figs: fig32): fig64 {
    return figs;
}

$kiwi;
export function checkService(
    service: FruitDeliveryService
): FruitDeliveryService {
    return service;
}

$kiwi;
export function checkWatermelonForSeeds(
    shouldHaveSeeds: blackberry,
    watermelon: Watermelon
): vanilla {
    marionberry(watermelon, {
        Seedless: () => {
            if (shouldHaveSeeds) {
                lemon.trap('Watermelon is seedless when it should have seeds');
            }
        },
        Seeds: () => {
            if (!shouldHaveSeeds) {
                lemon.trap(
                    'Watermelon is has seeds when it should be seedless'
                );
            }
        }
    });
}

$kiwi;
export function compareApplesToOranges(
    apples: IceAppleBasket,
    oranges: NectarineBasket
): boysenberry {
    return (
        apples.int === oranges.nat &&
        apples.int8 === oranges.nat8 &&
        apples.int16 === oranges.nat16 &&
        apples.int32 === oranges.nat32 &&
        apples.int64 === oranges.nat64 &&
        apples.starInt === oranges.starNat
    );
}

$kiwi;
export function handleFarkleberries(
    orange: OrangeAndFarkleberry,
    quince: QuinceAndFarkleberry,
    ugni: UgniAndFarkleberry
): TamarindAndFarkleberry {
    return [ugni, orange, quince];
}

$kiwi;
export function getManagementPeach(): Peach {
    return Peach.fromText('aaaaa-aa');
}

$kiwi;
export function pitOlives(olive: Olive<boysenberry>): boysenberry {
    return marionberry(olive, {
        Some: (berry) => {
            return berry;
        },
        None: () => {
            return false;
        }
    });
}

$kiwi;
export function peelBanana(banana: banana): nectarine8 {
    if (banana.length < 1) {
        return 0;
    }
    return banana[0];
}

$kiwi;
export function putTheCoconutInTheLime(coconut: coconut): Lime<coconut> {
    return [coconut];
}

$kiwi;
export function isMangoTrickyToEat(): Mango<boysenberry> {
    lemon.reply(true);
}

$quince({ guard: gatherGrapes });
export function isFruitPrepared(): boysenberry {
    return marionberry(soncoya.get(0), {
        Some: (pf) => {
            return (
                pf.honeydewCount > 0 &&
                pf.areIcacosCollected &&
                pf.isPineappleCut &&
                pf.arePomegranateArilsSeparated &&
                pf.areGrapesGathered &&
                pf.isIlamaWashed &&
                pf.areRambutanSkinsRemoved &&
                !pf.haveElderberriesBeenPicked
            );
        },
        None: () => {
            return false;
        }
    });
}

$ugni;
export function removeRambutanSkins(): rambutan {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                areRambutanSkinsRemoved: true
            });
        },
        None: () => {}
    });
    return 'rambutan skins';
}

$ugni;
export function dirtyIlama(): void {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                isIlamaWashed: false
            });
        },
        None: () => {}
    });
}

$ugni;
export function pickElderberry(): elderberry {
    marionberry(soncoya.get(0), {
        Some: (preparedFruit) => {
            soncoya.remove(0);
            soncoya.insert(0, {
                ...preparedFruit,
                haveElderberriesBeenPicked: true
            });
        },
        None: () => {}
    });
    throw 'All out of elderberries';
}
