n = NetAddr("127.0.0.1", 12321);
n.sendMsg("/mkcirc", "c1000", 1000.0, 10);
n.sendMsg("/mkcirc", "c1001", 1000.0, 30);
n.sendMsg("/mkcirc", "c2", 1000.0, 50);
n.sendMsg("/gliss1viz", 0);

n.sendMsg( "/newtime", 0);

