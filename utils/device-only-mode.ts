export const DEVICE_HOME_ROUTE = '/(tabs)';

export function isDeviceOnlyAllowedSegment(segment?: string): boolean {
	return segment === '(tabs)' || segment === '(device)';
}

export function shouldRedirectToDeviceHome(
	isReady: boolean,
	segments: readonly string[]
): boolean {
	if (!isReady) {
		return false;
	}

	const [topLevelSegment, nestedSegment] = segments;

	if (topLevelSegment === '(device)') {
		return false;
	}

	if (
		topLevelSegment === '(tabs)' &&
		(nestedSegment === undefined || nestedSegment === 'index')
	) {
		return false;
	}

	return true;
}
