:- begin_tests(assertUniq, [
    setup((
        assertaUniq(item('Apple')),
        assertaUniq(item('Apple')),
        assertaUniq(item('Apple')),
        assertzUniq(item('Pear')),
        assertzUniq(item('Pear')),
        assertzUniq(item('Pear')),
        asserta(item('Orange')),
        asserta(item('Orange')),
        asserta(item('Orange')),
        assertz(item('Melon')),
        assertz(item('Melon')),
        assertz(item('Melon'))
    ))
]).

:- use_module(game).

test(oneApple, all(X=['Apple'])) :-
    X = 'Apple',
    item(X).

test(onePear, all(X=['Pear'])) :-
    X = 'Pear',
    item(X).

test(multipleOrange, all(X=['Orange', 'Orange', 'Orange'])) :-
    X = 'Orange',
    item(X).

test(multipleMelon, all(X=['Melon', 'Melon', 'Melon'])) :-
    X = 'Melon',
    item(X).

:- end_tests(assertUniq).
