:- module(game, [
    inRegion/2,
    inLocation/2,
    inItem/2,
    onItem/2,
    partOfItem/2,
    takenOfCharacter/2,
    wornOfCharacter/2,

    inSameLocation/4,
    inSameLocation/3,

    enclosedBy/2,
    supportedBy/2,
    composedBy/2,
    possessedBy/2,

    setEnterable/2,
    setOpenable/2,
    setOpenable/3,
    setLockable/4,
    setLockable/3,
    setLockable/2,
    setTakeable/2,
    setWearable/2,

    canEnter/1,
    canOpen/1,
    canOpen/2,
    canLock/3,
    canTake/1,
    canWear/1,

    makeDoor/3,
    goThroughDoor/4,
    openDoor/4,
    closeDoor/4,
    openDoorIfClosed/4,
    closeDoorIfOpen/3,
    lockDoor/1, unlockDoor/1,
    lockDoor/4,
    unlockDoor/4,
    unlockDoorIfLocked/4,

    isLocked/1, isUnlocked/1,
    isOpened/1, isClosed/1,
    lockItem/1, unlockItem/1,
    openItem/1, closeItem/1,

    takeItem/4,

    setAsKeyOf/2,
    keyOfItem/2,
    op(700, xfx, keyOfItem),

    toBool/2,
    info/2,
    assertaUniq/1,
    assertzUniq/1,
    retract_all_with_term/1,
    deleteAttribute/2,
    setAttribute/3,
    getAttribute/3,

    placeInRegion/2,
    placeInLocation/2,
    placeInContainer/2,
    placeOnSupporter/2,
    placeAsPartOf/2,
    placeAsTakenOf/2,
    placeAsWornOf/2,
    op(700, xfx, inRegion),
    op(700, xfx, inLocation),
    op(700, xfx, inItem),
    op(700, xfx, onItem),
    op(700, xfx, partOfItem),
    op(700, xfx, takenOfCharacter),
    op(700, xfx, wornOfCharacter),
    op(700, xfx, enclosedBy),
    op(700, xfx, supportedBy),
    op(700, xfx, composedBy),
    op(700, xfx, possessedBy),

    simulateUnlockItem/5,
    commitMutations/1
]).

export_dynamic(Pred/Arity) :-
    dynamic(Pred/Arity),
    export(Pred/Arity).

:- export_dynamic(item/1).
:- export_dynamic(location/1).
:- export_dynamic(region/1).
:- export_dynamic(character/1).
:- export_dynamic(door/1).

% player(character(A))
:- export_dynamic(player/1).

% container(item(A))
:- export_dynamic(container/1).
% supporter(item(A))
:- export_dynamic(supporter/1).

% enterable(item(A), true)
:- dynamic enterable/2.
/*
     inItem,  openable | A phone booth can be opened from the inside
     inItem, !openable | Airplane doors, prison doors, transport truck doors, bank vaults/safes, etc. aren't openable from the inside
    !inItem,  openable | A phone booth can be opened from the outside
    !inItem, !openable | emergency exits, windows, safe rooms, security doors cannot be opened from the outside

    setOpenable(item(A), inItem, true)
    setOpenable(item(A), inItem, false)
*/
:- dynamic openable/3.
/*
     inItem,  lockable,  needKey | A bit weird to require a key to lock a booth from the inside
     inItem,  lockable, !needKey | Like locking a booth from the inside without the key
     inItem, !lockable,  N/A     | Some booths cannot be locked from the inside (like a telephone booth)
    !inItem,  lockable,  needKey | Like locking a treasure chest from the outside with a key
    !inItem,  lockable, !needKey | Like closing a latch on a chest. Doesn't need a key.
    !inItem, !lockable,  N/A     | Most boxes can't be locked from the outside

    setLockable(item(A), InItem, true, NeedKey)
    setLockable(item(A), InItem, false)
*/
:- dynamic lockable/4.
% takeable(item(A), true)
:- dynamic takeable/2.
% wearable(item(A), true)
:- dynamic wearable/2.

toBool(Pred, Result) :-
    Pred ->
    Result = true ;
    Result = false.

setEnterable(item(A), Bool) :-
    container(item(A)),
    retractall(enterable(item(A), _)),
    toBool(Bool, Value),
    assertzUniq(enterable(item(A), Value)).

setOpenable(item(A), BoolInItem, BoolOpenable) :-
    (
        container(item(A)) -> true ;
        A = frontOf(door(_)) -> true ;
        A = backOf(door(_))
    ),
    retractall(openable(item(A), BoolInItem, _)),
    toBool(BoolOpenable, Value),
    assertzUniq(openable(item(A), BoolInItem, Value)).

setOpenable(item(A), Bool) :-
    setOpenable(item(A), true, Bool),
    setOpenable(item(A), false, Bool).

setOpenable(door(A), Bool) :-
    toBool(Bool, Value),
    setOpenable(item(frontOf(door(A))), Value),
    setOpenable(item(backOf(door(A))), Value).

