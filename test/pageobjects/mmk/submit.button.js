class SubmitButton{
    get submit(){
        return $("//p[@data-cy='submit']")
    }
    
    async clickSubmit(){
        await this.submit.click()       
    }
}
module.exports = new SubmitButton()