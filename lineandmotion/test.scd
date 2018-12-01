(
n = NetAddr("127.0.0.1", 12321);
t = TempoClock(3000/60);
~resetTime = { t = TempoClock(3000/60); n.sendMsg( "/newtime", 0); };
)

~resetTime.value;
n.sendMsg("/mkcirc", "c0", (1000.0+(t.beats%1000)), 23);
n.sendMsg("/mkcirc", "c1", (1000.0+(t.beats%1000)), 23);
n.sendMsg("/mkcirc", "c2", (1000.0+(t.beats%1000)), 20);
n.sendMsg("/mkcirc", "c3", (1000.0+(t.beats%1000)), 20);


n.sendMsg("/newtime", t.beats);