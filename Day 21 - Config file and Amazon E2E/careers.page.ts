import {Locator, Page} from '@playwright/test';
class CareersPage {
    CareersLink: Locator;
    page:Page;
    opportunitiesLink: Locator;
    UniLInk: Locator;
    countryFilter: Locator;
    regionFilter:Locator;
    CityFilter: Locator;
    EmployeeTypeFilter: Locator;
    CategoryFilter: Locator;
    CareerAreaFilter: Locator;
    TeamFilter:Locator;
    RoleTypeFilter:Locator;
    job:Locator;
    page2:Page;
    apply:Locator;
    constructor(page: Page) {
        this.page = page;
        this.page2 = page;
        this.CareersLink = page.locator('//a[@href="https://amazon.jobs"]');
        this.opportunitiesLink = page.locator('//a[@href="/content/en/career-programs/university"]');
        this.UniLInk = page.locator('//div[@class="hero-condensed_ctas__PMYzb calls-to-action_ctas__xC3s2"]//a//div[@class="css-n1m10m"]');
        this.countryFilter = page.getByPlaceholder('Search for a country or region');
        this.regionFilter = page.getByPlaceholder('Search for a state or province')
        this.CityFilter=page.getByPlaceholder('Search for a city')
        this.EmployeeTypeFilter=page.locator('//div[@id="search"]/div/div[1]/div/fieldset[4]/div/div[2]/div/div[2]/ul/li[1]/label/div/input')
        this.CategoryFilter=page.getByLabel('Fulfillment & Operations Management')
        this.CareerAreaFilter=page.getByLabel('Distribution & fulfillment')
        this.TeamFilter=page.getByLabel('Internships for students')
        this.RoleTypeFilter=page.getByLabel('Individual contributor')
        this.job=page.locator('//div[@id="search"]/div/div[2]/ul/li[2]/div/div[1]/div[1]/div[1]/h3/a')
        this.apply=page.locator('//div[@id="search"]/div/div[2]/ul/li[2]/div/div[1]/div[2]/a')

    }
    async getCareers(){
        await this.CareersLink.scrollIntoViewIfNeeded();
        await this.CareersLink.click();
        await this.opportunitiesLink.click();
        await this.UniLInk.click();
    }
    async filter(){
        await this.countryFilter.fill('Germany')
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
        await this.regionFilter.fill('North-Rhine-Westphalia')
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
        await this.CityFilter.fill('Horn-Bad Meinberg')
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
        await this.EmployeeTypeFilter.check()
        await this.CategoryFilter.click()
        await this.CareerAreaFilter.click()
        await this.TeamFilter.click()
        await this.RoleTypeFilter.click()
    }
    async JobPage(){
    const [SecondJob]=await Promise.all([
        this.page.waitForEvent("popup"),
        this.job.click()
        ])
        this.page2=SecondJob;
    }
    async Apply(){
        await this.apply.click();
    }
}
export default CareersPage;
