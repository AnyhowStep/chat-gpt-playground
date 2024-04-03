:- begin_tests(nestedSomeFile).

:- use_module("./nested/nested-2/some-file").

test(somePredicate) :-
    somePredicate(true).

:- end_tests(nestedSomeFile).
