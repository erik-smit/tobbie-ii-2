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
        -100,
        0,
        1023
        ))
    }
}
// Protocol:
// Function,Value,Value
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    rxData = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    serial.writeLine(rxData)
    rxString = rxData.split(",")
    rxFunction = rxString[0]
    if (rxFunction == "V") {
    	
    } else if (rxFunction == "S") {
        walkSpeed = parseFloat(rxString[1])
        turnSpeed = parseFloat(rxString[2])
        tobbieTurn(turnSpeed)
        tobbieWalk(walkSpeed)
    } else if (rxFunction == "T") {
        displayText = rxString[1]
    } else {
        basic.showIcon(IconNames.Heart)
    }
})
function tobbieWalk (speed2: number) {
    if (speed2 >= 0) {
        pins.analogWritePin(AnalogPin.P13, pins.map(
        speed2,
        0,
        100,
        0,
        1023
        ))
        pins.analogWritePin(AnalogPin.P14, 0)
    } else {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, pins.map(
        speed2,
        0,
        -100,
        0,
        1023
        ))
    }
}
let prevDisplayText = ""
let displayText = ""
let turnSpeed = 0
let walkSpeed = 0
let rxFunction = ""
let rxString: string[] = []
let rxData = ""
basic.showIcon(IconNames.SmallDiamond)
bluetooth.startButtonService()
bluetooth.startIOPinService()
bluetooth.startAccelerometerService()
bluetooth.startLEDService()
bluetooth.startUartService()
pins.analogSetPeriod(AnalogPin.P13, 1000)
pins.analogSetPeriod(AnalogPin.P14, 1000)
pins.analogSetPeriod(AnalogPin.P15, 1000)
pins.analogSetPeriod(AnalogPin.P16, 1000)
basic.showIcon(IconNames.Diamond)
basic.forever(function () {
    if (prevDisplayText != displayText) {
        prevDisplayText = displayText
        basic.clearScreen()
        basic.showString("" + (displayText))
        basic.pause(500)
    }
})
