#!/bin/sh

find "$(pwd)" -type f -iname '*.mp3' | xargs -d\\n -n1 mp3gain -r -c -s i