setLockable(item(A), BoolInItem, true, BoolNeedKey) :-
    (
        container(item(A)) -> true ;
        A = frontOf(door(_)) -> true ;
        A = backOf(door(_))
    ),
    toBool(BoolInItem, ValueInItem),
    toBool(BoolNeedKey, ValueNeedKey),
    retractall(lockable(item(A), ValueInItem, _, _)),
    assertzUniq(lockable(item(A), ValueInItem, true, ValueNeedKey)).

setLockable(item(A), BoolInItem, false) :-
    (
        container(item(A)) -> true ;
        A = frontOf(door(_)) -> true ;
        A = backOf(door(_))
    ),
    toBool(BoolInItem, ValueInItem),
    retractall(lockable(item(A), ValueInItem, _, _)),
    assertzUniq(lockable(item(A), ValueInItem, false, false)).

setLockable(door(A), true) :-
    setLockable(item(frontOf(door(A))), false, true, true),
    setLockable(item(backOf(door(A))), false, true, false).

setLockable(door(A), false) :-
    setLockable(item(frontOf(door(A))), false, false),
    setLockable(item(backOf(door(A))), false, false).

setTakeable(item(A), Bool) :-
    retractall(takeable(item(A), _)),
    toBool(Bool, Value),
    assertzUniq(takeable(item(A), Value)).

setTakeable(door(A), Bool) :-
    setTakeable(item(frontOf(door(A))), Bool),
    setTakeable(item(backOf(door(A))), Bool).

setWearable(item(A), Bool) :-
    retractall(wearable(item(A), _)),
    toBool(Bool, Value),
    assertzUniq(wearable(item(A), Value)).

canEnter(A) :- enterable(A, true).
canOpen(A) :-
    openable(A, true, true),
    openable(A, false, true).
canOpen(A, InItem) :-
    openable(A, InItem, true).
canLock(A, InItem, NeedKey) :-
    lockable(A, InItem, true, NeedKey).
canTake(A) :-
    takeable(A, false) -> false ;
    takeable(A, true) -> true ;
    % Items that are partOf something else cannot be taken by default
    partOfItem(A, _) -> false ;
    % Allow items to be taken by default
    A = item(_) -> true ;
    false.
canWear(A) :- wearable(A, true).

% takeCapacity(character(A), 2)
:- dynamic takeCapacity/2.
getTakeCapacity(character(A), TakeCapacity) :-
    takeCapacity(character(A), TakeCapacity) -> true ;
    % Default take capacity is two (for two hands).
    TakeCapacity = 2.

% requiredTakeCapacity(item(A), 1)
:- dynamic requiredTakeCapacity/2.
getRequiredTakeCapacity(item(A), RequiredTakeCapacity) :-
    requiredTakeCapacity(item(A), RequiredTakeCapacity) -> true ;
    % Most items only need one hand to take
    RequiredTakeCapacity = 1.

sumListImpl([], Result, Result).
sumListImpl([Head|Tail], Accumulator, Result) :-
    sumListImpl(Tail, Accumulator + Head, Result).
sumList(List, Result) :-
    sumListImpl(List, 0, Result).

concatListImpl([], Result, Result).
concatListImpl([Head|Tail], Accumulator, Result) :-
    string_concat(Accumulator, Head, X),
    concatListImpl(Tail, X, Result).
concatList(List, Result) :-
    concatListImpl(List, "", Result).

getUsedTakeCapacity(character(A), UsedTakeCapacity) :-
    findall(
        RequiredTakeCapacity,
        (takenOfCharacter(X, character(A)), getRequiredTakeCapacity(X, RequiredTakeCapacity)),
        RequiredTakeCapacityList
    ),
    sumList(RequiredTakeCapacityList, Sum),
    UsedTakeCapacity is Sum.

getRemainingTakeCapacity(character(A), RemainingTakeCapacity) :-
    getTakeCapacity(character(A), TakeCapacity),
    getUsedTakeCapacity(character(A), UsedTakeCapacity),
    RemainingTakeCapacity is TakeCapacity - UsedTakeCapacity.

hasEnoughRemainingTakeCapacity(character(C), item(I)) :-
    getRequiredTakeCapacity(item(I), RequiredTakeCapacity),
    getRemainingTakeCapacity(character(C), RemainingTakeCapacity),
    RemainingTakeCapacity >= RequiredTakeCapacity.


% frontOf(door(A))
:- export_dynamic(frontOf/1).

% backOf(door(A))
:- export_dynamic(backOf/1).

% description(A, "string").
:- export_dynamic(description/2).

% attribute(A, Name, Value).
:- export_dynamic(attribute/3).

% leadsTo(item(A), location(Dst))
:- export_dynamic(leadsTo/2).

:- dynamic in/2.
:- dynamic on/2.
:- dynamic partOf/2.
:- dynamic takenOf/2.
:- dynamic wornOf/2.
:- dynamic keyOf/2.

