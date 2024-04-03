:- begin_tests(goThroughDoor, [
    setup((
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        assertzUniq(character('Alice')),
        placeInLocation(character('Alice'), location('Street'))
    ))
]).

:- use_module(game).

test(a) :-
    assertzUniq(container(item('Blah'))),
    setOpenable(item('Blah'), true, true),
    canOpen(item('Blah'), true).

test(a) :-
    setOpenable(item('Blah'), false, true),
    canOpen(item('Blah'), true).

test(a, fail) :-
    canOpen(blah, true).

test(a) :-
    canOpen(item(frontOf(door('RedDoor'))), true).

test(a) :-
    canOpen(item(frontOf(door('RedDoor'))), false).

test(a) :-
    canOpen(item(frontOf(door('RedDoor')))).

test(a) :-
    unlockDoorIfLocked(character('Alice'), door('RedDoor'), _, _).

test(goThroughDoor) :-
    getAttribute(door('RedDoor'), open, IsOpenA),
    \+ IsOpenA,
    goThroughDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "You open the door.",
        "You walk through the door."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    IsOpenB,
    inLocation(character('Alice'), location('LivingRoom')).

test(goThroughDoorAgain, all(Dst=[location('Street')])) :-
    getAttribute(door('RedDoor'), open, IsOpenA),
    IsOpenA,
    goThroughDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "You walk through the door."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    IsOpenB,
    inLocation(character('Alice'), Dst),
    Dst = location('Street').

test(goThroughDoor) :-
    setAttribute(door('RedDoor'), open, false),
    setOpenable(door('RedDoor'), false),
    goThroughDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false,
    TextOutput = [
        "The door cannot be opened."
    ].

test(wrongLocation) :-
    placeInLocation(character('Alice'), location('TheWrongPlace')),
    \+ goThroughDoor(character('Alice'), door('RedDoor'), _, _).

:- end_tests(goThroughDoor).
