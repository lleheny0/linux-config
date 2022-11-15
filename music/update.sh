#!/bin/sh

mpc stop
mpc clear
mpc update
find "$(pwd -P)" | grep mp3 | mpc add
mpc play
sudo service mpd restart
find . | grep mp3 | wc -l
mpc playlist | wc -l