retractPositionInfo(A) :-
    retractall(in(A, _)),
    retractall(on(A, _)),
    retractall(partOf(A, _)),
    retractall(takenOf(A, _)),
    retractall(wornOf(A, _)).

inRegion(A, region(B)) :-
    A = region(_) ->
    (
        in(A, region(B)) -> true ;
        in(A, X), inRegion(X, region(B))
    ) ;
    A = location(_) ->
    (
        in(A, region(B)) -> true ;
        in(A, location(X)), inRegion(location(X), region(B))
    ) ;
    inLocation(A, location(X)), inRegion(location(X), region(B)).

inLocation(A, location(B)) :-
    A = item(_) ->
    (
        in(A, location(B)) -> true ;
        in(A, X), X = item(_), inLocation(X, location(B)) -> true ;
        on(A, X), inLocation(X, location(B)) -> true ;
        partOf(A, X), inLocation(X, location(B)) -> true ;
        takenOf(A, X), inLocation(X, location(B)) -> true ;
        wornOf(A, X), inLocation(X, location(B))
    ) ;
    A = character(_) ->
    (
        in(A, location(B)) -> true ;
        in(A, X), inLocation(X, location(B))
    ) ;
    A = door(_) ->
    (
        in(item(frontOf(A)), location(B)) ;
        in(item(backOf(A)), location(B))
    ) ;
    A = location(_) ->
    in(A, location(B)) ;
    A = region(_) ->
    (
        in(A, location(B)) -> true ;
        in(A, X), inLocation(X, location(B))
    ) ;
    false.

inItem(A, item(B)) :-
    in(A, item(B)) -> true ;
    on(A, X), inItem(X, item(B)) ;
    partOf(A, X), inItem(X, item(B)).

onItem(A, item(B)) :-
    on(A, item(B)).

partOfItem(A, item(B)) :-
    partOf(A, item(B)).

takenOfCharacter(A, character(B)) :-
    takenOf(A, character(B)).

wornOfCharacter(A, character(B)) :-
    wornOf(A, character(B)).

enclosedBy(A, B) :-
    A = door(_) ->
    (
        enclosedBy(item(frontOf(A)), B) ;
        enclosedBy(item(backOf(A)), B)
    ) ;
    in(A, B) ;
    in(A, X), enclosedBy(X, B) ;
    on(A, X), enclosedBy(X, B) ;
    partOf(A, X), enclosedBy(X, B) ;
    takenOf(A, X), enclosedBy(X, B) ;
    wornOf(A, X), enclosedBy(X, B).

supportedBy(A, B) :-
    on(A, B) ;
    in(A, X), supportedBy(X, B) ;
    on(A, X), supportedBy(X, B) ;
    partOf(A, X), supportedBy(X, B).

composedBy(A, B) :-
    partOf(A, B) ;
    partOf(A, X), composedBy(X, B).

possessedBy(A, B) :-
    takenOf(A, B) ;
    wornOf(A, B) ;
    in(A, X), possessedBy(X, B) ;
    on(A, X), possessedBy(X, B) ;
    partOf(A, X), possessedBy(X, B).

assertaUniq(X) :-
    (
        X ->
            true ;
            asserta(X)
    ).

assertzUniq(X) :-
    (
        X ->
            true ;
            assertz(X)
    ).

makeDoor(door(A), location(Front), location(Back)) :-
    \+ door(A),
    assertzUniq(door(A)),
    assertzUniq(frontOf(door(A))),
    assertzUniq(backOf(door(A))),
    assertzUniq(location(Front)),
    assertzUniq(location(Back)),
    assertzUniq(leadsTo(item(frontOf(door(A))), location(Back))),
    assertzUniq(leadsTo(item(backOf(door(A))), location(Front))),
    placeInLocation(item(frontOf(door(A))), location(Front)),
    placeInLocation(item(backOf(door(A))), location(Back)),
    setAttribute(door(A), open, false),
    setAttribute(door(A), locked, false),
    setOpenable(door(A), true),
    setLockable(door(A), true),
    setTakeable(door(A), false).

deleteAttribute(A, Name) :-
    retractall(attribute(A, Name, _)).

setAttribute(A, Name, Value) :-
    retractall(attribute(A, Name, _)),
    assertzUniq(attribute(A, Name, Value)).

getAttribute(A, Name, Value) :-
    attribute(A, Name, Value).

openDoorIfClosed(character(C), DoorItem, Success, TextOutput) :-
    (
        DoorItem = item(frontOf(Door)) -> true ;
        DoorItem = item(backOf(Door))
    ),
    (
        getAttribute(Door, open, IsOpen),
        (
            IsOpen ->
            TextOutput = [],
            Success = true ;
            (
                canOpen(DoorItem) ->
                (
                    unlockDoorIfLocked(character(C), Door, UnlockSuccess, UnlockTextOutput) ->
                    (
                        UnlockSuccess ->
                        setAttribute(Door, open, true),
                        append(UnlockTextOutput, ["You open the door."], TextOutput),
                        Success = true ;
                        TextOutput = UnlockTextOutput,
                        Success = false
                    ) ;
                    TextOutput = ["The door cannot be unlocked."],
                    Success = false
                )
                ;
                TextOutput = ["The door cannot be opened."],
                Success = false
            )
        )
    ).

