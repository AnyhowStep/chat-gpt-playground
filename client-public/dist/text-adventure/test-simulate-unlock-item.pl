:- begin_tests(simulateUnlockItem).

:- use_module(game).

doSetUp() :-
    retract_all_with_term('Alice'),
    retract_all_with_term('BoxA'),
    retract_all_with_term('BoxB'),
    retract_all_with_term('BoxC'),
    retract_all_with_term('BoxD'),
    retract_all_with_term('BoxE'),
    retract_all_with_term('BoxF'),
    retract_all_with_term('BoxG'),
    retract_all_with_term('BoxH'),
    retract_all_with_term('KeyA'),
    retract_all_with_term('KeyB'),
    retract_all_with_term('KeyC'),
    retract_all_with_term('KeyD'),
    retract_all_with_term('KeyE'),
    retract_all_with_term('KeyF'),
    retract_all_with_term('KeyG'),
    retract_all_with_term('KeyH'),
    assertzUniq(character('Alice')),
    assertzUniq(item('BoxA')), assertzUniq(container(item('BoxA'))),
    assertzUniq(item('BoxB')), assertzUniq(container(item('BoxB'))),
    assertzUniq(item('BoxC')), assertzUniq(container(item('BoxC'))),
    assertzUniq(item('BoxD')), assertzUniq(container(item('BoxD'))),
    assertzUniq(item('BoxE')), assertzUniq(container(item('BoxE'))),
    assertzUniq(item('BoxF')), assertzUniq(container(item('BoxF'))),
    assertzUniq(item('BoxG')), assertzUniq(container(item('BoxG'))),
    assertzUniq(item('BoxH')), assertzUniq(container(item('BoxH'))),
    setLockable(item('BoxA'), false, true, true),
    setLockable(item('BoxB'), false, true, true),
    setLockable(item('BoxC'), false, true, true),
    setLockable(item('BoxD'), false, true, true),
    setLockable(item('BoxE'), false, true, true),
    setLockable(item('BoxF'), false, true, true),
    setLockable(item('BoxG'), false, true, true),
    setLockable(item('BoxH'), false, true, true),
    assertzUniq(item('KeyA')), setAsKeyOf(item('KeyA'), item('BoxA')),
    assertzUniq(item('KeyB')), setAsKeyOf(item('KeyB'), item('BoxB')),
    assertzUniq(item('KeyC')), setAsKeyOf(item('KeyC'), item('BoxC')),
    assertzUniq(item('KeyD')), setAsKeyOf(item('KeyD'), item('BoxD')),
    assertzUniq(item('KeyE')), setAsKeyOf(item('KeyE'), item('BoxE')),
    assertzUniq(item('KeyF')), setAsKeyOf(item('KeyF'), item('BoxF')),
    assertzUniq(item('KeyG')), setAsKeyOf(item('KeyG'), item('BoxG')),
    assertzUniq(item('KeyH')), setAsKeyOf(item('KeyH'), item('BoxH')),
    placeInLocation(character('Alice'), location('Street')),
    placeInContainer(item('BoxA'), item('BoxB')),
    placeInContainer(item('BoxB'), item('BoxC')),
    placeInContainer(item('BoxC'), item('BoxD')),
    placeInContainer(item('BoxD'), item('BoxE')),
    placeInContainer(item('BoxE'), item('BoxF')),
    placeInContainer(item('BoxF'), item('BoxG')),
    placeInContainer(item('BoxG'), item('BoxH')),
    placeInLocation(item('BoxH'), location('Street')).

test(box) :-
    retract_all_with_term(character('Alice')).

test(box) :-
    retract_all_with_term('Alice').

test(boxKey1) :-
    retract_all_with_term('Alice'),
    retract_all_with_term('BoxA'),
    retract_all_with_term('BoxB'),
    retract_all_with_term('BoxC'),
    retract_all_with_term('BoxD'),
    retract_all_with_term('BoxE'),
    retract_all_with_term('BoxF'),
    retract_all_with_term('BoxG'),
    retract_all_with_term('BoxH'),
    retract_all_with_term('KeyA'),
    retract_all_with_term('KeyB'),
    retract_all_with_term('KeyC'),
    retract_all_with_term('KeyD'),
    retract_all_with_term('KeyE'),
    retract_all_with_term('KeyF'),
    retract_all_with_term('KeyG'),
    retract_all_with_term('KeyH'),
    assertzUniq(character('Alice')),
    assertzUniq(item('BoxA')), assertzUniq(container(item('BoxA'))),
    assertzUniq(item('BoxB')), assertzUniq(container(item('BoxB'))),
    assertzUniq(item('BoxC')), assertzUniq(container(item('BoxC'))),
    assertzUniq(item('BoxD')), assertzUniq(container(item('BoxD'))),
    assertzUniq(item('BoxE')), assertzUniq(container(item('BoxE'))),
    assertzUniq(item('BoxF')), assertzUniq(container(item('BoxF'))),
    assertzUniq(item('BoxG')), assertzUniq(container(item('BoxG'))),
    assertzUniq(item('BoxH')), assertzUniq(container(item('BoxH'))),
    setLockable(item('BoxA'), false, true, true),
    setLockable(item('BoxB'), false, true, true),
    setLockable(item('BoxC'), false, true, true),
    setLockable(item('BoxD'), false, true, true),
    setLockable(item('BoxE'), false, true, true),
    setLockable(item('BoxF'), false, true, true),
    setLockable(item('BoxG'), false, true, true),
    setLockable(item('BoxH'), false, true, true),
    assertzUniq(item('KeyA')),
    canLock(item('BoxA'), _, _),
    assertzUniq(keyOf(item('KeyA'), item('BoxA'))).

