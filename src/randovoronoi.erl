-module(randovoronoi).
-export([loop/0]).

loop()->
    io:format("running...", []),
    Result = os:cmd("../node/bin/node ../src/js/voronoi.js"),
 %OS X local development paths
%Result = os:cmd("node ./src/js/voronoi.js"),
    io:format("Result: ~p~n", [Result]),
   AltText = lists:nth(3, string:tokens(Result, "\n")),
    erlybird:tweet("", [{"/tmp/foo1.png", AltText}]),
    timer:sleep(1000 * 60 * 60 * 6), % EVERY 6 HOURS
    loop().


-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").
-endif.


