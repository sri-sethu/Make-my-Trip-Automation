class CheckBox{
    get checkBox(){
        return $("//input[@type='checkbox']")
    }
    
    async selectCheckBox(){
        if(await this.checkBox.isExisting()){
            await this.checkBox.click()
        }
    }
}
module.exports = new CheckBox()