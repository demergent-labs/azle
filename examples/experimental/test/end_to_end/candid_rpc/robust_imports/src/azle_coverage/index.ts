import { ic, ic as lemon, int16 as coconut } from 'azle/experimental';

import kiwi, {
    banana,
    blackberry,
    elderberry,
    Farkleberry,
    fig32,
    fig64,
    honeydew,
    icaco,
    iceApple,
    iceApple8,
    iceApple16,
    iceApple32,
    iceApple64,
    ilama,
    Lime,
    Mango,
    nectarine,
    nectarine8,
    nectarine16,
    nectarine32,
    nectarine64,
    Nutmeg,
    Olive,
    Peach,
    peach,
    pineapple,
    pomegranate,
    quince,
    rambutan,
    Raspberry,
    Soncoya,
    Strawberry,
    Tamarind,
    tangerine,
    ugni,
    Vanilla,
    Voavanga
} from './fruit';
import * as starFruit from './fruit';

const FruitDeliveryCanister = Strawberry({
    deliver: ugni([], tangerine),
    is_delivered: quince([], blackberry)
});

export const boysenberry = blackberry;

export const PreparedFruit = Raspberry({
    honeydewCount: nectarine16,
    areIcacosCollected: boysenberry,
    isPineappleCut: boysenberry,
    arePomegranateArilsSeparated: boysenberry,
    areGrapesGathered: boysenberry,
    isIlamaWashed: boysenberry,
    areRambutanSkinsRemoved: boysenberry,
    haveElderberriesBeenPicked: boysenberry
});
export type PreparedFruit = typeof PreparedFruit.tsType;

const OrangeAndFarkleberry = Farkleberry([tangerine], Vanilla, 'oneway');
const QuinceAndFarkleberry = Farkleberry([tangerine], tangerine, 'query');
const UgniAndFarkleberry = Farkleberry([tangerine], tangerine, 'update');

const TamarindAndFarkleberry = Tamarind(
    UgniAndFarkleberry,
    OrangeAndFarkleberry,
    QuinceAndFarkleberry
);

export const NectarineBasket = Raspberry({
    nat: nectarine,
    nat8: nectarine8,
    nat16: nectarine16,
    nat32: nectarine32,
    nat64: nectarine64,
    starNat: starFruit.nectarine
});

export const IceAppleBasket = Raspberry({
    int: iceApple,
    int8: iceApple8,
    int16: iceApple16,
    int32: iceApple32,
    int64: iceApple64,
    starInt: starFruit.iceApple
});

export const Watermelon = Voavanga({
    Seeds: Nutmeg,
    Seedless: Nutmeg
});

let soncoya = Soncoya<nectarine8, PreparedFruit>(0);

function gatherGrapes(): void {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return;
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        areGrapesGathered: true
    });
}

export const collectIcaco = icaco([], () => {
    const preparedFruit: PreparedFruit = {
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
});

export const cutPineapple = pineapple(() => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return;
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        isPineappleCut: true
    });
});

export const separateArilsFromPith = pomegranate([], () => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return;
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        arePomegranateArilsSeparated: true
    });
});

export const buyHoneydew = honeydew(() => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return;
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        honeydewCount: preparedFruit.honeydewCount + 1
    });
});

export const keepIlamaClean = ilama(() => {
    console.info(`Method "${lemon.methodName()}" was called`);
    if (lemon.methodName() === 'dirtyIlama') {
        return;
    }
    lemon.acceptMessage();
});

export const addSigFigs = kiwi([fig32], fig64, (figs) => {
    return figs;
});

export const checkCanister = kiwi(
    [FruitDeliveryCanister],
    FruitDeliveryCanister,
    (canister) => {
        return canister;
    }
);

export const checkWatermelonForSeeds = kiwi(
    [blackberry, Watermelon],
    Vanilla,
    (shouldHaveSeeds, watermelon) => {
        if ('Seedless' in watermelon) {
            if (shouldHaveSeeds === true) {
                lemon.trap('Watermelon is seedless when it should have seeds');
            }
        }
        if ('Seeds' in watermelon) {
            if (shouldHaveSeeds === false) {
                lemon.trap(
                    'Watermelon is has seeds when it should be seedless'
                );
            }
        }
    }
);

export const compareApplesToOranges = kiwi(
    [IceAppleBasket, NectarineBasket],
    boysenberry,
    (apples, oranges) => {
        return (
            apples.int === oranges.nat &&
            apples.int8 === oranges.nat8 &&
            apples.int16 === oranges.nat16 &&
            apples.int32 === oranges.nat32 &&
            apples.int64 === oranges.nat64 &&
            apples.starInt === oranges.starNat
        );
    }
);

export const handleFarkleberries = kiwi(
    [OrangeAndFarkleberry, QuinceAndFarkleberry, UgniAndFarkleberry],
    TamarindAndFarkleberry,
    (orange, quince, ugni) => {
        return [ugni, orange, quince];
    }
);

export const getManagementPeach = kiwi([], peach, () => {
    return Peach.fromText('aaaaa-aa');
});

export const pitOlives = kiwi([Olive(boysenberry)], boysenberry, (olive) => {
    if ('None' in olive) {
        return false;
    }

    const berry = olive.Some;

    return berry;
});

export const peelBanana = kiwi([banana], nectarine8, (banana) => {
    if (banana.length < 1) {
        return 0;
    }
    return banana[0];
});

export const putTheCoconutInTheLime = kiwi(
    [coconut],
    Lime(coconut),
    (coconut) => {
        return Int16Array.from([coconut]);
    }
);

export const isMangoTrickyToEat = kiwi(
    [],
    Mango(boysenberry),
    () => {
        lemon.reply({ data: true, candidType: blackberry });
    },
    { manual: true }
);

export const isFruitPrepared = quince([], boysenberry, () => {
    gatherGrapes();

    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return false;
    }

    return (
        preparedFruit.honeydewCount > 0 &&
        preparedFruit.areIcacosCollected &&
        preparedFruit.isPineappleCut &&
        preparedFruit.arePomegranateArilsSeparated &&
        preparedFruit.areGrapesGathered &&
        preparedFruit.isIlamaWashed &&
        preparedFruit.areRambutanSkinsRemoved &&
        !preparedFruit.haveElderberriesBeenPicked
    );
});

export const removeRambutanSkins = ugni([], rambutan, () => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return ic.trap('soncoya is None');
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        areRambutanSkinsRemoved: true
    });

    return 'rambutan skins';
});

export const dirtyIlama = ugni([], Vanilla, () => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return;
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        isIlamaWashed: false
    });
});

export const pickElderberry = ugni([], elderberry, () => {
    const preparedFruit = soncoya.get(0);

    if (preparedFruit === null) {
        return ic.trap('soncoya is None');
    }

    soncoya.remove(0);
    soncoya.insert(0, {
        ...preparedFruit,
        haveElderberriesBeenPicked: true
    });

    throw 'All out of elderberries';
});
