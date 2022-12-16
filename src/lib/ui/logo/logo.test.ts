import { render } from '@testing-library/svelte';
import Logo from './logo.svelte';

test('should render', () => {
	const results = render(Logo, { props: { version: '0.2' } });

	expect(() => results.querySelector('img')).not.toThrow();
});
