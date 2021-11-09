bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Diamond)
    tobbieTurn(0)
    tobbieWalk(0)
})
function tobbieTurn (speed: number) {
    if (speed >= 0) {
        pins.analogWritePin(AnalogPin.P16, pins.map(
        speed,
        0,
        100,
        0,
        1023
        ))
        pins.analogWritePin(AnalogPin.P15, 0)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P15, pins.map(
        speed,
        0,
        100,
        0,
        1023
        ))
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    speeds = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(",")
    walkSpeed = parseFloat(speeds[0])
    turnSpeed = parseFloat(speeds[1])
    tobbieTurn(turnSpeed)
    tobbieWalk(walkSpeed)
})
function tobbieWalk (speed: number) {
    if (speed >= 0) {
        pins.analogWritePin(AnalogPin.P13, pins.map(
        speed,
        0,
        100,
        0,
        1023
        ))
        pins.analogWritePin(AnalogPin.P14, 0)
    } else {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, pins.map(
        speed,
        0,
        100,
        0,
        1023
        ))
    }
}
let turnSpeed = 0
let walkSpeed = 0
let speeds: string[] = []
basic.showIcon(IconNames.SmallDiamond)
bluetooth.startButtonService()
bluetooth.startIOPinService()
bluetooth.startAccelerometerService()
bluetooth.startLEDService()
bluetooth.startUartService()
basic.showIcon(IconNames.Diamond)
basic.forever(function () {
	
})
