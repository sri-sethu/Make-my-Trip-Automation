class PlaceChoose{
    get banner(){
        return $("//span[@class='commonModal__close']")
    }
    
    get tooltip(){
        return $("//div[@class='tooltipInfo']")
    }
    
    get fromCity(){
        return $("//label[@for='fromCity']")
    }

    get toCity(){
        return $("//label[@for='toCity']")
    }

    get fromCityInput(){
        return $("//input[@placeholder='From']")
    }

    get toCityInput(){
        return $("//input[@placeholder='To']")
    }

    get fetchCityFromList(){
        return $("//ul[@role='listbox']/li[1]/div/div/p/span[1]")
    }

    get cityBox(){
        return $("//ul[@role='listbox']/li[1]/div/div")
    }


    get errorMessage(){
        return $("//div[@id='errorMessage']")
    }

    get flightIcon(){
        return $("//li[@class='menu_Flights']")
    }

    get root(){
        return $("//div[@data-cy='rootPage']")
    }

    get faceCard(){
        return $("//div[@class='fareCardItem']")
    }

    get faceCardList(){
        return $$("//div[@class='fareCardItem']")
    }

    async closeBanner(){
        if(await this.banner.waitForDisplayed({ timeout: 8000 }))
            await this.banner.click()
    }

    // async closePopUp(){
    //     await this.faceCard.waitForDisplayed({timeout:8000})
    //     if(await this.faceCardList.length>5){
    //         await this.flightIcon.click()
    //     }
    // }

    async startingUp(){
        browser.url('/')
        await this.closeBanner()
        // await this.closePopUp()
        // console.log(await $("//span[@class='tooltip']").isDisplayed())
        // await browser.pause(10000)
        // console.log(await $("//span[@class='tooltip']").isDisplayed())
        // console.log(await $("//span[@class='tooltip']").isExisted())
        await this.faceCard.waitForDisplayed({timeout:10000})
        await browser.waitUntil(async ()=>{
            await this.tooltip.waitForDisplayed({timeout:4000})
            console.log("Pop up is displayed")
            await this.root.click()
        },{timeout:4000}).catch(()=>{})
    }
    
    async selectFromCity(cityName){
        await this.fromCity.click()
        await this.fromCityInput.setValue(cityName.slice(0,5))
        if((await this.fetchCityFromList.getText()).includes(cityName)){
            this.cityBox.click()
        }
    }
    
    async selectToCity(cityName){
        await this.toCity.click()
        await this.toCityInput.setValue(cityName.slice(0,5))
        if((await this.fetchCityFromList.getText()).includes(cityName)){
            this.cityBox.click()
        }
    }

    async checkError(){
        await this.errorMessage.waitForDisplayed({timeout: 2000})
    }
}   

module.exports = new PlaceChoose() 

// await $("//span[@class='commonModal__close']").click()
// await $("//input[@id='fromCity']").click()
// await $("//input[@placeholder='From']").setValue('Chenn')
// const li1 = await $("//ul[@role='listbox']/li[1]/div/div/p/span[1]").getText()
// if(li1==="Chennai")
//     await $("//ul[@role='listbox']/li[1]/div").click()