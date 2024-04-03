:- begin_tests(enclosedBy, [
    setup((
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        assertzUniq(item('Apple')),
        placeInLocation(item('Apple'), location('LivingRoom')),
        assertzUniq(character('Alice')),
        placeInLocation(character('Alice'), location('Street')),
        assertzUniq(item('Pear')),
        assertzUniq(item('Box')),
        assertzUniq(container(item('Box'))),
        assertzUniq(item('Cupboard')),
        assertzUniq(container(item('Cupboard'))),
        placeInLocation(item('Cupboard'), location('LivingRoom')),
        placeInContainer(item('Box'), item('Cupboard')),
        placeInContainer(item('Pear'), item('Box')),
        placeInLocation(location('LivingRoom'), location('MeadowClearing'))
    ))
]).

:- use_module(game).

test(appleInLivingRoom, all(X = [location('LivingRoom'), location('MeadowClearing')])) :-
    enclosedBy(item('Apple'), X).

test(appleInStreet, all(X = [location('Street')])) :-
    placeInLocation(item('Apple'), location('Street')),
    enclosedBy(item('Apple'), X).

test(inLocation, all(X = [location('Street')])) :-
    enclosedBy(item(frontOf(door('RedDoor'))), X).

test(inLocation, all(X = [location('Street'), location('LivingRoom'), location('MeadowClearing')])) :-
    enclosedBy(door('RedDoor'), X).

test(aliceInStreet, all(X = [location('Street')])) :-
    enclosedBy(character('Alice'), X).

test(cupboardInLivingRoom, all(X=[location('LivingRoom'), location('MeadowClearing')])) :-
    enclosedBy(item('Cupboard'), X).

test(cupboardInLivingRoom2, all(X=[location('LivingRoom'), location('MeadowClearing')])) :-
    item('Cupboard') enclosedBy X.

test(boxInLivingRoom, all(X=[item('Cupboard'), location('LivingRoom'), location('MeadowClearing')])) :-
    enclosedBy(item('Box'), X).

test(boxInLivingRoom2, all(X=[item('Cupboard'), location('LivingRoom'), location('MeadowClearing')])) :-
    item('Box') enclosedBy X.

test(pearInLivingRoom, all(X=[item('Box'), item('Cupboard'), location('LivingRoom'), location('MeadowClearing')])) :-
    enclosedBy(item('Pear'), X).

test(pearInLivingRoom2, all(X=[item('Box'), item('Cupboard'), location('LivingRoom'), location('MeadowClearing')])) :-
    item('Pear') enclosedBy X.

test(livingRoomEnclosedByMeadowClearing, all(X=[location('MeadowClearing')])) :-
    location('LivingRoom') enclosedBy X.

:- end_tests(enclosedBy).
