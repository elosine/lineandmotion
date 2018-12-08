(
n = NetAddr("127.0.0.1", 12321);
t = TempoClock(3000/60);
~resetTime = { t = TempoClock(60/60); n.sendMsg( "/newtime", t.beats); };
)

~resetTime.value;
n.sendMsg("/mkcirc", "c0", 11000 , 23);
n.sendMsg("/mkcirc", "c1", (1000.0), 23);
n.sendMsg("/mkcirc", "c2", (1000.0+(t.beats%1000)), 20);
n.sendMsg("/mkcirc", "c3", (1000.0+(t.beats%1000)), 20);


n.sendMsg("/newtime", t.beats); t.beats;
t.beats