closeDoorIfOpen(DoorItem, Success, TextOutput) :-
    (
        DoorItem = item(frontOf(Door)) -> true ;
        DoorItem = item(backOf(Door))
    ),
    (
        getAttribute(Door, open, IsOpen),
        (
            IsOpen ->
            (
                canOpen(DoorItem) ->
                setAttribute(Door, open, false),
                TextOutput = ["You close the door."],
                Success = true
                ;
                TextOutput = ["The door cannot be closed."],
                Success = false
            ) ;
            TextOutput = [],
            Success = true
        )
    ).

inSameLocation(character(C), door(D), Item, Location) :-
    inLocation(character(C), CurLocation),
    (
        inLocation(item(frontOf(door(D))), CurLocation) ->
        Item = item(frontOf(door(D))),
        Location = CurLocation ;
        inLocation(item(backOf(door(D))), CurLocation) ->
        Item = item(backOf(door(D))),
        Location = CurLocation ;
        false
    ).

inSameLocation(character(C), door(D), Location) :-
    inSameLocation(character(C), door(D), _, Location).

inSameLocation(character(C), item(I), Location) :-
    inLocation(character(C), Location),
    inLocation(item(I), Location).

isUnlocked(A) :- getAttribute(A, locked, false).
isLocked(A) :- getAttribute(A, locked, true).
getLockedValue(A, IsLocked) :- getAttribute(A, locked, IsLocked).

isOpened(A) :- getAttribute(A, open, true).
isClosed(A) :- getAttribute(A, open, false).
getOpenedValue(A, IsOpened) :- getAttribute(A, open, IsOpened).

lockDoor(door(D)) :-
    setAttribute(door(D), locked, true).

unlockDoor(door(D)) :-
    setAttribute(door(D), locked, false).

lockItem(item(I)) :-
    setAttribute(item(I), locked, true).

unlockItem(item(I)) :-
    setAttribute(item(I), locked, false).

openItem(item(I)) :-
    setAttribute(item(I), open, true).

closeItem(item(I)) :-
    setAttribute(item(I), open, false).

getSideOfDoorString(item(A), Str) :-
    A = frontOf(door(_)) -> Str = "front" ;
    A = backOf(door(_)) -> Str = "back" ;
    false.

lockDoor(character(C), door(D), Success, TextOutput) :-
    inSameLocation(character(C), door(D), DoorItem, _),
    getAttribute(door(D), locked, IsLocked),
    (
        IsLocked ->
        TextOutput = ["The door is already locked."],
        Success = true ;
        canLock(DoorItem, false, NeedsKey) ->
        (
            (
                NeedsKey ->
                keyOfItem(KeyItem, DoorItem), possessedBy(KeyItem, character(C)) ;
                true
            ) ->
            (
                closeDoorIfOpen(DoorItem, CloseSuccess, CloseTextOutput) ->
                (
                    CloseSuccess ->
                    setAttribute(door(D), locked, true),
                    append(CloseTextOutput, ["You lock the door."], TextOutput),
                    Success = true ;
                    TextOutput = CloseTextOutput,
                    Success = false
                ) ;
                TextOutput = ["The door cannot be closed."],
                Success = false
            ) ;
            TextOutput = ["You do not have a key to the door."],
            Success = false
        ) ;
        getSideOfDoorString(DoorItem, Side),
        concatList(["The door cannot be locked from the ", Side, "."], Str),
        TextOutput = [Str],
        Success = false
    ).

canUnlockDoor(character(C), door(D)) :-
    unlockDoor(character(C), door(D), Success, _, false),
    Success.

unlockDoor(character(C), door(D), Success, TextOutput) :-
    unlockDoor(character(C), door(D), Success, TextOutput, true).

unlockDoor(character(C), door(D), Success, TextOutput, Commit) :-
    inSameLocation(character(C), door(D), DoorItem, _),
    getAttribute(door(D), locked, IsLocked),
    (
        IsLocked ->
        (
            canLock(DoorItem, false, NeedsKey) ->
            (
                (
                    NeedsKey ->
                    keyOfItem(KeyItem, DoorItem), possessedBy(KeyItem, character(C)) ;
                    true
                ) ->
                (
                    (
                        Commit ->
                        setAttribute(door(D), locked, false) ;
                        true
                    ),
                    TextOutput = ["You unlock the door."],
                    Success = true
                ) ;
                TextOutput = ["You do not have a key to the door."],
                Success = false
            ) ;
            getSideOfDoorString(DoorItem, Side),
            concatList(["The door cannot be unlocked from the ", Side, "."], Str),
            TextOutput = [Str],
            Success = false
        ) ;
        TextOutput = ["The door is already unlocked."],
        Success = true
    ).

