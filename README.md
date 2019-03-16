## Automatic mouse profile pointer speed switcher for laptops that want external USB mouse connected running Ubuntu

*Why did you make this code snippet available?*

I have an `ASUSTeK COMPUTER INC. UX330UAR/UX330UAR`  laptop that runs Ubuntu and when I connected an external USB mouse to the laptop the pointer speed would be too sensitive. 

I wanted an easy way to monitor the connect/disconnect of the USB mouse and adjust the pointer speed without needing to manually adjust it each time I connected the USB mouse device.

When the USB mouse is connected it will automatically perform an `$ xset m` to modify the mouses acceleration and sensitivity. 

When disconnected it will switch back to the laptops trackpad acceleration/sensitivity profile. 

This script uses NodeJS and monitors the hardware level connections using the command `$ udevadm monitor`

This type of script should run as a background process. This tool might not be helpful for anyone else, but for me it made my life a bit easier and I decided to push it to this repository.

To update the mouse sensitivity you can modify the file `./config.json`