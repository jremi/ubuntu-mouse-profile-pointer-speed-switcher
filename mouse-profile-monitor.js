/**
 * 
 *  [Name] Mouse Profile Monitor
 *  [Filename] mouse-profile-monitor.js
 *  [Author] Jremi <jzbgdev@gmail.com> 
 * 
 *  [Description]
 *  Tested on my Ubuntu 16.04 for disconnecting/connecting USB external mouse 
 *  in conjunction with the builtin trackpad.
 * 
 *  The purpose of this small script is to auto-switch the mouse pointer
 *  speed profiles when the system detects a connect/disconnect of the USB
 *  mouse device.
 * 
 */

const { spawn, exec } = require('child_process');
const udevadm = spawn('udevadm', ['monitor']);

const mouse = require('./config.json')

udevadm.stdout.on('data', (data) => {  
    let d = data.toString(), lines = d.split(/(\r?\n)/g);
    let c = lines.filter(line=>{
        if(line.match('KERNEL\\[')){
            return line;
        }
    })
    if(c[c.length-1].match('add')){
        console.log('🐁 - USB mouse connected');
        setTimeout(()=>{ 
            /*
                Wait 1s since the OS attempts to set
                to acceleration: We want to override 
                with our setting immediately after
            */
            exec(`xset m ${mouse.pointer.usbmouse.speed}`);
        },1000);
    }
    else if(c[c.length-1].match('remove')){
        console.log('🐁 - USB mouse disconnected');
        exec(`xset m ${mouse.pointer.trackpad.speed}`);
    }
    else{
        console.log('🐁 - USB mouse *possibly disconnected*')
        exec(`xset m ${mouse.pointer.trackpad.speed}`);
    }
});