find_one(Template, Goal, Result) :-
    findnsols(1, Template, Goal, [Result]), !.

reverseListImpl([], Result, Result).
reverseListImpl([Head|Tail], Accumulator, Result) :-
    reverseListImpl(Tail, [Head|Accumulator], Result).
reverseList(List, Result) :-
    reverseListImpl(List, [], Result).

getItemName(item(A), Str) :-
    term_string(A, Str).

/*
    in - We assume this was already checked.
    on - We need to check this for opening items.
    partOf - We assume this was already checked
    takenOf - We assume this was already checked
    wornOf - We assume this was already checked
*/
/*
    Assumes CurItem already unlocked.
*/
simulateUnlockAndOpenEnclosureListImpl_OpenBranch(character(C), CurItem, OtherItems, OutSuccess, OutText, OutMutations) :-
    getOpenedValue(CurItem, IsOpened) ->
    (
        IsOpened ->
        simulateUnlockAndOpenEnclosureListImpl(character(C), OtherItems, OutSuccess, OutText, OutMutations) ;
        \+ canOpen(CurItem) ->
        OutSuccess = false,
        OutText = ["The item is in a container that cannot be opened."],
        OutMutations = [] ;
        onItem(_, CurItem) ->
        OutSuccess = false,
        OutText = ["The item is in a container that cannot be opened because there are things on it."],
        OutMutations = [] ;
        simulateUnlockAndOpenEnclosureListImpl(character(C), OtherItems, OutSuccess2, OutText2, OutMutations2),
        (
            OutSuccess2 ->
            OutSuccess = true,
            getItemName(CurItem, ItemName),
            concatList(["You open the ", ItemName, "."], Str),
            append(
                [Str],
                OutText2,
                OutText
            ),
            append(
                [openItem(CurItem)],
                OutMutations2,
                OutMutations
            ) ;
            OutSuccess = false,
            OutText = OutText2,
            OutMutations = []
        )
    ) ;
    simulateUnlockAndOpenEnclosureListImpl(character(C), OtherItems, OutSuccess, OutText, OutMutations).
simulateUnlockAndOpenEnclosureListImpl(character(_), [], OutSuccess, OutText, OutMutations) :-
    OutSuccess = true,
    OutText = [],
    OutMutations = [].
simulateUnlockAndOpenEnclosureListImpl(character(C), InItems, OutSuccess, OutText, OutMutations) :-
    InItems = [CurItem | OtherItems],
    (
        isLocked(CurItem) ->
        (
            % We assume the character is not in the enclosure
            canLock(CurItem, /*inItem*/false, NeedsKey) ->
            (
                (
                    NeedsKey ->
                    keyOfItem(KeyItem, CurItem), possessedBy(KeyItem, character(C)) ;
                    true
                ) ->
                (
                    simulateUnlockAndOpenEnclosureListImpl_OpenBranch(character(C), CurItem, OtherItems, OutSuccess2, OutText2, OutMutations2),
                    (
                        OutSuccess2 ->
                        (
                            OutSuccess = true,
                            getItemName(CurItem, ItemName),
                            concatList(["You unlock the ", ItemName, "."], Str),
                            append(
                                [Str],
                                OutText2,
                                OutText
                            ),
                            append(
                                [unlockItem(CurItem)],
                                OutMutations2,
                                OutMutations
                            )
                        ) ;
                        OutSuccess = false,
                        OutText = OutText2,
                        OutMutations = []
                    )
                ) ;
                OutSuccess = false,
                OutText = ["The item is in a container that cannot be unlocked because you do not have the key."],
                OutMutations = []
            ) ;
            OutSuccess = false,
            OutText = ["The item is in a container that cannot be unlocked."],
            OutMutations = []
        ) ;
        simulateUnlockAndOpenEnclosureListImpl_OpenBranch(character(C), CurItem, OtherItems, OutSuccess, OutText, OutMutations)
    ).

simulateUnlockAndOpenEnclosures(character(C), item(I), OutSuccess, OutText, OutMutations) :-
    findall(
        Enclosure,
        (
            Enclosure = item(_),
            enclosedBy(item(I), Enclosure),
            \+ enclosedBy(character(C), Enclosure)
        ),
        Enclosures
    ),
    reverseList(Enclosures, ReversedList),
    simulateUnlockAndOpenEnclosureListImpl(character(C), ReversedList, OutSuccess, OutText, OutMutations).
/*
    Types of mutation queries,
    + Does direct low-level mutation make sense?
        + canOpen()
    + Can the character perform the mutation?
        + simulateOpenItem(Success)

    Types of mutations,
    + Direct low-level mutation
        + Directly modifying attributes
        + Directly asserting and retracting facts
        + openItem()
    + Character attempted mutations
        + simulateOpenItem(Success, Mutation), Success, commitMutations(Mutation)
*/
simulateUnlockItem(character(C), item(I), OutSuccess, OutTexts, OutMutations) :-
    simulateUnlockItem(character(C), item(I), OutSuccess, OutTexts, OutMutations, false).
