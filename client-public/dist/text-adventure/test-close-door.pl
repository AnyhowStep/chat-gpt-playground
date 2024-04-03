:- begin_tests(closeDoor, [
    setup((
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        assertzUniq(character('Alice')),
        placeInLocation(character('Alice'), location('Street'))
    ))
]).

:- use_module(game).

test(closeDoorAlreadyClosed) :-
    getAttribute(door('RedDoor'), open, IsOpenA),
    \+ IsOpenA,
    closeDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "The door is already closed."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    \+ IsOpenB.

test(openThenCloseDoor) :-
    openDoor(character('Alice'), door('RedDoor'), _, _),
    getAttribute(door('RedDoor'), open, IsOpenA),
    IsOpenA,
    closeDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "You close the door."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    \+ IsOpenB.

test(wrongLocation) :-
    placeInLocation(character('Alice'), location('TheWrongPlace')),
    \+ closeDoor(character('Alice'), door('RedDoor'), _, _).

:- end_tests(closeDoor).
