:- begin_tests(complexLocation, [
    setup((
        assertzUniq(item('Diamond')),
        assertzUniq(item('Ring')),
        assertzUniq(item('RingBox')),
        assertzUniq(container(item('RingBox'))),
        assertzUniq(item('JewelryTray')),
        assertzUniq(supporter(item('JewelryTray'))),
        assertzUniq(item('Drawer')),
        assertzUniq(container(item('Drawer'))),
        assertzUniq(item('Shelf')),
        assertzUniq(item('Pencil')),
        assertzUniq(item('Desk')),
        assertzUniq(supporter(item('Desk'))),
        assertzUniq(item('Carpet')),
        assertzUniq(supporter(item('Carpet'))),
            assertzUniq(item('Key')),
            assertzUniq(item('Coin')),
            assertzUniq(item('CreditCard')),
            assertzUniq(item('CoinPouch')),
            assertzUniq(container(item('CoinPouch'))),
            assertzUniq(item('CardSleeve')),
            assertzUniq(container(item('CardSleeve'))),
            assertzUniq(item('Wallet')),
            assertzUniq(item('BackPocket')),
            assertzUniq(container(item('BackPocket'))),
            assertzUniq(item('Pants')),
            assertzUniq(item('Cucumber')),
            assertzUniq(item('PlasticBag')),
            assertzUniq(container(item('PlasticBag'))),
            assertzUniq(item('Handphone')),
            assertzUniq(character('Alice')),
        assertzUniq(location('LivingRoom')),
        assertzUniq(region('House')),
        assertzUniq(location('Shed')),
        assertzUniq(location('MeadowClearing')),
        assertzUniq(region('Forest')),
        assertzUniq(region('Country')),

        placeAsPartOf(item('Diamond'), item('Ring')),
        placeInContainer(item('Ring'), item('RingBox')),
        placeOnSupporter(item('RingBox'), item('JewelryTray')),
        placeInContainer(item('JewelryTray'), item('Drawer')),
        placeAsPartOf(item('Drawer'), item('Shelf')),
        placeAsPartOf(item('Shelf'), item('Desk')),
        placeOnSupporter(item('Pencil'), item('Desk')),
        placeOnSupporter(item('Desk'), item('Carpet')),
            placeInContainer(item('Key'), item('BackPocket')),
            placeInContainer(item('Coin'), item('CoinPouch')),
            placeInContainer(item('CreditCard'), item('CardSleeve')),
            placeAsPartOf(item('CoinPouch'), item('Wallet')),
            placeAsPartOf(item('CardSleeve'), item('Wallet')),
            placeInContainer(item('Wallet'), item('BackPocket')),
            placeAsPartOf(item('BackPocket'), item('Pants')),
            placeAsWornOf(item('Pants'), character('Alice')),
            placeInContainer(item('Cucumber'), item('PlasticBag')),
            placeAsTakenOf(item('PlasticBag'), character('Alice')),
            placeAsTakenOf(item('Handphone'), character('Alice')),
            placeInLocation(character('Alice'), location('LivingRoom')),
        placeInLocation(item('Carpet'), location('LivingRoom')),
        placeInRegion(location('LivingRoom'), region('House')),
        placeInLocation(region('House'), location('MeadowClearing')),
        placeInLocation(location('Shed'), location('MeadowClearing')),
        placeInRegion(location('MeadowClearing'), region('Forest')),
        placeInRegion(region('Forest'), region('Country'))
    ))
]).

:- use_module(game).