simulateUnlockItem(character(C), item(I), OutSuccess, OutTexts, OutMutations, IsCompositeAction) :-
    inSameLocation(character(C), item(I), _) ->
    (
        possessedBy(item(I), PossessingCharacter), PossessingCharacter \= character(C) ->
        OutSuccess = false,
        OutTexts = ["Someone else has the item."],
        OutMutations = [] ;
        simulateUnlockAndOpenEnclosures(
            character(C),
            item(I),
            EnclosureSuccess,
            EnclosureTexts,
            EnclosureMutations
        ),
        (
            \+ EnclosureSuccess ->
            OutSuccess = false,
            OutTexts = EnclosureTexts,
            OutMutations = [] ;
            (
                getLockedValue(item(I), IsLocked) ->
                (
                    \+ IsLocked ->
                    (
                        IsCompositeAction ->
                        OutSuccess = true,
                        OutTexts = EnclosureTexts,
                        OutMutations = EnclosureMutations ;
                        OutSuccess = true,
                        OutTexts = ["The item is already unlocked."],
                        OutMutations = []
                    ) ;
                    toBool(in(character(C), item(I)), InItem),
                    (
                        canLock(item(I), InItem, NeedsKey) ->
                        (
                            (
                                NeedsKey ->
                                keyOfItem(KeyItem, item(I)), possessedBy(KeyItem, character(C)) ;
                                true
                            ) ->
                            OutSuccess = true,
                            append(
                                EnclosureTexts,
                                ["You unlock the item."],
                                OutTexts
                            ),
                            append(
                                EnclosureMutations,
                                [unlockItem(item(I))],
                                OutMutations
                            );
                            OutSuccess = false,
                            OutTexts = ["You do not have a key to the item."],
                            OutMutations = []
                        ) ;
                        (
                            OutSuccess = false,
                            (
                                InItem ->
                                OutTexts = ["The item cannot be unlocked from the inside."] ;
                                OutTexts = ["The item cannot be unlocked."]
                            ),
                            OutMutations = []
                        )
                    )
                ) ;
                (
                    IsCompositeAction ->
                    OutSuccess = true,
                    OutTexts = EnclosureTexts,
                    OutMutations = EnclosureMutations ;
                    OutSuccess = true,
                    OutTexts = ["The item cannot be unlocked."],
                    OutMutations = []
                )
            )
        )
    ) ;
    OutSuccess = false,
    OutTexts = ["The item is somewhere else."],
    OutMutations = [].

simulateOpenItem(character(C), item(I), OutSuccess, OutTexts, OutMutations, IsCompositeAction) :-
    simulateUnlockItem(character(C), item(I), UnlockSuccess, UnlockTexts, UnlockMutations, true),
    \+ UnlockSuccess ->
    OutSuccess = false,
    OutTexts = UnlockTexts,
    OutMutations = [] ;
    (
        getOpenedValue(item(I), IsOpened) ->
        (
            IsOpened ->
            (
                IsCompositeAction ->
                OutSuccess = true,
                OutTexts = UnlockTexts,
                OutMutations = UnlockMutations ;
                OutSuccess = true,
                OutTexts = ["The item is already opened."],
                OutMutations = []
            ) ;
            toBool(in(character(C), item(I)), InItem),
            (
                canOpen(item(I), InItem) ->
                (
                    OutSuccess = true,
                    append(
                        UnlockTexts,
                        ["You open the item."],
                        OutTexts
                    ),
                    append(
                        UnlockMutations,
                        [openItem(item(I))],
                        OutMutations
                    )
                ) ;
                (
                    OutSuccess = false,
                    (
                        InItem ->
                        OutTexts = ["The item cannot be opened from the inside."] ;
                        OutTexts = ["The item cannot be opened."]
                    ),
                    OutMutations = []
                )
            )
        ) ;
        (
            IsCompositeAction ->
            OutSuccess = true,
            OutTexts = UnlockTexts,
            OutMutations = UnlockMutations ;
            OutSuccess = true,
            OutTexts = ["The item cannot be opened."],
            OutMutations = []
        )
    ).

unlockDoorIfLocked(character(C), door(D), Success, TextOutput) :-
    unlockDoor(character(C), door(D), SuccessImpl, TextOutputImpl),
    (
        SuccessImpl = true, TextOutputImpl = ["The door is already unlocked."] ->
        Success = true,
        TextOutput = [] ;
        Success = SuccessImpl,
        TextOutput = TextOutputImpl
    ).

openDoor(character(C), door(D), Success, TextOutput) :-
    inSameLocation(character(C), door(D), _),
    getAttribute(door(D), open, IsOpen),
    (
        IsOpen ->
        TextOutput = ["The door is already open."],
        Success = true
        ;
        setAttribute(door(D), open, true),
        TextOutput = ["You open the door."],
        Success = true
    ).

