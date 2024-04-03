:- begin_tests(takeItem, [
    setup((
        assertzUniq(character('Alice')),
        assertzUniq(item('AppleA')),
        assertzUniq(item('AppleB')),
        assertzUniq(item('AppleC')),
        assertzUniq(item('AppleD')),
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        placeInLocation(character('Alice'), location('Street')),
        placeInLocation(item('AppleA'), location('Street')),
        placeInLocation(item('AppleB'), location('Street')),
        placeInLocation(item('AppleC'), location('Street')),
        placeInLocation(item('AppleD'), location('LivingRoom'))
    ))
]).

:- use_module(game).

test(apple) :-
    takeItem(character('Alice'), item('AppleA'), Success, TextOutput),
    Success = true,
    TextOutput = ["You take the item."].

test(apple) :-
    takeItem(character('Alice'), item('AppleA'), Success, TextOutput),
    Success = true,
    TextOutput = ["The item is already in your hands."].

test(apple) :-
    takeItem(character('Alice'), item('AppleB'), Success, TextOutput),
    Success = true,
    TextOutput = ["You take the item."].

test(apple) :-
    takeItem(character('Alice'), item('AppleC'), Success, TextOutput),
    Success = false,
    TextOutput = ["Your hands are full."].

test(apple, fail) :-
    takeItem(character('Alice'), item('AppleD'), _, _).

test(door, all(X=[
    false
])) :-
    toBool(canTake(item(frontOf(door('RedDoor')))), X).

test(door, all(X=[
    [false, ["The item cannot be taken."]]
])) :-
    takeItem(character('Alice'), item(frontOf(door('RedDoor'))), Success, TextOutput),
    X = [Success, TextOutput].

test(door) :-
    placeInLocation(character('Alice'), location('LivingRoom')),
    takeItem(character('Alice'), item(backOf(door('RedDoor'))), Success, TextOutput),
    Success = false,
    TextOutput = ["The item cannot be taken."].

test(door, fail) :-
    placeInLocation(character('Alice'), location('Street')),
    takeItem(character('Alice'), item(backOf(door('RedDoor'))), _, _).

:- end_tests(takeItem).
