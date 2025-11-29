const PlaceChoose = require("../pageobjects/mmk/place.choose")
const DateSelect = require("../pageobjects/mmk/date.select")
const SelectPassenger = require("../pageobjects/mmk/select.passengers")
const CheckBox = require("../pageobjects/mmk/check.box")
const submitButton = require("../pageobjects/mmk/submit.button")

describe('Check MMK website',async ()=>{

    before(async()=>{
        browser.maximizeWindow()
        await PlaceChoose.startingUp()
    })
    
    it('Error for same Source and Destination', async()=>{
        await PlaceChoose.selectFromCity("Chennai")
        await PlaceChoose.selectToCity("Chennai")
        await PlaceChoose.checkError()
        await browser.saveScreenshot('images/mmk/mmk-ts1-error.jpg')
    })

    it('Book tickets from Chennai to Singapore', async()=>{

        await PlaceChoose.selectFromCity("Chennai")
        await PlaceChoose.selectToCity("Singapore")

        await DateSelect.selectDepartureDate('Fri Apr 17 2026')
        await DateSelect.selectReturnDate('Sun May 17 2026')
        
        await SelectPassenger.traveler(4,2,0,0)
        
        await CheckBox.selectCheckBox()
        await browser.saveScreenshot('images/mmk/mmk-ts2-formpage.jpg')
        // await browser.pause(10000)
        await submitButton.clickSubmit()
        await browser.saveScreenshot('images/mmk/mmk-ts2-submit.jpg')
        await browser.pause(4000)
    })
})