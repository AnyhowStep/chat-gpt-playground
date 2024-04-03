:- begin_tests(door, [
    setup((
        assertz(door('Apple')),
        assertzUniq(character('Alice')),
        placeInLocation(character('Alice'), location('Street')),
        makeDoor(door('RedDoor'), location('Street'), location('LivingRoom')),
        assertzUniq(item('RedKey')),
        setAsKeyOf(item('RedKey'), door('RedDoor'))
    ))
]).

:- use_module(game).

test(makeDoor) :-
    makeDoor(door('A'), location('Src'), location('Dst')).

test(noDuplicateDoor, fail) :-
    makeDoor(door('Duplicate'), location('DuplicateSrc1'), location('DuplicateDst1')),
    makeDoor(door('Duplicate'), location('DuplicateSrc2'), location('DuplicateDst2')).

test(door) :-
    door('RedDoor').

test(leadsTo, all(X = [location('LivingRoom')])) :-
    leadsTo(item(frontOf(door('RedDoor'))), X).

test(inLocation, all(X = [location('Street')])) :-
    inLocation(item(frontOf(door('RedDoor'))), X).

test(inLocation, all(X = [location('LivingRoom')])) :-
    inLocation(item(backOf(door('RedDoor'))), X).

test(inLocation, all(X = [location('Street'), location('LivingRoom')])) :-
    inLocation(door('RedDoor'), X).

%{
test(redKey) :-
    lockDoor(door('RedDoor')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true,
    TextOutput = ["The door is already locked."].

test(redKey, all(TextOutput=[["The door cannot be locked from the front."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), false),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(TextOutput=[["You do not have a key to the door."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, fail) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    deleteAttribute(door('RedDoor'), open),
    getAttribute(door('RedDoor'), open, _).

test(redKey, fail) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    deleteAttribute(door('RedDoor'), open),
    closeDoorIfOpen(door('RedDoor'), _, _).

test(redKey, all(TextOutput=[])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    deleteAttribute(door('RedDoor'), open),
    closeDoorIfOpen(item(frontOf(door('RedDoor'))), _, TextOutput).

test(redKey, all(TextOutput=[["The door cannot be closed."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    deleteAttribute(door('RedDoor'), open),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(TextOutput=[["The door cannot be closed."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, true),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(TextOutput=[["You close the door.", "You lock the door."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), true),
    setAttribute(door('RedDoor'), open, true),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["You lock the door."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), true),
    setAttribute(door('RedDoor'), open, false),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["You lock the door."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["You lock the door."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["The door cannot be locked from the back."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), false),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    lockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(DoorItem=[item(backOf(door('RedDoor')))])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), false),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    inSameLocation(character('Alice'), door('RedDoor'), DoorItem, _).

test(redKey, all(IsLocked=[false])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), false),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    getAttribute(door('RedDoor'), locked, IsLocked).

test(redKey, all(TextOutput=[["The door is already unlocked."]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    unlockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["The door cannot be unlocked from the back."]])) :-
    lockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), false),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    unlockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(TextOutput=[["You do not have a key to the door."]])) :-
    lockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('Street')),
    placeInLocation(character('Alice'), location('Street')),
    unlockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = false.

test(redKey, all(TextOutput=[["You unlock the door."]])) :-
    lockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeAsTakenOf(item('RedKey'), character('Alice')),
    placeInLocation(character('Alice'), location('Street')),
    unlockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(TextOutput=[["You unlock the door."]])) :-
    lockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), false),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('LivingRoom')),
    placeInLocation(character('Alice'), location('LivingRoom')),
    unlockDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    Success = true.

test(redKey, all(X=[[true, ["You open the door.","You walk through the door."]]])) :-
    unlockDoor(door('RedDoor')),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), true),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('Street')),
    placeInLocation(character('Alice'), location('Street')),
    goThroughDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    X = [Success, TextOutput].

test(redKey, all(X=[[false, ["The door cannot be unlocked."]]])) :-
    deleteAttribute(door('RedDoor'), locked),
    setLockable(door('RedDoor'), true),
    setOpenable(door('RedDoor'), true),
    setAttribute(door('RedDoor'), open, false),
    placeInLocation(item('RedKey'), location('Street')),
    placeInLocation(character('Alice'), location('Street')),
    goThroughDoor(character('Alice'), door('RedDoor'), Success, TextOutput),
    X = [Success, TextOutput].

%}

:- end_tests(door).
