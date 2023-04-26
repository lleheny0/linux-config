#!/bin/sh

RESETS=0
SUCCESS=0

update_mpc() {
  mpc stop
  mpc clear
  mpc update --wait
  find "$(pwd -P)" | grep mp3 | mpc --wait add
  mpc play
  sudo service mpd restart
}

while [ $SUCCESS -eq 0 ]
do
  if [ $RESETS -gt 4 ]
  then
    echo "Update failed 5 times."
    echo "Something is probably wrong."
    break
  fi

  update_mpc

  FILE_COUNT=$(find . | grep mp3 | wc -l)
  MPC_COUNT=$(mpc playlist | wc -l)
  RESETS=$((RESETS+1))

  if [ $FILE_COUNT -eq $MPC_COUNT ]
  then
    SUCCESS=1
  else
    sleep 5
  fi
done

if [ $SUCCESS -eq 1 ]
then
  echo "Done after $RESETS reset(s)"
  echo "Number of tracks: $FILE_COUNT"
fi