%{
test(diamond, all(X=[region('House')])) :-
    item('Diamond') inRegion region('House'),
    item('Diamond') inRegion X.

test(diamond, all(X=[location('LivingRoom')])) :-
    item('Diamond') inLocation location('LivingRoom'),
    item('Diamond') inLocation X.

test(diamond, all(X=[item('RingBox')])) :-
    item('Diamond') inItem item('RingBox'),
    item('Diamond') inItem X.

test(diamond, all(X=[])) :-
    item('Diamond') onItem X.

test(diamond, all(X=[item('Ring')])) :-
    item('Diamond') partOfItem X.

test(diamond, all(X=[
    item('RingBox'),
    item('Drawer'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Diamond') enclosedBy X.

test(diamond, all(X=[
    item('JewelryTray'),
    item('Carpet')
])) :-
    item('Diamond') supportedBy X.

test(diamond, all(X=[item('Ring')])) :-
    item('Diamond') composedBy X.
%}

%{
test(ring, all(X=[region('House')])) :-
    item('Ring') inRegion region('House'),
    item('Ring') inRegion X.

test(ring, all(X=[location('LivingRoom')])) :-
    item('Ring') inLocation location('LivingRoom'),
    item('Ring') inLocation X.

test(ring, all(X=[item('RingBox')])) :-
    item('Ring') inItem item('RingBox'),
    item('Ring') inItem X.

test(ring, all(X=[])) :-
    item('Ring') onItem X.

test(ring, all(X=[])) :-
    item('Ring') partOfItem X.

test(ring, all(X=[
    item('RingBox'),
    item('Drawer'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Ring') enclosedBy X.

test(ring, all(X=[
    item('JewelryTray'),
    item('Carpet')
])) :-
    item('Ring') supportedBy X.

test(ring, all(X=[])) :-
    item('Ring') composedBy X.
%}

%{
test(ringBox, all(X=[region('House')])) :-
    item('RingBox') inRegion region('House'),
    item('RingBox') inRegion X.

test(ringBox, all(X=[location('LivingRoom')])) :-
    item('RingBox') inLocation location('LivingRoom'),
    item('RingBox') inLocation X.

test(ringBox, all(X=[item('Drawer')])) :-
    item('RingBox') inItem item('Drawer'),
    item('RingBox') inItem X.

test(ringBox, all(X=[item('JewelryTray')])) :-
    item('RingBox') onItem X.

test(ringBox, all(X=[])) :-
    item('RingBox') partOfItem X.

test(ringBox, all(X=[
    item('Drawer'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('RingBox') enclosedBy X.

test(ringBox, all(X=[
    item('JewelryTray'),
    item('Carpet')
])) :-
    item('RingBox') supportedBy X.

test(ringBox, all(X=[])) :-
    item('RingBox') composedBy X.
%}

%{
test(jewelryTray, all(X=[region('House')])) :-
    item('JewelryTray') inRegion region('House'),
    item('JewelryTray') inRegion X.

test(jewelryTray, all(X=[location('LivingRoom')])) :-
    item('JewelryTray') inLocation location('LivingRoom'),
    item('JewelryTray') inLocation X.

test(jewelryTray, all(X=[item('Drawer')])) :-
    item('JewelryTray') inItem item('Drawer'),
    item('JewelryTray') inItem X.

test(jewelryTray, all(X=[])) :-
    item('JewelryTray') onItem X.

test(jewelryTray, all(X=[])) :-
    item('JewelryTray') partOfItem X.

test(jewelryTray, all(X=[
    item('Drawer'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('JewelryTray') enclosedBy X.

test(jewelryTray, all(X=[
    item('Carpet')
])) :-
    item('JewelryTray') supportedBy X.

test(jewelryTray, all(X=[])) :-
    item('JewelryTray') composedBy X.
%}

%{
test(drawer, all(X=[region('House')])) :-
    item('Drawer') inRegion region('House'),
    item('Drawer') inRegion X.

test(drawer, all(X=[location('LivingRoom')])) :-
    item('Drawer') inLocation location('LivingRoom'),
    item('Drawer') inLocation X.

test(drawer, all(X=[])) :-
    item('Drawer') inItem X.

test(drawer, all(X=[])) :-
    item('Drawer') onItem X.

test(drawer, all(X=[item('Shelf')])) :-
    item('Drawer') partOfItem X.

test(drawer, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Drawer') enclosedBy X.

test(drawer, all(X=[
    item('Carpet')
])) :-
    item('Drawer') supportedBy X.

test(drawer, all(X=[
    item('Shelf'),
    item('Desk')
])) :-
    item('Drawer') composedBy X.
%}

%{
test(shelf, all(X=[region('House')])) :-
    item('Shelf') inRegion region('House'),
    item('Shelf') inRegion X.

test(shelf, all(X=[location('LivingRoom')])) :-
    item('Shelf') inLocation location('LivingRoom'),
    item('Shelf') inLocation X.

test(shelf, all(X=[])) :-
    item('Shelf') inItem X.

test(shelf, all(X=[])) :-
    item('Shelf') onItem X.

test(shelf, all(X=[item('Desk')])) :-
    item('Shelf') partOfItem X.

test(shelf, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Shelf') enclosedBy X.

test(shelf, all(X=[
    item('Carpet')
])) :-
    item('Shelf') supportedBy X.

test(shelf, all(X=[
    item('Desk')
])) :-
    item('Shelf') composedBy X.
%}

%{
test(desk, all(X=[region('House')])) :-
    item('Desk') inRegion region('House'),
    item('Desk') inRegion X.

test(desk, all(X=[location('LivingRoom')])) :-
    item('Desk') inLocation location('LivingRoom'),
    item('Desk') inLocation X.

test(desk, all(X=[])) :-
    item('Desk') inItem X.

test(desk, all(X=[item('Carpet')])) :-
    item('Desk') onItem X.

test(desk, all(X=[])) :-
    item('Desk') partOfItem X.

test(desk, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Desk') enclosedBy X.

test(desk, all(X=[
    item('Carpet')
])) :-
    item('Desk') supportedBy X.

test(desk, all(X=[
])) :-
    item('Desk') composedBy X.
%}

%{
test(carpet, all(X=[region('House')])) :-
    item('Carpet') inRegion region('House'),
    item('Carpet') inRegion X.

test(carpet, all(X=[location('LivingRoom')])) :-
    item('Carpet') inLocation location('LivingRoom'),
    item('Carpet') inLocation X.

test(carpet, all(X=[])) :-
    item('Carpet') inItem X.

test(carpet, all(X=[])) :-
    item('Carpet') onItem X.

test(carpet, all(X=[])) :-
    item('Carpet') partOfItem X.

test(carpet, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Carpet') enclosedBy X.

test(carpet, all(X=[
])) :-
    item('Carpet') supportedBy X.

test(carpet, all(X=[
])) :-
    item('Carpet') composedBy X.
%}

%{
test(livingRoom, all(X=[region('House')])) :-
    location('LivingRoom') inRegion region('House'),
    location('LivingRoom') inRegion X.

test(livingRoom, all(X=[])) :-
    location('LivingRoom') inLocation X.

test(livingRoom, all(X=[])) :-
    location('LivingRoom') inItem X.

test(livingRoom, all(X=[])) :-
    location('LivingRoom') onItem X.

test(livingRoom, all(X=[])) :-
    location('LivingRoom') partOfItem X.

test(livingRoom, all(X=[
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    location('LivingRoom') enclosedBy X.

test(livingRoom, all(X=[
])) :-
    location('LivingRoom') supportedBy X.

test(livingRoom, all(X=[
])) :-
    location('LivingRoom') composedBy X.
%}

%{
test(house, all(X=[region('Forest')])) :-
    region('House') inRegion region('Forest'),
    region('House') inRegion X.

test(house, all(X=[location('MeadowClearing')])) :-
    region('House') inLocation location('MeadowClearing'),
    region('House') inLocation X.

test(house, all(X=[])) :-
    region('House') inItem X.

test(house, all(X=[])) :-
    region('House') onItem X.

test(house, all(X=[])) :-
    region('House') partOfItem X.

test(house, all(X=[
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    region('House') enclosedBy X.

test(house, all(X=[
])) :-
    region('House') supportedBy X.

test(house, all(X=[
])) :-
    region('House') composedBy X.
%}

%{
test(meadowClearing, all(X=[region('Forest')])) :-
    location('MeadowClearing') inRegion region('Forest'),
    location('MeadowClearing') inRegion X.

test(meadowClearing, all(X=[])) :-
    location('MeadowClearing') inLocation X.

test(meadowClearing, all(X=[])) :-
    location('MeadowClearing') inItem X.

test(meadowClearing, all(X=[])) :-
    location('MeadowClearing') onItem X.

test(meadowClearing, all(X=[])) :-
    location('MeadowClearing') partOfItem X.

test(meadowClearing, all(X=[
    region('Forest'),
    region('Country')
])) :-
    location('MeadowClearing') enclosedBy X.

test(meadowClearing, all(X=[
])) :-
    location('MeadowClearing') supportedBy X.

test(meadowClearing, all(X=[
])) :-
    location('MeadowClearing') composedBy X.
%}

%{
test(forest, all(X=[region('Country')])) :-
    region('Forest') inRegion region('Country'),
    region('Forest') inRegion X.

test(forest, all(X=[])) :-
    region('Forest') inLocation X.

test(forest, all(X=[])) :-
    region('Forest') inItem X.

test(forest, all(X=[])) :-
    region('Forest') onItem X.

test(forest, all(X=[])) :-
    region('Forest') partOfItem X.

test(forest, all(X=[
    region('Country')
])) :-
    region('Forest') enclosedBy X.

test(forest, all(X=[
])) :-
    region('Forest') supportedBy X.

test(forest, all(X=[
])) :-
    region('Forest') composedBy X.
%}

%{
test(country, all(X=[])) :-
    region('Country') inRegion X.

test(country, all(X=[])) :-
    region('Country') inLocation X.

test(country, all(X=[])) :-
    region('Country') inItem X.

test(country, all(X=[])) :-
    region('Country') onItem X.

test(country, all(X=[])) :-
    region('Country') partOfItem X.

test(country, all(X=[
])) :-
    region('Country') enclosedBy X.

test(country, all(X=[
])) :-
    region('Country') supportedBy X.

test(country, all(X=[
])) :-
    region('Country') composedBy X.
%}

%{
test(alice, all(X=[region('House')])) :-
    character('Alice') inRegion region('House'),
    character('Alice') inRegion X.

test(alice, all(X=[location('LivingRoom')])) :-
    character('Alice') inLocation location('LivingRoom'),
    character('Alice') inLocation X.

test(alice, all(X=[])) :-
    character('Alice') inItem X.

test(alice, all(X=[])) :-
    character('Alice') onItem X.

test(alice, all(X=[])) :-
    character('Alice') partOfItem X.

test(alice, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    character('Alice') enclosedBy X.

test(alice, all(X=[
])) :-
    character('Alice') supportedBy X.

test(alice, all(X=[
])) :-
    character('Alice') composedBy X.
%}

%{
test(key, all(X=[region('House')])) :-
    item('Key') inRegion region('House'),
    item('Key') inRegion X.

test(key, all(X=[location('LivingRoom')])) :-
    item('Key') inLocation location('LivingRoom'),
    item('Key') inLocation X.

test(key, all(X=[item('BackPocket')])) :-
    item('Key') inItem item('BackPocket'),
    item('Key') inItem X.

test(key, all(X=[])) :-
    item('Key') onItem X.

test(key, all(X=[])) :-
    item('Key') partOfItem X.

test(key, all(X=[])) :-
    item('Key') takenOfCharacter X.

test(key, all(X=[])) :-
    item('Key') wornOfCharacter X.

test(key, all(X=[
    item('BackPocket'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Key') enclosedBy X.

test(key, all(X=[
])) :-
    item('Key') supportedBy X.

test(key, all(X=[
])) :-
    item('Key') composedBy X.

test(key, all(X=[
    character('Alice')
])) :-
    item('Key') possessedBy X.
%}

%{
test(coin, all(X=[region('House')])) :-
    item('Coin') inRegion region('House'),
    item('Coin') inRegion X.

test(coin, all(X=[location('LivingRoom')])) :-
    item('Coin') inLocation location('LivingRoom'),
    item('Coin') inLocation X.

test(coin, all(X=[item('CoinPouch')])) :-
    item('Coin') inItem item('CoinPouch'),
    item('Coin') inItem X.

test(coin, all(X=[])) :-
    item('Coin') onItem X.

test(coin, all(X=[])) :-
    item('Coin') partOfItem X.

test(coin, all(X=[])) :-
    item('Coin') takenOfCharacter X.

test(coin, all(X=[])) :-
    item('Coin') wornOfCharacter X.

test(coin, all(X=[
    item('CoinPouch'),
    item('BackPocket'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Coin') enclosedBy X.

test(coin, all(X=[
])) :-
    item('Coin') supportedBy X.

test(coin, all(X=[
])) :-
    item('Coin') composedBy X.

test(coin, all(X=[
    character('Alice')
])) :-
    item('Coin') possessedBy X.
%}

%{
test(creditCard, all(X=[region('House')])) :-
    item('CreditCard') inRegion region('House'),
    item('CreditCard') inRegion X.

test(creditCard, all(X=[location('LivingRoom')])) :-
    item('CreditCard') inLocation location('LivingRoom'),
    item('CreditCard') inLocation X.

test(creditCard, all(X=[item('CardSleeve')])) :-
    item('CreditCard') inItem item('CardSleeve'),
    item('CreditCard') inItem X.

test(creditCard, all(X=[])) :-
    item('CreditCard') onItem X.

test(creditCard, all(X=[])) :-
    item('CreditCard') partOfItem X.

test(creditCard, all(X=[])) :-
    item('CreditCard') takenOfCharacter X.

test(creditCard, all(X=[])) :-
    item('CreditCard') wornOfCharacter X.

test(creditCard, all(X=[
    item('CardSleeve'),
    item('BackPocket'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('CreditCard') enclosedBy X.

test(creditCard, all(X=[
])) :-
    item('CreditCard') supportedBy X.

test(creditCard, all(X=[
])) :-
    item('CreditCard') composedBy X.

test(creditCard, all(X=[
    character('Alice')
])) :-
    item('CreditCard') possessedBy X.
%}

%{
test(coinPouch, all(X=[region('House')])) :-
    item('CoinPouch') inRegion region('House'),
    item('CoinPouch') inRegion X.

test(coinPouch, all(X=[location('LivingRoom')])) :-
    item('CoinPouch') inLocation location('LivingRoom'),
    item('CoinPouch') inLocation X.

test(coinPouch, all(X=[item('BackPocket')])) :-
    item('CoinPouch') inItem item('BackPocket'),
    item('CoinPouch') inItem X.

test(coinPouch, all(X=[])) :-
    item('CoinPouch') onItem X.

test(coinPouch, all(X=[item('Wallet')])) :-
    item('CoinPouch') partOfItem item('Wallet'),
    item('CoinPouch') partOfItem X.

test(coinPouch, all(X=[])) :-
    item('CoinPouch') takenOfCharacter X.

test(coinPouch, all(X=[])) :-
    item('CoinPouch') wornOfCharacter X.

test(coinPouch, all(X=[
    item('BackPocket'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('CoinPouch') enclosedBy X.

test(coinPouch, all(X=[
])) :-
    item('CoinPouch') supportedBy X.

test(coinPouch, all(X=[
    item('Wallet')
])) :-
    item('CoinPouch') composedBy X.

test(coinPouch, all(X=[
    character('Alice')
])) :-
    item('CoinPouch') possessedBy X.
%}

%{
test(wallet, all(X=[region('House')])) :-
    item('Wallet') inRegion region('House'),
    item('Wallet') inRegion X.

test(wallet, all(X=[location('LivingRoom')])) :-
    item('Wallet') inLocation location('LivingRoom'),
    item('Wallet') inLocation X.

test(wallet, all(X=[item('BackPocket')])) :-
    item('Wallet') inItem item('BackPocket'),
    item('Wallet') inItem X.

test(wallet, all(X=[])) :-
    item('Wallet') onItem X.

test(wallet, all(X=[])) :-
    item('Wallet') partOfItem X.

test(wallet, all(X=[])) :-
    item('Wallet') takenOfCharacter X.

test(wallet, all(X=[])) :-
    item('Wallet') wornOfCharacter X.

test(wallet, all(X=[
    item('BackPocket'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Wallet') enclosedBy X.

test(wallet, all(X=[
])) :-
    item('Wallet') supportedBy X.

test(wallet, all(X=[
])) :-
    item('Wallet') composedBy X.

test(wallet, all(X=[
    character('Alice')
])) :-
    item('Wallet') possessedBy X.
%}

%{
test(backPocket, all(X=[region('House')])) :-
    item('BackPocket') inRegion region('House'),
    item('BackPocket') inRegion X.

test(backPocket, all(X=[location('LivingRoom')])) :-
    item('BackPocket') inLocation location('LivingRoom'),
    item('BackPocket') inLocation X.

test(backPocket, all(X=[])) :-
    item('BackPocket') inItem X.

test(backPocket, all(X=[])) :-
    item('BackPocket') onItem X.

test(backPocket, all(X=[item('Pants')])) :-
    item('BackPocket') partOfItem X.

test(backPocket, all(X=[])) :-
    item('BackPocket') takenOfCharacter X.

test(backPocket, all(X=[])) :-
    item('BackPocket') wornOfCharacter X.

test(backPocket, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('BackPocket') enclosedBy X.

test(backPocket, all(X=[
])) :-
    item('BackPocket') supportedBy X.

test(backPocket, all(X=[
    item('Pants')
])) :-
    item('BackPocket') composedBy X.

test(backPocket, all(X=[
    character('Alice')
])) :-
    item('BackPocket') possessedBy X.
%}

%{
test(pants, all(X=[region('House')])) :-
    item('Pants') inRegion region('House'),
    item('Pants') inRegion X.

test(pants, all(X=[location('LivingRoom')])) :-
    item('Pants') inLocation location('LivingRoom'),
    item('Pants') inLocation X.

test(pants, all(X=[])) :-
    item('Pants') inItem X.

test(pants, all(X=[])) :-
    item('Pants') onItem X.

test(pants, all(X=[])) :-
    item('Pants') partOfItem X.

test(pants, all(X=[])) :-
    item('Pants') takenOfCharacter X.

test(pants, all(X=[
    character('Alice')
])) :-
    item('Pants') wornOfCharacter X.

test(pants, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Pants') enclosedBy X.

test(pants, all(X=[
])) :-
    item('Pants') supportedBy X.

test(pants, all(X=[
])) :-
    item('Pants') composedBy X.

test(pants, all(X=[
    character('Alice')
])) :-
    item('Pants') possessedBy X.
%}

%{
test(cucumber, all(X=[region('House')])) :-
    item('Cucumber') inRegion region('House'),
    item('Cucumber') inRegion X.

test(cucumber, all(X=[location('LivingRoom')])) :-
    item('Cucumber') inLocation location('LivingRoom'),
    item('Cucumber') inLocation X.

test(cucumber, all(X=[item('PlasticBag')])) :-
    item('Cucumber') inItem X.

test(cucumber, all(X=[])) :-
    item('Cucumber') onItem X.

test(cucumber, all(X=[])) :-
    item('Cucumber') partOfItem X.

test(cucumber, all(X=[])) :-
    item('Cucumber') takenOfCharacter X.

test(cucumber, all(X=[
])) :-
    item('Cucumber') wornOfCharacter X.

test(cucumber, all(X=[
    item('PlasticBag'),
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Cucumber') enclosedBy X.

test(cucumber, all(X=[
])) :-
    item('Cucumber') supportedBy X.

test(cucumber, all(X=[
])) :-
    item('Cucumber') composedBy X.

test(cucumber, all(X=[
    character('Alice')
])) :-
    item('Cucumber') possessedBy X.
%}

%{
test(plasticBag, all(X=[region('House')])) :-
    item('PlasticBag') inRegion region('House'),
    item('PlasticBag') inRegion X.

test(plasticBag, all(X=[location('LivingRoom')])) :-
    item('PlasticBag') inLocation location('LivingRoom'),
    item('PlasticBag') inLocation X.

test(plasticBag, all(X=[])) :-
    item('PlasticBag') inItem X.

test(plasticBag, all(X=[])) :-
    item('PlasticBag') onItem X.

test(plasticBag, all(X=[])) :-
    item('PlasticBag') partOfItem X.

test(plasticBag, all(X=[
    character('Alice')
])) :-
    item('PlasticBag') takenOfCharacter X.

test(plasticBag, all(X=[
])) :-
    item('PlasticBag') wornOfCharacter X.

test(plasticBag, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('PlasticBag') enclosedBy X.

test(plasticBag, all(X=[
])) :-
    item('PlasticBag') supportedBy X.

test(plasticBag, all(X=[
])) :-
    item('PlasticBag') composedBy X.

test(plasticBag, all(X=[
    character('Alice')
])) :-
    item('PlasticBag') possessedBy X.
%}

%{
test(handphone, all(X=[region('House')])) :-
    item('Handphone') inRegion region('House'),
    item('Handphone') inRegion X.

test(handphone, all(X=[location('LivingRoom')])) :-
    item('Handphone') inLocation location('LivingRoom'),
    item('Handphone') inLocation X.

test(handphone, all(X=[])) :-
    item('Handphone') inItem X.

test(handphone, all(X=[])) :-
    item('Handphone') onItem X.

test(handphone, all(X=[])) :-
    item('Handphone') partOfItem X.

test(handphone, all(X=[
    character('Alice')
])) :-
    item('Handphone') takenOfCharacter X.

test(handphone, all(X=[
])) :-
    item('Handphone') wornOfCharacter X.

test(handphone, all(X=[
    location('LivingRoom'),
    region('House'),
    location('MeadowClearing'),
    region('Forest'),
    region('Country')
])) :-
    item('Handphone') enclosedBy X.

test(handphone, all(X=[
])) :-
    item('Handphone') supportedBy X.

test(handphone, all(X=[
])) :-
    item('Handphone') composedBy X.

test(handphone, all(X=[
    character('Alice')
])) :-
    item('Handphone') possessedBy X.
%}

:- end_tests(complexLocation).
