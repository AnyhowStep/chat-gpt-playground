
export_all([]).
export_all([Predicate|Tail]) :-
    export(Predicate),
    export_all(Tail).

re_export(M) :-
    findall(X, (current_module(X)), L),
    use_module(M),
    findall(X, (current_module(X), \+ member(X, L)), NewModules),
    NewModules = [NewModule | _],
    module_property(NewModule, exports(ExportedPredicates)),
    export_all(ExportedPredicates).
