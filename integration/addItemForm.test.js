describe('addItemForm', () => {
    it('base example looks correct', async () => {
        await page.photo('');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});