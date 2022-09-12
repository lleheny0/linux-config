alias rc='vim /home/luke/.bashrc'
alias op='ssh luke@192.168.1.218'
alias gm='ssh luke@192.168.1.218 -t "watch -n 1 mpc"'
alias mc='ssh luke@192.168.1.218 -t "tmux attach"'
alias tc='sudo timeshift --create'
alias td='sudo timeshift --delete'
alias sc='snapclient --host 192.168.1.218 --player alsa --sampleformat 48000:16:*'

sl () {
  ssh luke@192.168.1.$1
}

sctl () {
  sudo systemctl $1 $2
}

sctlu () {
  systemctl --user $1 $2
}
