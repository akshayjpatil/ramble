export const isOnIOS = () =>
	navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
