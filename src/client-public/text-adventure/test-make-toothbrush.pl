:- begin_tests(makeToothbrush).

:- use_module(game).

test(makeToothbrush) :-
    item('toothbrush'),
    item('handle'),
    item('bristles'),
    placeAsPartOf(item('handle'), item('toothbrush')),
    placeAsPartOf(item('bristles'), item('toothbrush')),
    setColors(item('bristles'), ["white", "light blue", "lime green"]),
    setColors(item('handle'), ["white"]),
    setVolume(item('bristles'), [2.00, 0.25, 0.25]),
    setVolume(item('handle'), [14.00, 0.15, 0.25]),

    
    setDescriptions(item('bristles'), ["soft"]),
    setDescriptions(item('handle'), ["thin", "contoured to fit in ones hands comfortably"]),

    setMaxDurability(item('bristles'), 100),
    setMaxDurability(item('handle'), 100),
    setDurabilityDescriptions(item('bristles'), [
        [1, "It is almost breaking."],
        [10, "It should be replaced soon."],
        [50, "It looks a little beat up."],
        [75, "It is starting to fray."],
        [90, "It has seen little use."],
        [100, "It looks brand new."]
    ]),
    setDurabilityDescriptions(item('handle'), [
        [1, "It is almost breaking."],
        [10, "Are you using your toothbrush as a weapon?."],
        [50, "It looks a little beat up."],
        [75, "It is starting to fray."],
        [90, "It has seen little use."],
        [100, "It looks brand new."]
    ]).

:- end_testsw(makeToothbrush).