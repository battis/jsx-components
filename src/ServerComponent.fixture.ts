import StatefulComponentFixture from './StatefulComponent.fixture';

export default class Fixture extends StatefulComponentFixture {
    static objects = [
        {
            id: '123',
            string: 'foo bar baz',
            number: 123,
            boolean: true,
            array: ['a', 'b', 'c', 1, 2, 3],
            object: { a: 'b', c: 3.14159, d: [4, 5, 6] },
            'quoted key value': 'hello world'
        }
    ];
}
