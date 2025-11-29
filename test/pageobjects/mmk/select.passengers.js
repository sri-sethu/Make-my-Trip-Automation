class SelectPassenger{
    get travelerTab(){
        return $("//div[@data-cy='flightTraveller']")
    }

    get setNumbers(){
        return $("//div[@class='appendBottom20']")
    }

    get adults(){
        return (adultNum)=>$(`//li[@data-cy='adults-${adultNum}']`)
    }

    
    get children(){
        return (childNum)=>$(`//li[@data-cy='children-${childNum}']`)
    }

    
    get infants(){
        return (infantNum)=>$(`//li[@data-cy='infants-${infantNum}']`)
    }

    get travelClass(){
        return (tclass)=>$(`//li[@data-cy='travelClass-${tclass}']`)
    }

    
    get applyButton(){
        return $("//button[@data-cy='travellerApplyBtn']")
    }

    async traveler(adultNum, childNum, infantNum, tclass){
        await this.travelerTab.click()
        await this.setNumbers.isDisplayed()
        await this.adults(adultNum).click()
        await this.children(childNum).click()
        await this.infants(infantNum).click()
        await this.travelClass(tclass).click()
        await this.applyButton.click()
    }
}
module.exports = new SelectPassenger()