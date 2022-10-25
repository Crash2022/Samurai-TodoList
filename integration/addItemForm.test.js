describe('addItemForm', () => {
    it('base example looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=additemform-storycomponent--task-base-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});