:- begin_tests(openDoor, [
    setup((
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        assertzUniq(character('Alice')),
        setLocation(character('Alice'), location('Street'))
    )),
    cleanup((
        retract_all_with_term('RedDoor'),
        retract_all_with_term('Street'),
        retract_all_with_term('LivingRoom'),
        retract_all_with_term('Alice')
    ))
]).

:- use_module(game).

test(openDoor) :-
    getAttribute(door('RedDoor'), open, IsOpenA),
    \+ IsOpenA,
    openDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "You open the door."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    IsOpenB.

test(openDoorAgain) :-
    getAttribute(door('RedDoor'), open, IsOpenA),
    IsOpenA,
    openDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success,
    TextOutput = [
        "The door is already open."
    ],
    getAttribute(door('RedDoor'), open, IsOpenB),
    IsOpenB.

test(wrongLocation) :-
    setLocation(character('Alice'), location('TheWrongPlace')),
    \+ openDoor(character('Alice'), door('RedDoor'), _, _).

:- end_tests(openDoor).
