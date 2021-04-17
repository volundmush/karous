export function client(opts) {
	var ret = {
		// "Public"
		opts: function() {
			return opts
		},
		rest: function(pathname, method = "GET", data = null) {
			var headers = new Headers()
			headers.append("Accept", "application/json")

			if(typeof data == "object") {
				data = JSON.stringify(data)
				headers.append("Content-Type", "application/json")
			} else {
				headers.append("Content-Type", "text/plain; charset=utf-8")
			}

			var url = this.optsURL()
			url.pathname = pathname

			return fetch(url.toString(), {
				method: method,
				body: data,
				headers: headers
			})
		},

		db: function(dbname) {
			var client = this
			var ret = {
				status: function() {
					return client.rest(`/${dbname}`, 'HEAD')
				},

				info: function() {
					return client.rest(`/${dbname}`, 'GET')
				},
			}
			ret.head = ret.status
			ret.get = ret.info
			return ret
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
	return ret
}
