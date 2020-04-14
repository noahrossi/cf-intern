addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const variantUrl = 'https://cfw-takehome.developers.workers.dev/api/variants'

  // request variants from API
  let cfReq = await fetch(variantUrl, {})
  let variants = await cfReq.json()

  // clean up JSON into our array
  variants = variants.variants

  let page

  // distribute requests 50/50
  if (Math.random() > 0.5) {
    let pageReq = await fetch(variants[0], {})
    page = await pageReq.text()
  } else {
    let pageReq = await fetch(variants[1], {})
    page = await pageReq.text()
  }

  return new Response(page, {
    headers: { 'content-type': 'text/HTML' },
  })
}