test(boxKey2) :-
    retract_all_with_term('Alice'),
    retract_all_with_term('BoxA'),
    retract_all_with_term('BoxB'),
    retract_all_with_term('BoxC'),
    retract_all_with_term('BoxD'),
    retract_all_with_term('BoxE'),
    retract_all_with_term('BoxF'),
    retract_all_with_term('BoxG'),
    retract_all_with_term('BoxH'),
    retract_all_with_term('KeyA'),
    retract_all_with_term('KeyB'),
    retract_all_with_term('KeyC'),
    retract_all_with_term('KeyD'),
    retract_all_with_term('KeyE'),
    retract_all_with_term('KeyF'),
    retract_all_with_term('KeyG'),
    retract_all_with_term('KeyH'),
    assertzUniq(character('Alice')),
    assertzUniq(item('BoxA')), assertzUniq(container(item('BoxA'))),
    assertzUniq(item('BoxB')), assertzUniq(container(item('BoxB'))),
    assertzUniq(item('BoxC')), assertzUniq(container(item('BoxC'))),
    assertzUniq(item('BoxD')), assertzUniq(container(item('BoxD'))),
    assertzUniq(item('BoxE')), assertzUniq(container(item('BoxE'))),
    assertzUniq(item('BoxF')), assertzUniq(container(item('BoxF'))),
    assertzUniq(item('BoxG')), assertzUniq(container(item('BoxG'))),
    assertzUniq(item('BoxH')), assertzUniq(container(item('BoxH'))),
    setLockable(item('BoxA'), false, true, true),
    setLockable(item('BoxB'), false, true, true),
    setLockable(item('BoxC'), false, true, true),
    setLockable(item('BoxD'), false, true, true),
    setLockable(item('BoxE'), false, true, true),
    setLockable(item('BoxF'), false, true, true),
    setLockable(item('BoxG'), false, true, true),
    setLockable(item('BoxH'), false, true, true),
    assertzUniq(item('KeyA')),
    canLock(item('BoxA'), _, _),
    assertzUniq(keyOf(item('KeyA'), item('BoxA'))),
    setAsKeyOf(item('KeyA'), item('BoxA')).

test(box) :-
    doSetUp().