closeDoor(character(C), door(D), Success, TextOutput) :-
    inSameLocation(character(C), door(D), _),
    getAttribute(door(D), open, IsOpen),
    (
        IsOpen ->
        setAttribute(door(D), open, false),
        TextOutput = ["You close the door."],
        Success = true
        ;
        TextOutput = ["The door is already closed."],
        Success = true
    ).

goThroughDoor(character(C), door(D), Success, TextOutput) :-
    inLocation(character(C), Src),
    (
        inLocation(item(frontOf(door(D))), Src) ->
        leadsTo(item(frontOf(door(D))), Dst),
        DoorItem = item(frontOf(door(D))) ;
        inLocation(item(backOf(door(D))), Src) ->
        leadsTo(item(backOf(door(D))), Dst),
        DoorItem = item(backOf(door(D))) ;
        false
    ),
    openDoorIfClosed(character(C), DoorItem, OpenSuccess, OpenTextOutput),
    (
        OpenSuccess ->
        placeInLocation(character(C), Dst),
        Success = true,
        append(OpenTextOutput, ["You walk through the door."], TextOutput)
        ;
        Success = false,
        TextOutput = OpenTextOutput
    ).

setAsKeyOf(item(A), item(B)) :-
    canLock(item(B), _, _),
    assertzUniq(keyOf(item(A), item(B))).

setAsKeyOf(item(A), door(B)) :-
    setAsKeyOf(item(A), item(frontOf(door(B)))),
    setAsKeyOf(item(A), item(backOf(door(B)))).

keyOfItem(item(A), item(B)) :-
    keyOf(item(A), item(B)).

placeInContainer(item(A), item(B)) :-
    container(item(B)),
    retractPositionInfo(item(A)),
    assertzUniq(in(item(A), item(B))).
placeInContainer(character(A), item(B)) :-
    container(item(B)),
    canEnter(item(B)),
    retractPositionInfo(character(A)),
    assertzUniq(in(character(A), item(B))).

placeInLocation(region(A), location(B)) :-
    retractPositionInfo(region(A)),
    assertzUniq(in(region(A), location(B))).

placeInLocation(location(A), location(B)) :-
    retractPositionInfo(location(A)),
    assertzUniq(in(location(A), location(B))).

placeInLocation(item(A), location(B)) :-
    retractPositionInfo(item(A)),
    assertzUniq(in(item(A), location(B))).

placeInLocation(character(A), location(B)) :-
    retractPositionInfo(character(A)),
    assertzUniq(in(character(A), location(B))).

placeInRegion(location(A), region(B)) :-
    retractPositionInfo(location(A)),
    assertzUniq(in(location(A), region(B))).

placeInRegion(region(A), region(B)) :-
    retractPositionInfo(region(A)),
    assertzUniq(in(region(A), region(B))).

placeOnSupporter(item(A), item(B)) :-
    supporter(item(B)),
    retractPositionInfo(item(A)),
    assertzUniq(on(item(A), item(B))).

placeAsPartOf(item(A), item(B)) :-
    retractPositionInfo(item(A)),
    assertzUniq(partOf(item(A), item(B))).

placeAsTakenOf(item(A), character(B)) :-
    retractPositionInfo(item(A)),
    assertzUniq(takenOf(item(A), character(B))).

placeAsWornOf(item(A), character(B)) :-
    retractPositionInfo(item(A)),
    assertzUniq(wornOf(item(A), character(B))).

/*
    Skips most checks. Only meant to be used internally.
*/
takeItemDirectlyImpl(character(C), item(I), Success, TextOutput) :-
    canTake(item(I)) ->
    (
        % Can we even reach the item?
        % Is it in something locked? in/2
        hasEnoughRemainingTakeCapacity(character(C), item(I)) ->
        (
            placeAsTakenOf(item(I), character(C)),
            Success = true,
            TextOutput = ["You take the item."]
        ) ;
        Success = false,
        TextOutput = ["Your hands are full."]
    ) ;
    Success = false,
    TextOutput = ["The item cannot be taken."].

takeItem(character(C), item(I), Success, TextOutput) :-
    inSameLocation(character(C), item(I), _),
    (
        takenOfCharacter(item(I), TakingCharacter) ->
        (
            TakingCharacter = character(C) ->
            Success = true,
            TextOutput = ["The item is already in your hands."] ;
            Success = false,
            TextOutput = ["The item is in someone else's hands."]
        ) ;
        partOfItem(item(I), _) ->
        Success = false,
        TextOutput = ["The item is a part of something else."] ;
        onItem(_, item(I)) ->
        Success = false,
        TextOutput = ["There are other things on the item."] ;
        wornOf(item(I), WearingCharacter) ->
        (
            WearingCharacter = character(C) ->
            (
                /*Unwear the item and take it if hands are free*/
                takeItemDirectlyImpl(character(C), item(I), TakeSuccess, TakeTextOutput),
                (
                    TakeSuccess ->
                    Success = true,
                    append(["You unequip the item."], TakeTextOutput, TextOutput) ;
                    Success = false,
                    TextOutput = TakeTextOutput
                )
            ) ;
            Success = false,
            TextOutput = ["The item is being worn by someone else."]
        ) ;
        % TODO
        false
    ).

