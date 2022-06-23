# Fixes and adjustments

## Firefox: audio stream stutters when loading videos
### Reproduce
1. Open an audio stream
2. Open a new tab, go to reddit.com
### Solution
Set `media.rdd-process.enabled` to `false` in about:config

## Vulkan: Games have random flickering textures
This happens because games are using the `amdvlk` driver instead of the `vulkan-radeon` driver. More info [here](https://wiki.archlinux.org/title/Vulkan).
### Reproduce
1. Open Sea of Thieves
2. Look at the water
### Solution
1. Install `vulkan-radeon` package
2. Add this  to `/etc/environment`:
```
AMD_VULKAN_ICD=RADV
VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/radeon_icd.i686.json:/usr/share/vulkan/icd.d/radeon_icd.x86_64.json
```
### Alternate Solution
1. Uninstall `amdvlk` package

## Font rendering is bad in GTK4
More info on the bug [here](https://gitlab.gnome.org/GNOME/gtk/-/issues/3787) and solution stated at the top of [this page](https://discussion.fedoraproject.org/t/beautify-fedora-36-and-gnome-42/37943)
### Reproduce
1. Open firefox
2. Look at the interface fonts
3. Go to wikipedia.org
4. Look at the web fonts
### Solution
Add the `gtk-hint-font-metrics=1` to `~/.config/gtk-4.0/settings.ini`
