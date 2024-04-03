:- begin_tests(inLocation, [
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

test(appleInLivingRoom, all(X = [location('LivingRoom')])) :-
    inLocation(item('Apple'), X).

test(appleInStreet, all(X = [location('Street')])) :-
    placeInLocation(item('Apple'), location('Street')),
    inLocation(item('Apple'), X).

test(inLocation, all(X = [location('Street')])) :-
    inLocation(item(frontOf(door('RedDoor'))), X).

test(inLocation, all(X = [location('Street'), location('LivingRoom')])) :-
    inLocation(door('RedDoor'), X).

test(aliceInStreet, all(X = [location('Street')])) :-
    inLocation(character('Alice'), X).

test(cupboardInLivingRoom) :-
    inLocation(item('Cupboard'), location('LivingRoom')).

test(cupboardInLivingRoom2) :-
    item('Cupboard') inLocation location('LivingRoom').

test(boxInLivingRoom) :-
    inLocation(item('Box'), location('LivingRoom')).

test(boxInLivingRoom2) :-
    item('Box') inLocation location('LivingRoom').

test(pearInLivingRoom) :-
    inLocation(item('Pear'), location('LivingRoom')).

test(pearInLivingRoom2) :-
    item('Pear') inLocation location('LivingRoom').

% Should fail {
test(cupboardInMeadowClearing, fail) :-
    inLocation(item('Cupboard'), location('MeadowClearing')).

test(cupboardInMeadowClearing2, fail) :-
    item('Cupboard') inLocation location('MeadowClearing').

test(boxInMeadowClearing, fail) :-
    inLocation(item('Box'), location('MeadowClearing')).

test(boxInMeadowClearing2, fail) :-
    item('Box') inLocation location('MeadowClearing').

test(pearInMeadowClearing, fail) :-
    inLocation(item('Pear'), location('MeadowClearing')).

test(pearInMeadowClearing2, fail) :-
    item('Pear') inLocation location('MeadowClearing').
%}

test(livingRoomInMeadowClearing) :-
    location('LivingRoom') inLocation location('MeadowClearing').

:- end_tests(inLocation).
