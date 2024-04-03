:- begin_tests(multiFile).

:- use_module("../nested/multi-file-a").

test(predicateA) :-
    predicateA(true).

test(predicateB) :-
    predicateB(true).

test(predicateC) :-
    predicateC(true).

:- end_tests(multiFile).
