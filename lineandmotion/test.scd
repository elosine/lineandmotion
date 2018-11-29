n = NetAddr("127.0.0.1", 12321);
n.sendMsg("/mkcirc", "c0", (1000.0+(t.beats%1000)), 50);
n.sendMsg("/mkcirc", "c1", (1000.0+(t.beats%1000)), 50);
n.sendMsg("/mkcirc", "c2", (1000.0+(t.beats%1000)), 50);
n.sendMsg("/mkcirc", "c3", (1000.0+(t.beats%1000)), 50);
n.sendMsg("/gliss1viz", 0);

~resetTime = { t = TempoClock(3000/60); n.sendMsg( "/newtime", 0); };
~resetTime.value;
t.beats

t = TempoClock(3000/60);

t.beats%1000;