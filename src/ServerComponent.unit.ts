import ServerComponent from './ServerComponent';
import Fixture from './ServerComponent.fixture';
import StatefulComponentUnit from './StatefulComponent.unit';
import API from '@battis/jsx-api';

export default class ServerComponentUnit extends StatefulComponentUnit {
    protected ComponentType: typeof ServerComponent;

    protected simplestInstance() {
        return new this.ComponentType({ ...Fixture.object });
    }

    constructor(type = ServerComponent) {
        super(type);
        this.ComponentType = type;
    }

    protected testConstructor() {
        // no default constructor
    }

    protected tests() {
        super.tests();
        this.testStaticOverrideServerPath();
        this.testPropID();
        this.testStaticList();
        this.testStaticCreate_object();
        this.testStaticGet_string();
        this.testUpdate_object();
        this.testDelete();
        this.testHookEditableProperties();
        this.testHookEditCallback();
    }

    protected testStaticOverrideServerPath() {
        test('serverPath', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testPropID() {
        test('id', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testStaticList() {
        test('list()', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testStaticCreate_object() {
        test('create(object)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testStaticGet_string() {
        test('get(string)', async () => {
            // FIXME use actual mocking system
            // ServerComponentTest.mockFetch(200, Fixture.object);
            const Type = this.ComponentType;
            const Foo = class extends Type {
                static serverPath = '/foo';
            };
            API.init({ url: 'https://example.com/api/v1' });
            const foo = await Foo.get(Fixture.object['id']);
            expect(foo!.state).toEqual(Fixture.object);
        });
    }

    protected testUpdate_object() {
        test('update(object)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testDelete() {
        test('delete()', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testHookEditableProperties() {
        test('editableProperties()', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }

    protected testHookEditCallback() {
        test('editCallback()', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    }
}
