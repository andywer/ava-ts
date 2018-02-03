import test from 'ava'
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'

function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
    </div>
  );
}

test('can use jsx when testing', t => {
	const renderer = new ShallowRenderer();
	renderer.render(<MyComponent />);
	const result = renderer.getRenderOutput();

	t.is(result.type, 'div');
	t.deepEqual(result.props.children,
		<span className="heading">Title</span>
	);
})
