import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

function setup() {
    const context = vm.createContext({ clearTimeout, setTimeout });
    context.window = context;
    for (const file of ['state', 'localize', 'undo', 'events']) {
        vm.runInContext(readFileSync(new URL('../js/' + file + '.js', import.meta.url), 'utf8'), context);
    }
    const app = context.App;
    app.state.activeLanguage = 'fr';
    app.state.platforms.iphone.screenshots = Array.from({ length: 3 }, (_, i) => ({
        src: 'image' + i, image: {}, settings: {
            headline: 'old' + i, subheadline: 'body' + i, titleColor: '#123456',
            content: { en: { headline: 'English', subheadline: 'Original' } }
        }
    }));
    for (const name of ['updateSettingsUI', 'renderAllPreviews', 'updateUndoRedoButtons', 'updateExportButton', 'updateSidebarCounts']) app[name] = () => {};
    app.Storage = { scheduleSave() {} };
    return app;
}

test('imports in order, preserves remaining screenshots, styles and other languages; supports undo/redo', () => {
    const app = setup();
    assert.equal(app.importContentJson([{ title: 'Bonjour', body: '你好\n世界' }, { title: '', body: '' }]), 2);
    const shots = app.getActiveScreenshots();
    assert.equal(shots[0].settings.headline, 'Bonjour');
    assert.equal(shots[0].settings.content.fr.subheadline, '你好\n世界');
    assert.equal(shots[0].settings.content.en.headline, 'English');
    assert.equal(shots[0].settings.titleColor, '#123456');
    assert.equal(shots[1].settings.subheadline, '');
    assert.equal(shots[2].settings.headline, 'old2');
    app.Undo.undo();
    assert.equal(app.getActiveScreenshots()[0].settings.headline, 'old0');
    app.Undo.redo();
    assert.equal(app.getActiveScreenshots()[0].settings.headline, 'Bonjour');
});

test('ignores all excess entries, including invalid excess values', () => {
    const app = setup();
    assert.equal(app.importContentJson([...Array.from({ length: 3 }, (_, i) => ({ title: String(i), body: 'text' })), null]), 3);
    assert.equal(app.getActiveScreenshots()[2].settings.headline, '2');
});

test('rejects malformed data atomically and handles empty screenshot lists', () => {
    const app = setup();
    for (const data of [null, {}, [], [{ title: 'valid', body: 'text' }, { title: 42, body: 'bad' }]]) {
        assert.throws(() => app.importContentJson(data));
        assert.equal(app.getActiveScreenshots()[0].settings.headline, 'old0');
    }
    app.state.platforms.iphone.screenshots = [];
    assert.throws(() => app.importContentJson([{ title: 'a', body: 'b' }]), /Add screenshots/);
});