test(box, all(X=[
    [
        false,
        ["The item is somewhere else."],
        []
    ]
])) :-
    doSetUp(),
    placeInLocation(item('BoxH'), location('LivingRoom')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        true,
        ["The item cannot be unlocked."],
        []
    ]
])) :-
    doSetUp(),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        true,
        ["The item cannot be unlocked."],
        []
    ]
])) :-
    doSetUp(),
    placeAsTakenOf(item('BoxH'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        ["Someone else has the item."],
        []
    ]
])) :-
    doSetUp(),
    assertzUniq(character('Bob')),
    placeAsTakenOf(item('BoxH'), character('Bob')),
    placeInLocation(character('Bob'), location('Street')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        ["The item is in a container that cannot be unlocked."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, false),
    lockItem(item('BoxB')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        ["The item is in a container that cannot be unlocked."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, false),
    lockItem(item('BoxB')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        true,
        ["The item cannot be unlocked."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    lockItem(item('BoxB')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        []
    ]
])) :-
    retract_all_with_term('KeyB'),
    findall(X, info('KeyB', X), L2),
    X = [L2].

test(box, all(X=[
    [
        false,
        ["The item is in a container that cannot be unlocked because you do not have the key."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    lockItem(item('BoxB')),
    % placeAsTakenOf(item('KeyB'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        ["The item is in a container that cannot be opened."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setOpenable(item('BoxB'), false),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        ["The item is in a container that cannot be opened because there are things on it."],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    assertaUniq(supporter(item('BoxB'))),
    assertaUniq(item('Bottle')),
    placeOnSupporter(item('Bottle'), item('BoxB')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        true,
        ["The item cannot be unlocked."],
        []
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    assertaUniq(supporter(item('BoxB'))),
    % assertaUniq(item('Bottle')),
    % placeOnSupporter(item('Bottle'), item('BoxB')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        true,
        [
            "You unlock the 'BoxB'.",
            "You open the 'BoxB'.",
            "You unlock the item."
        ],
        [
            unlockItem(item('BoxB')),
            openItem(item('BoxB')),
            unlockItem(item('BoxA'))
        ],
        true,
        true,
        true,
        false,
        false,
        false
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    placeAsTakenOf(item('KeyA'), character('Alice')),
    assertaUniq(supporter(item('BoxB'))),
    % assertaUniq(item('Bottle')),
    % placeOnSupporter(item('Bottle'), item('BoxB')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    toBool(isLocked(item('BoxB')), IsLockedB1),
    toBool(isClosed(item('BoxB')), IsClosedB1),
    toBool(isLocked(item('BoxA')), IsLockedA1),
    commitMutations(Mutations),
    toBool(isLocked(item('BoxB')), IsLockedB2),
    toBool(isClosed(item('BoxB')), IsClosedB2),
    toBool(isLocked(item('BoxA')), IsLockedA2),
    X = [
        Success, Texts, Mutations,
        IsLockedB1, IsClosedB1, IsLockedA1,
        IsLockedB2, IsClosedB2, IsLockedA2
    ].

test(box, all(X=[
    [
        false,
        [
            "The item cannot be unlocked."
        ],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setLockable(item('BoxA'), false, false),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    placeAsTakenOf(item('KeyA'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        [
            "The item cannot be unlocked from the inside."
        ],
        []
    ]
])) :-
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setLockable(item('BoxA'), false, false),
    setOpenable(item('BoxB'), true),
    setEnterable(item('BoxA'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    placeInContainer(character('Alice'), item('BoxA')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    placeAsTakenOf(item('KeyA'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [Success, Texts, Mutations].

test(box, all(X=[
    [
        false,
        [
            "You do not have a key to the item."
        ],
        [
        ]
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, true),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    placeAsTakenOf(item('KeyB'), character('Alice')),
    % placeAsTakenOf(item('KeyA'), character('Alice')),
    assertaUniq(supporter(item('BoxB'))),
    % assertaUniq(item('Bottle')),
    % placeOnSupporter(item('Bottle'), item('BoxB')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [
        Success, Texts, Mutations
    ].

test(box, all(X=[
    [
        true,
        [
            "You unlock the 'BoxB'.",
            "You open the 'BoxB'.",
            "You unlock the item."
        ],
        [
            unlockItem(item('BoxB')),
            openItem(item('BoxB')),
            unlockItem(item('BoxA'))
        ],
        true,
        true,
        true,
        false,
        false,
        false
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, false),
    setLockable(item('BoxA'), false, true, false),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    %placeAsTakenOf(item('KeyB'), character('Alice')),
    %placeAsTakenOf(item('KeyA'), character('Alice')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    toBool(isLocked(item('BoxB')), IsLockedB1),
    toBool(isClosed(item('BoxB')), IsClosedB1),
    toBool(isLocked(item('BoxA')), IsLockedA1),
    commitMutations(Mutations),
    toBool(isLocked(item('BoxB')), IsLockedB2),
    toBool(isClosed(item('BoxB')), IsClosedB2),
    toBool(isLocked(item('BoxA')), IsLockedA2),
    X = [
        Success, Texts, Mutations,
        IsLockedB1, IsClosedB1, IsLockedA1,
        IsLockedB2, IsClosedB2, IsLockedA2
    ].

test(box, all(X=[
    [
        false,
        [
            "The item is in a container that cannot be opened."
        ],
        [
        ]
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, false),
    setLockable(item('BoxA'), false, true, false),
    setOpenable(item('BoxB'), false),
    setOpenable(item('BoxC'), true),
    closeItem(item('BoxB')),
    closeItem(item('BoxC')),
    lockItem(item('BoxB')),
    lockItem(item('BoxA')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [
        Success, Texts, Mutations
    ].

test(box, all(X=[
    [
        true,
        [
            "The item cannot be unlocked."
        ],
        [
        ]
    ]
])) :-
    doSetUp(),
    assertzUniq(item('Apple')),
    placeInLocation(item('Apple'), location('Street')),
    simulateUnlockItem(character('Alice'), item('Apple'), Success, Texts, Mutations),
    X = [
        Success, Texts, Mutations
    ].

test(box, all(X=[
    [
        true,
        [
            "The item is already unlocked."
        ],
        [
        ]
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, false),
    setLockable(item('BoxA'), false, true, false),
    setOpenable(item('BoxB'), true),
    closeItem(item('BoxB')),
    unlockItem(item('BoxB')),
    unlockItem(item('BoxA')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [
        Success, Texts, Mutations
    ].

test(box, all(X=[
    [
        true,
        [
            "The item is already unlocked."
        ],
        [
        ]
    ]
])) :-
    retract_all_with_term('Bottle'),
    doSetUp(),
    setLockable(item('BoxB'), false, true, false),
    setLockable(item('BoxA'), false, true, false),
    setOpenable(item('BoxB'), true),
    setOpenable(item('BoxC'), true),
    openItem(item('BoxC')),
    closeItem(item('BoxB')),
    unlockItem(item('BoxB')),
    unlockItem(item('BoxA')),
    simulateUnlockItem(character('Alice'), item('BoxA'), Success, Texts, Mutations),
    X = [
        Success, Texts, Mutations
    ].

:- end_tests(simulateUnlockItem).
