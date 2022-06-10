# Fixes and adjustments

## Firefox: audio stream stutters when loading videos
### Reproduce
1. Open an audio stream
2. Open a new tab, go to reddit.com
### Solution
Set `media.rdd-process.enabled` to `false` in about:config

## Vulkan: Games have random flickering textures
### Reproduce
1. Open Sea of Thieves
2. Look at the water
### Solution
1. Install `vulkan-radeon` package
2. Add `AMD_VULKAN_ICD=RADV` to `/etc/environment`
