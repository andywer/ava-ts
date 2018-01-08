import test from 'ava'

function add (x: number, y: number): number {
  return x + y
}

test('add(1, 2) = 3', t => {
  t.is(add(1, 2), 3)
})
