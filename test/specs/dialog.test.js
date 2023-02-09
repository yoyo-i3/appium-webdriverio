const dialog = require('../../pageObjects/dialog.page');
const expect = require('chai').expect;

describe('Dialog', ()=>{
    // Execute a block of code before every test
    beforeEach(() => {
    });

    it('Verify that the text entry dialog username & password fields are editable', ()=>{
        dialog.appBtn.click();
        dialog.alertDialogBtn.click();
        dialog.textEntryDialogBtn.click();

        dialog.userNameField.addValue("Test User");
        dialog.userNameField.clearValue();
        dialog.userNameField.addValue("Actual User");

        dialog.passwordField.clearValue();
        dialog.passwordField.addValue("Test Pass");

        let text = dialog.userNameField.getText();
        console.log(text);
        expect(text).equal("Actual User");

        dialog.dialogOkBtn.click();
    });

    it('Verify that the app adjust when orientation is switched', () => {
        // get current orientation of screen whether it's landscape or portrait
        console.log(driver.getOrientation());
        driver.setOrientation('LANDSCAPE');

        driver.saveScreenshot('./screenshots/landscape.png');
        dialog.appBtn.click();

        driver.setOrientation('PORTRAIT');
        driver.back();
        driver.saveScreenshot('./screenshots/portrait.png');
    });

    it('Verify isSelected, isEnabled & isDisplayed', () => {
        dialog.viewBtn.click();
        //to mimic action of a user pressing on the screen, scrolling to a point then releasing their finger
        driver.touchAction([
            { action: 'press', x: 500, y: 1400 },
            // move down on screen so change the y value
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release'
        ])

        dialog.tabsBtn.click();
        dialog.contentByIdBtn.click();

        let isEnabled, isSelected, isDisplayed;

        for(i=0; i<3; i++){
//      isSelected: This function returns true/false if the element in question is currently active.
//isEnabled is true when an element can be interacted with, but once our element is disabled, isEnabled is false
// isDisplayed is true whenever our element is displayed on the screen, and it's false once that element is not
            isEnabled = dialog.tabs[i].isEnabled();
            isSelected = dialog.tabs[i].isSelected();
            isDisplayed = dialog.tabs[i].isDisplayed();

            console.log(`Tab ${i+1}`)
            console.log('isEnabled:', isEnabled);
            console.log('isSelected:', isSelected);
            console.log('isDisplayed:', isDisplayed);

            if(isEnabled && isSelected){
                console.log("Tab Details 1:", dialog.tab1Details.isDisplayed());
                console.log("Tab Details 2:", dialog.tab2Details.isDisplayed());
                console.log("Tab Details 3:", dialog.tab3Details.isDisplayed());
            }
        }
    });

    it('Verify Timeouts', () => {
//    there is also a timeout setting in WebdriverIO config file, waitforTimeout:10000
//    implicit wait, waits for a condition to be fulfilled (ex. wait time or element to appear whichever occurs first)
//        driver.setImplicitTimeout(10000);
//        explicit wait, waits for specified time regardless of any other condition being met
//        driver.setTimeouts(10000);
//      pause is explicit wait; our test is not doing anything even though the element is on the screen.it still waited for 10 seconds before clicking that button.
//        driver.pause(10000);

        dialog.viewBtn.click();
        //dialog.tabsBtn.click();
    });

    it('Verify the repeat alarm options has attribute checked set to true when selected', ()=>{
        let isChecked, text;

        dialog.appBtn.click();
        dialog.alertDialogBtn.click();
        dialog.repeatAlarmBtn.click();
//getText() get a text of an element
        text = dialog._weekdayCheckbox(0).getText();
        expect(text).equal('Every Monday');
//getAttribute get attribute value of a value ex. get checked attribute value whether it's true or false
        isChecked = dialog._weekdayCheckbox(0).getAttribute('checked');
        expect(isChecked).equal('false');

        dialog._weekdayCheckbox(0).click();

        isChecked = dialog._weekdayCheckbox(0).getAttribute('checked');
        expect(isChecked).equal('true');
    });

    // Execute a block of code after every test
    afterEach(() => {
        driver.reset();
    });
})