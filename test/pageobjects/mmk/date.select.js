class DateSelect{
    
    get dateBox(){
        return (date)=>$(`//div[@aria-label='${date}']`)
    }

    get monthTab(){
        return $$("//div[@class='DayPicker-Caption']/div")
    }

    get dayPicker(){
        return $("//div[@class='datePickerContainer']")
    }

    get startDate(){
        return $("//input[@data-cy='departure']")
    }

    get returnDate(){
        return $("//div[@data-cy='returnArea']")
    }

    get nextMonth(){
        return $("//span[@aria-label='Next Month']")
    }

    async checkMonth(month, year){
        let months = await (await this.monthTab).map(async(e)=>{
                return await e.getText()
        })

        // console.log(elem, months, month, year,months[0].includes(month), months[0].includes(year) );
        browser.pause(1500)
        while(!months[0].includes(month) || !months[0].includes(year)){
            await this.nextMonth.click()
            months = await (await this.monthTab).map(async(e)=>{
                return await e.getText()
            })
        }
    }

    async selectDepartureDate(startDate){
        await this.dayPicker.waitForDisplayed({timeout: 3000})
        if(!(await this.dayPicker.isDisplayed())){
            await this.startDate.click()
        }
        await this.checkMonth(startDate.split(' ')[1],startDate.split(' ')[3])
        await this.dateBox(startDate).click()
    }

    async selectReturnDate(returnDate){
        await this.returnDate.click()
        await this.dayPicker.waitForDisplayed({timeout: 3000})
        console.log(returnDate);
        await this.checkMonth(returnDate.split(' ')[1],returnDate.split(' ')[3])
        await this.dateBox(returnDate).click()
    }

}

module.exports = new DateSelect();

//Next month button - //span[@aria-label='Next Month']
//Month Year - //div[@class='DayPicker-Caption']/div
// Return Date - class="fsw_inner returnPersuasion"

// const s = "February 2026"
// console.log(s.includes('Feb')&& s.includes('2026'));