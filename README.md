# Hearthstone Draw Simlutor

[The candy is over here](https://pvdz.github.io/hs_draw_sim/src/web.html)

This app simulates card draw in Hearthstone a bunch of times and reports how often when certain conditions are met. These conditions can be added through UI.

Basically it's easier to simulate certain conditions than do the actual math because the mulligan phase messes up calculating odds. There's also the condition where player two starts with an additional card. Oh it's all a mess. A simulator will be much easier to get "reliable" data.

I've added two examples for spiteful druid; In one it checks how often you actually have the summoner when you can play it. The other checks how often it's bricked before you can play it.

See https://pvdz.ee/weblog/423 for details on the UI and some background info on the code.
