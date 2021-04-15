export function client(opts) {
	return {
		// "Public"
		opts: function() {
			return opts
		},
		rest: function(pathname, method = "GET", data = null) {
			if(typeof data == "object") {
				data = JSON.stringify(data)
			}
			var url = this.optsURL()
			url.pathname = pathname
			return fetch(url.toString(), {
				method: method,
				body: data,
			})
		},

		// "Private"
		optsURL: function() {
			const url = new URL('http://localhost:5984')
			url.protocol = opts.protocol || 'http'
			url.hostname = opts.hostname || 'localhost'
			url.port = opts.port || 5984
			url.username = opts.username
			url.password = opts.password
			return url
		},
	}
}