dynamicPredicates(PredicateInfo, PredicateHead, PredicateName, Arity) :-
    current_predicate(game:PredicateInfo/Arity),
    functor(PredicateHead, PredicateInfo, Arity),
    term_string(PredicateInfo, PredicateName),
    predicate_property(PredicateHead, dynamic).

callableDynamicPredicate(Arity, PredicateInfo) :-
    current_predicate(game:PredicateInfo/Arity),
    functor(PredicateHead, PredicateInfo, Arity),
    term_string(PredicateInfo, _),
    predicate_property(PredicateHead, dynamic).

info(Arg,Info) :-
    callableDynamicPredicate(1, PredicateInfo),
    (
        Info =.. [PredicateInfo,Arg],
        call(Info) ;
        Info =.. [PredicateInfo,Arg],
        call(Info),
        info(Info, Info) ;
        Arg2 =.. [PredicateInfo,Arg],
        call(Arg2),
        info(Arg2, Info)
    ).

info(Arg,Info) :-
    callableDynamicPredicate(2, PredicateInfo),
    (
        Info =.. [PredicateInfo, Arg, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, Arg],
        call(Info)
    ).

info(Arg,Info) :-
    callableDynamicPredicate(3, PredicateInfo),
    (
        Info =.. [PredicateInfo, Arg, _, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, Arg, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, _, Arg],
        call(Info)
    ).

info(Arg,Info) :-
    callableDynamicPredicate(4, PredicateInfo),
    (
        Info =.. [PredicateInfo, Arg, _, _, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, Arg, _, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, _, Arg, _],
        call(Info) ;
        Info =.. [PredicateInfo, _, _, _, Arg],
        call(Info)
    ).

buildCall(Arity, PredicateInfo, Accumulator, List) :-
  Arity = 0 ->
  List = Accumulator ;
  NxtArity is Arity - 1,
  append(Accumulator, [_], NxtAccumulator),
  buildCall(NxtArity, PredicateInfo, NxtAccumulator, List).

getAllDynamicFacts(Fact) :-
  callableDynamicPredicate(Arity, PredicateInfo),
  buildCall(Arity, PredicateInfo, [PredicateInfo], List),
  Fact =.. List,
  call(Fact).

retractAllDynamicFacts() :-
  findall(Fact, getAllDynamicFacts(Fact), List),
  retract_list(List).

list_contains_sub_term([SubTerm|_], SubTerm).
list_contains_sub_term([Term|List], SubTerm) :-
    list_contains_sub_term(List, SubTerm) ;
    \+ atom(Term),
    contains_sub_term(Term, SubTerm).

contains_sub_term(Term, SubTerm) :-
    Term =.. List,       % Convert the term to a list
    list_contains_sub_term(List, SubTerm).

retract_list([]).
retract_list([H|T]) :-
    retractall(H),
    retract_list(T).

retract_all_with_term(Term) :-
    findall(X, info(Term, X), List),
    retract_list(List).

commitMutations([]).
commitMutations([H|T]) :-
    H =.. _,
    call(H),
    commitMutations(T).

setColors(item(A), List) :-
    setAttribute(item(A), colors, List).

/*
    + disk, square
    + cylinder, sphere, hemisphere, ovoid
    + cone, pyramid
    + cube, cuboid
*/
setShape(item(A), Shape) :-
    setAttribute(item(A), shape, Shape).

/*
    flat, long, short, contoured
*/
setDescriptions(item(A), List) :-
    setAttribute(item(A), descriptions, List).

setMaxDurability(item(A), MaxDurability) :-
    setAttribute(item(A), maxDurability, MaxDurability).

setCurDurability(item(A), CurDurability) :-
    setAttribute(item(A), curDurability, CurDurability).

/*
    setDurabilityDescriptions(item(A), [
        [1, "It is almost breaking."],
        [10, "It should be replaced soon."],
        [50, "It looks a little beat up."],
        [75, "It is starting to fray."],
        [90, "It has seen little use."],
        [100, "It looks brand new."]
    ])
*/
setDurabilityDescriptions(item(A), List) :-
    setAttribute(item(A), durabilityDescriptions, List).

/*
    floating point numbers in cm
*/
setVolume(item(A), [Width, Depth, Height]) :-
    setAttribute(item(A), volume, [Width, Depth, Height]).

/*
    setGrabPoints(item('toothbrush'), [item('handle')])
*/
setGrabPoints(item(A), List) :-
    setAttribute(item(A), grabPoints, List).

% makeDoor(door(a), location(x), location(y)).
% assert(frontOf(door(a))).
% game:info(frontOf(door(a)), X).
% game:info(a, X).
% findall(Fact, (door(Fact)), L).