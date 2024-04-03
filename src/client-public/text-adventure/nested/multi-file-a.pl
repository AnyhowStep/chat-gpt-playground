:- module(multiFileA, [
    predicateA/1
]).

:- re_export("./nested-2/multi-file-b").
:- re_export("./nested-2/multi-file-c").

predicateA(_) :- true.