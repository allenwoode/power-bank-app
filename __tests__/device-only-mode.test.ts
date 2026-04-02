describe('device-only mode navigation guard', () => {
	it('allows tabs and device routes in device-only mode', () => {
		const { isDeviceOnlyAllowedSegment } = require('../utils/device-only-mode');

		expect(isDeviceOnlyAllowedSegment('(tabs)')).toBe(true);
		expect(isDeviceOnlyAllowedSegment('(device)')).toBe(true);
	});

	it('blocks welcome, auth, notification and settings routes', () => {
		const { isDeviceOnlyAllowedSegment } = require('../utils/device-only-mode');

		expect(isDeviceOnlyAllowedSegment('(welcome)')).toBe(false);
		expect(isDeviceOnlyAllowedSegment('(auth)')).toBe(false);
		expect(isDeviceOnlyAllowedSegment('(settings)')).toBe(false);
		expect(isDeviceOnlyAllowedSegment('notifications')).toBe(false);
		expect(isDeviceOnlyAllowedSegment(undefined)).toBe(false);
	});

	it('redirects to device list when current segment is not allowed', () => {
		const { shouldRedirectToDeviceHome } = require('../utils/device-only-mode');

		expect(shouldRedirectToDeviceHome(false, ['(welcome)'])).toBe(false);
		expect(shouldRedirectToDeviceHome(true, ['(welcome)'])).toBe(true);
		expect(shouldRedirectToDeviceHome(true, ['(auth)'])).toBe(true);
		expect(shouldRedirectToDeviceHome(true, ['notifications'])).toBe(true);
		expect(shouldRedirectToDeviceHome(true, ['(tabs)', 'mine'])).toBe(true);
	});

	it('keeps device list and device detail routes reachable', () => {
		const { shouldRedirectToDeviceHome } = require('../utils/device-only-mode');

		expect(shouldRedirectToDeviceHome(true, ['(tabs)'])).toBe(false);
		expect(shouldRedirectToDeviceHome(true, ['(device)'])).toBe(false);
	});
});
