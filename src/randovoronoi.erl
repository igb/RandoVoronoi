-module(randovoronoi).
-export([loop/0]).

loop()->
    io:format("running...", []),
    Result = os:cmd("../node/bin/node ../src/js/voronoi.js"),
    io:format("~s~n~n", [Result]),
    erlybird:tweet("", ["/tmp/foo1.png"]),
    timer:sleep(60000 * 60 * 6),
    loop().


-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").
-endif.


