export default [
  {
    url: '/mock-api/table/default/list',
    method: 'GET',
    rawResponse: async(req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      // res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end({ code: 1 })
    }
  }
]
