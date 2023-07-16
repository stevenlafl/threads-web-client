const httpProxy = require('http-proxy')
import { NextRequest, NextResponse } from 'next/server'

const proxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(req: NextRequest, res: NextResponse) {
	return new Promise((resolve: any, reject: any) => {

		const url = new URL(decodeURIComponent(req.url.replace('/api/video/', '')));
		const origin = url.origin;
    const path = url.pathname;
		const query = url.searchParams;

		const finalUrl = origin + path + '?' + query;

		proxy.web(req, res, { target: finalUrl, changeOrigin: true, ignorePath: true }, (err: any) => {
			if (err) {
				return reject(err)
			}
			resolve()
		})
	})
}